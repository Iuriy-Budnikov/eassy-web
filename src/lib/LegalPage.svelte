<script lang="ts">
	import type { Snippet } from 'svelte';

	import Footer from '$lib/Footer.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="wrap">
	<nav>
		<a class="home" href="/">eassy</a>
	</nav>

	<main>
		{@render children()}
	</main>

</div>

<Footer />

<style>
	/*
	 * Long-form layout follows notion.com/trust/privacy-policy: a wide
	 * left-aligned column, oversized bold headings, no rules between
	 * sections, and a linked contents list after the intro.
	 */

	.wrap {
		max-width: var(--width-prose);
		margin-inline: auto;
		padding: 0 var(--space-16) var(--space-96);
	}

	nav {
		padding: var(--space-32) 0;
	}

	.home {
		font-size: var(--font-size-300);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-300);
		color: var(--fg);
		text-decoration: none;
	}

	main :global(h1) {
		font-size: var(--font-size-800);
		line-height: var(--line-height-800);
		letter-spacing: var(--tracking-800);
		font-weight: var(--weight-bold);
		margin: var(--space-32) 0 var(--space-40);
	}

	main :global(h2) {
		font-size: var(--font-size-700);
		line-height: var(--line-height-700);
		letter-spacing: var(--tracking-700);
		font-weight: var(--weight-bold);
		margin: var(--space-96) 0 var(--space-40);
		scroll-margin-top: var(--space-24);
	}

	main :global(h3) {
		font-size: var(--font-size-200);
		line-height: var(--line-height-200);
		font-weight: var(--weight-bold);
		margin: var(--space-32) 0 var(--space-16);
	}

	main :global(p) {
		margin: 0 0 var(--space-16);
	}

	main :global(.dates) {
		color: var(--fg-muted);
		margin-bottom: var(--space-32);
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

	main :global(a) {
		color: inherit;
		text-underline-offset: 0.15em;
	}

	/* Contents list — plain underlined links, one per line */

	main :global(.toc) {
		display: grid;
		gap: var(--space-16);
		list-style: none;
		margin: var(--space-40) 0 var(--space-32);
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


	@media (max-width: 40rem) {
		main :global(h1) {
			font-size: var(--font-size-700);
			line-height: var(--line-height-700);
			letter-spacing: var(--tracking-700);
		}

		main :global(h2) {
			font-size: var(--font-size-500);
			line-height: var(--line-height-600);
			letter-spacing: var(--tracking-500);
			margin-top: var(--space-64);
		}
	}
</style>
