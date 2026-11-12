/**
 * Svelte action: mark an element with `data-inview` the first time it scrolls
 * into view.
 *
 * The SVG illustrations hang their CSS animations off that attribute (see the
 * `.art` rules in `app.css`), so nothing animates offscreen and every block
 * starts from its first frame when the reader actually arrives at it. The mark
 * is never removed: looping animations keep running once started, which costs
 * nothing noticeable for CSS keyframes.
 */
export function inview(node: Element, threshold = 0.3) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.setAttribute('data-inview', '');
			observer.disconnect();
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
