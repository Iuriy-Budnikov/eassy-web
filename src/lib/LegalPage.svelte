<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	:global(:root) {
		--bg: #ffffff;
		--fg: #1a1a1a;
		--muted: #5f5f5f;
		--rule: #e4e4e4;
		--code-bg: #f2f2f2;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--bg: #131313;
			--fg: #e8e8e8;
			--muted: #a0a0a0;
			--rule: #2e2e2e;
			--code-bg: #242424;
		}
	}

	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--fg);
	}

	main {
		max-width: 46rem;
		margin-inline: auto;
		padding: 3rem 1.25rem 6rem;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 1rem;
		line-height: 1.65;
		text-wrap: pretty;
		overflow-wrap: break-word;
	}

	main :global(h1) {
		font-size: 2rem;
		line-height: 1.2;
		margin: 0 0 0.75rem;
		letter-spacing: -0.02em;
	}

	main :global(h2) {
		font-size: 1.3rem;
		line-height: 1.3;
		margin: 3rem 0 0.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--rule);
		letter-spacing: -0.01em;
	}

	main :global(h3) {
		font-size: 1.05rem;
		margin: 2rem 0 0.5rem;
	}

	main :global(p) {
		margin: 0 0 1rem;
	}

	main :global(.dates) {
		color: var(--muted);
		font-size: 0.925rem;
		margin-bottom: 2rem;
	}

	main :global(ul),
	main :global(ol) {
		margin: 0 0 1rem;
		padding-left: 1.25rem;
	}

	main :global(li) {
		margin-bottom: 0.4rem;
	}

	main :global(a) {
		color: inherit;
		text-underline-offset: 0.15em;
	}

	main :global(code) {
		background: var(--code-bg);
		border-radius: 4px;
		padding: 0.1em 0.35em;
		font-size: 0.9em;
	}
</style>
