<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import { captureAppStoreClick } from '$lib/analytics';

	/**
	 * The bar that slides in once the reader is past the first screen, built to
	 * the local nav on apple.com/iphone-17-pro. Measured off that page: a centred
	 * capsule 1024px wide and 52px tall, 10px down from the top, 18px corner
	 * radius, rgba(18,18,18,.8) behind a 20px backdrop blur, a 1px rgb(40,40,40)
	 * hairline, sliding in over 230ms. Its buttons are 28px pills at 12px type.
	 *
	 * `watch` is the element whose passing triggers it — the hero screen. An
	 * IntersectionObserver on that element answers the question directly, so no
	 * scroll handler runs on every frame.
	 */
	let { watch }: { watch: HTMLElement | undefined } = $props();

	let revealed = $state(false);

	$effect(() => {
		if (!watch) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				revealed = !entry.isIntersecting;
			},
			{ threshold: 0 }
		);

		observer.observe(watch);
		return () => observer.disconnect();
	});
</script>

<!-- `inert` while hidden so the offscreen bar is never a tab stop. -->
<div class="localnav" class:revealed inert={!revealed}>
	<div class="capsule">
		<a class="title" href="/">eassy</a>

		<a
			class="cta"
			href={APP_STORE_URL}
			onclick={() => captureAppStoreClick('localnav')}>Download</a
		>
	</div>
</div>

<style>
	/* The strip is only a positioning context — it must not swallow clicks in the
	   gap either side of the capsule, hence pointer-events off here and back on
	   for the capsule itself. */
	.localnav {
		position: fixed;
		inset-inline: 0;
		top: 0;
		z-index: 20;
		padding: 0.625rem var(--space-16) 0.125rem;
		pointer-events: none;
		transform: translateY(-150%);
		transition: transform 230ms ease;
	}

	.localnav.revealed {
		transform: translateY(0);
	}

	.capsule {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-16);
		box-sizing: border-box;
		height: 3.25rem;
		max-width: var(--width-page);
		margin-inline: auto;
		padding: 0 1.25rem;
		border: 1px solid rgb(40 40 40);
		border-radius: 1.125rem;
		background: rgb(18 18 18 / 80%);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	.title {
		font-size: var(--font-size-300);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-300);
		color: var(--fg);
		text-decoration: none;
	}

	/* Apple's Buy pill, in this page's palette: theirs is their accent blue on the
	   dark bar, ours stays monochrome so the capsule introduces no new colour. */
	.cta {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		height: 1.75rem;
		padding: 0 0.75rem;
		border-radius: 120px;
		background: var(--fg);
		color: var(--brand-ink);
		font-size: var(--font-size-50);
		font-weight: var(--weight-medium);
		line-height: 1;
		white-space: nowrap;
		text-decoration: none;
		transition: background-color 200ms ease;
	}

	.cta:hover,
	.cta:focus-visible {
		background: #fff;
	}

	@media (prefers-reduced-motion: reduce) {
		.localnav {
			transition: none;
		}
	}
</style>
