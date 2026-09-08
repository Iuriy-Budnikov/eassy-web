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

	/* The halo the `screen` blend reveals through the clip's black surround. */
	.frame::before {
		content: '';
		position: absolute;
		inset: -12% -22%;
		border-radius: 50%;
		background: radial-gradient(
			ellipse at center,
			color-mix(in srgb, var(--accent) 16%, transparent),
			transparent 68%
		);
		filter: blur(2.5rem);
		pointer-events: none;
	}

	video {
		position: relative;
		display: block;
		width: 100%;
		height: auto;
		/* Matches the encoded output, so nothing shifts before metadata lands. */
		aspect-ratio: 694 / 1440;
		mix-blend-mode: screen;
	}
</style>
