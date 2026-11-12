<script lang="ts">
	import type { Snippet } from 'svelte';

	import Footer from '$lib/Footer.svelte';
	import SiteHeader from '$lib/SiteHeader.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="page">
	<SiteHeader />

	<div class="wrap">
		<main>
			{@render children()}
		</main>
	</div>
</div>

<Footer />

<style>
	/*
	 * Long-form pages, set to match the homepage: the same paper ground, the
	 * shared <SiteHeader />, and medium-weight headlines with tracking in em so
	 * it holds as the clamps scale down. Body copy runs at a longer line height
	 * and a narrower measure than anything on the homepage, for reading.
	 */

	.page {
		background: var(--fill);
	}

	.wrap {
		max-width: var(--width-prose);
		margin-inline: auto;
		padding: var(--space-56) var(--gutter) clamp(var(--space-80), 10vw, var(--space-128));
	}

	main :global(h1) {
		font-size: clamp(2.25rem, 4.6vw, 3.5rem);
		line-height: 1.0715;
		letter-spacing: -0.005em;
		font-weight: var(--weight-medium);
		margin: 0 0 var(--space-32);
	}

	main :global(h2) {
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		line-height: 1.2;
		letter-spacing: -0.003em;
		font-weight: var(--weight-medium);
		margin: clamp(var(--space-56), 6vw, var(--space-80)) 0 var(--space-24);
		scroll-margin-top: var(--space-24);
	}

	main :global(h3) {
		font-size: var(--font-size-300);
		line-height: 1.35;
		letter-spacing: -0.002em;
		font-weight: var(--weight-medium);
		margin: var(--space-32) 0 var(--space-12);
	}

	main :global(p),
	main :global(li) {
		font-size: clamp(1rem, 1.2vw, 1.0625rem);
		line-height: 1.6;
		letter-spacing: -0.005em;
	}

	main :global(p) {
		margin: 0 0 var(--space-16);
	}

	main :global(.dates) {
		color: var(--fg-muted);
		margin-bottom: var(--space-40);
	}

	main :global(ul),
	main :global(ol) {
		margin: 0 0 var(--space-16);
		padding-left: var(--space-24);
	}

	main :global(li) {
		margin-bottom: var(--space-8);
	}

	main :global(li)::marker {
		color: var(--fg-muted);
	}

	/* Links read as muted until hovered, the same restraint the footer uses. */
	main :global(a) {
		color: var(--fg-muted);
		text-decoration: underline;
		text-underline-offset: 0.15em;
		transition: color var(--duration-fast) var(--ease-out);
	}

	main :global(a:hover) {
		color: var(--fg);
	}

	/* Contents list — plain underlined links, one per line */

	main :global(.toc) {
		display: grid;
		gap: var(--space-12);
		list-style: none;
		margin: var(--space-32) 0 var(--space-40);
		padding: 0;
	}

	main :global(.toc li) {
		margin: 0;
	}

	main :global(code) {
		background: var(--code-bg);
		border-radius: var(--radius-400);
		padding: 0.1em 0.35em;
		font-size: 0.9em;
	}
</style>
