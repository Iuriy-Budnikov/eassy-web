<script lang="ts">
	/**
	 * A looping product recording.
	 *
	 * The source clips already contain a rendered iPhone on a pure black
	 * background, so there is no CSS device frame here — `mix-blend-mode: screen`
	 * drops the black against the page. That also means the clips must stay
	 * black-surrounded; a recording with any other backdrop would show as a
	 * rectangle.
	 *
	 * Playback is driven by hand rather than by the `autoplay` attribute so a
	 * video that is nowhere near the viewport never decodes.
	 *
	 * `src` names the H.264 file; the AV1 sibling next to it is offered first,
	 * being both smaller and measurably higher quality on this kind of flat UI
	 * footage. Browsers without AV1 fall through to the H.264 on their own.
	 */
	let { src, poster, label }: { src: string; poster: string; label: string } = $props();

	const av1 = $derived(src.replace(/\.mp4$/, '.av1.mp4'));

	let frame: HTMLDivElement;
	let video: HTMLVideoElement;

	/** The effects below sit out entirely when the reader has asked for less motion. */
	const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	$effect(() => {
		// The site is prerendered, so all of this is client-only by construction —
		// but keep it inside the effect so it never runs during SSR.
		if (still()) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// Safari rejects play() when it disagrees about autoplay eligibility;
					// the poster stays up in that case, which is an acceptable outcome.
					void video.play().catch(() => {});
				} else {
					video.pause();
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(video);
		return () => observer.disconnect();
	});

	/**
	 * Reveal and parallax, both on GSAP. It is loaded on demand rather than
	 * bundled — dead weight for anyone who never scrolls past the hero, and this
	 * page already treats heavy third-party code that way (see `analytics.ts`).
	 *
	 * Note that the opacity floor is set by GSAP rather than in CSS. Starting the
	 * clip hidden in the stylesheet would leave it permanently invisible on any
	 * page where this import fails, so the markup's default stays opaque and only
	 * a page that actually has GSAP dims it in order to fade it back up.
	 */
	$effect(() => {
		if (still()) return;

		let cancelled = false;
		let ctx: { revert: () => void } | undefined;

		void (async () => {
			const [{ gsap }, { ScrollTrigger }] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger')
			]);
			// The effect can be torn down while those imports are still in flight.
			if (cancelled) return;

			gsap.registerPlugin(ScrollTrigger);

			ctx = gsap.context(() => {
				gsap.from(video, {
					opacity: 0,
					duration: 0.9,
					ease: 'power3.out',
					scrollTrigger: { trigger: frame, start: 'top 88%', once: true }
				});

				// Separate tween: the reveal runs once on its own clock, while this one
				// is scrubbed by scroll position for the whole pass through the viewport.
				// They touch different properties, so they do not fight over the element.
				gsap.fromTo(
					video,
					{ yPercent: -3 },
					{
						yPercent: 3,
						ease: 'none',
						scrollTrigger: {
							trigger: frame,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true
						}
					}
				);
			}, frame);
		})();

		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<div class="frame" bind:this={frame}>
	<video
		bind:this={video}
		{poster}
		aria-label={label}
		muted
		loop
		playsinline
		preload="metadata"
	>
		<source src={av1} type="video/mp4; codecs=av01.0.08M.08" />
		<source {src} type="video/mp4; codecs=avc1.640033" />
	</video>
</div>

<style>
	/* Judge this by the height it lands on, not the width — at a 694/1440 aspect
	   every rem of width costs roughly two of height. 22rem fills its column and
	   still leaves the section a little shorter than a tall desktop viewport. */
	.frame {
		position: relative;
		width: 100%;
		max-width: 22rem;
		margin-inline: auto;
	}

	/* `screen` against the page background is what hides the clip's black
	   surround: screen(0, bg) is exactly bg, so the rectangle disappears without
	   needing to match the device silhouette — which a border-radius could not do
	   anyway, since the render's side buttons run right to the frame edge.
	   Nothing may sit behind the video: whatever is back there gets *added* into
	   the phone's own pixels. A lime glow here read as an olive cast across the
	   whole screen. The only backdrop is the page, and it lifts blacks by ~5%. */
	video {
		display: block;
		width: 100%;
		height: auto;
		/* Matches the encoded output, so nothing shifts before metadata lands. */
		aspect-ratio: 912 / 1892;
		/* Before the poster paints the box is empty, and screening an empty (white)
		   box flashes a white rectangle. Black is the identity colour for `screen`,
		   so this makes the pre-load state indistinguishable from the page. */
		background: #000;
		mix-blend-mode: screen;
	}
</style>
