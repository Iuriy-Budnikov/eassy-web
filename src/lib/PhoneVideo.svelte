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

	/**
	 * `maxWidth` caps how wide the phone renders. The default suits a clip sat in
	 * one half of a two-column section; the hero, which is centred and has the
	 * full page width to itself, passes a larger value.
	 *
	 * Both are capped against the viewport height as well as a fixed width. The
	 * hero needs that so the first screen fits, and the section clips carry the
	 * same term so every phone on the page renders identically once the columns
	 * collapse on mobile — otherwise a short screen shows a narrower hero than
	 * the sections below it.
	 */
	let {
		src,
		poster,
		label,
		maxWidth = 'min(25rem, 42svh)'
	}: { src: string; poster: string; label: string; maxWidth?: string } = $props();

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
	 * The reveal, on GSAP — but scheduled by an IntersectionObserver rather than
	 * ScrollTrigger. ScrollTrigger has to measure every trigger against a shared
	 * scroll position, and with several of them being created asynchronously
	 * (each clip, each copy block) an element already past its start point when
	 * its trigger is built could be left sitting at the `from` state forever.
	 * An observer answers "is this on screen" per element and needs no refresh.
	 *
	 * The fade waits for the clip to actually hold a frame. Safari swaps the
	 * poster out for the video the moment playback starts, and if no frame has
	 * decoded yet the element paints its own background — which `screen` blending
	 * turns into the page colour, so the phone vanishes for a beat and reads as a
	 * blink. Fading in only once there is something to show removes the gap
	 * entirely. A timeout still reveals it if the media never becomes ready, so a
	 * refused autoplay shows the poster rather than nothing at all.
	 *
	 * Note the opacity floor is set by GSAP, never in CSS: starting the clip
	 * hidden in the stylesheet would leave it permanently invisible on any page
	 * where this import fails, so the markup default stays opaque and only a page
	 * that actually has GSAP dims it in order to fade it back up.
	 */
	$effect(() => {
		if (still()) return;

		let cancelled = false;
		let observer: IntersectionObserver | undefined;
		let safety: ReturnType<typeof setTimeout>;

		void (async () => {
			const { gsap } = await import('gsap');
			// The effect can be torn down while that import is still in flight.
			if (cancelled) return;

			gsap.set(video, { opacity: 0 });

			let revealed = false;

			const show = () => {
				if (revealed) return;
				revealed = true;
				clearTimeout(safety);
				video.removeEventListener('playing', show);
				video.removeEventListener('loadeddata', show);
				gsap.to(video, {
					opacity: 1,
					// A beat before the clip arrives, so the section's copy registers
					// first rather than both landing on the same frame.
					delay: 0.25,
					duration: 1.1,
					ease: 'power2.out'
				});
			};

			observer = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting || revealed) return;
					observer?.disconnect();

					// HAVE_CURRENT_DATA or better means a frame is already on screen.
					if (video.readyState >= 2) {
						show();
						return;
					}

					video.addEventListener('playing', show, { once: true });
					video.addEventListener('loadeddata', show, { once: true });
					safety = setTimeout(show, 2500);
				},
				// Matched to the playback observer above, so the fade cannot start
				// before the clip has been asked to play.
				{ threshold: 0.25 }
			);

			observer.observe(video);
		})();

		return () => {
			cancelled = true;
			observer?.disconnect();
			clearTimeout(safety);
			// Never leave the clip stranded at the hidden state.
			video.style.opacity = '';
		};
	});
</script>

<div class="frame" bind:this={frame} style:max-width={maxWidth}>
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
	/* Judge this by the height it lands on, not the width — at a 912/1872 aspect
	   every rem of width costs roughly two of height, so the 25rem default is
	   already an 830px-tall block. The cap itself comes from `maxWidth`. */
	.frame {
		position: relative;
		width: 100%;
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
		aspect-ratio: 912 / 1872;
		/* Before the poster paints the box is empty, and screening an empty (white)
		   box flashes a white rectangle. Black is the identity colour for `screen`,
		   so this makes the pre-load state indistinguishable from the page. */
		background: #000;
		mix-blend-mode: screen;
	}
</style>
