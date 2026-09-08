<script lang="ts">
	/**
	 * A looping product recording.
	 *
	 * The source clips already contain a rendered iPhone on a pure black
	 * background, so there is no CSS device frame here — `mix-blend-mode: screen`
	 * drops the black against the page and lets the glow behind the phone read
	 * through. That also means the clips must stay black-surrounded; a recording
	 * with any other backdrop would show as a rectangle.
	 *
	 * Playback is driven by hand rather than by the `autoplay` attribute so a
	 * video that is nowhere near the viewport never decodes.
	 */
	let { src, poster, label }: { src: string; poster: string; label: string } = $props();

	let video: HTMLVideoElement;

	$effect(() => {
		// The site is prerendered, so all of this is client-only by construction —
		// but keep it inside the effect so it never runs during SSR.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
</script>

<div class="frame">
	<video bind:this={video} {src} {poster} aria-label={label} muted loop playsinline
		preload="metadata"></video>
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
		mix-blend-mode: screen;
	}
</style>
