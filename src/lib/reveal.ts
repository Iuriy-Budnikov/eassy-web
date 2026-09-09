/**
 * Svelte action: stagger a block's direct children into view on scroll.
 *
 * Used for the copy blocks on the homepage, alongside the clip reveal in
 * `PhoneVideo.svelte`. Both share the same three properties:
 *
 * - GSAP is imported on demand, so it stays off the critical path.
 * - The schedule comes from an IntersectionObserver, not ScrollTrigger. Several
 *   of these are created asynchronously across the page, and ScrollTrigger
 *   measures every trigger against one shared scroll position — an element
 *   already past its start point when its trigger is built can be left sitting
 *   at the `from` state forever. An observer answers "is this on screen" per
 *   element and needs no refresh.
 * - The hidden state is applied *by GSAP*, never in CSS. Starting the text at
 *   `opacity: 0` in the stylesheet would leave a page with no scripting — or one
 *   where the import fails — permanently blank, so the markup default is visible
 *   and only a page that actually has GSAP dims it in order to bring it back.
 */
export function reveal(node: HTMLElement) {
	// Honour the reduced-motion preference, matching the rest of the page.
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	let cancelled = false;
	let observer: IntersectionObserver | undefined;
	const items = [...node.children] as HTMLElement[];

	void (async () => {
		const { gsap } = await import('gsap');
		// The node can be torn down while that import is still in flight.
		if (cancelled) return;

		gsap.set(items, { opacity: 0, y: 18 });

		observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer?.disconnect();
				gsap.to(items, {
					opacity: 1,
					y: 0,
					// Long and gently decelerating rather than snappy: power2 has a
					// softer tail than power3, and the extra duration keeps the whole
					// stagger reading as one settling movement.
					duration: 0.9,
					ease: 'power2.out',
					// Eyebrow, then headline, then body, then the button — close enough
					// together to read as one move rather than four separate ones.
					stagger: 0.1
				});
			},
			{ threshold: 0.15 }
		);

		observer.observe(node);
	})();

	return {
		destroy() {
			cancelled = true;
			observer?.disconnect();
			// Never leave the copy stranded at the hidden state.
			for (const item of items) {
				item.style.opacity = '';
				item.style.transform = '';
			}
		}
	};
}
