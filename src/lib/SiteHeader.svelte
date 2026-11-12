<script lang="ts">
	import icon from '$lib/assets/eassy-icon.svg';
	import { APP_STORE_URL } from '$lib';
	import { captureAppStoreClick } from '$lib/analytics';

	/**
	 * The site header: wordmark, section links and the download button, on a
	 * translucent bar that sticks to the top with a hairline beneath it. The
	 * section links are absolute (`/#how`) so they work from the legal pages too.
	 */
	const links = [
		{ href: '/#how', label: 'How it works' },
		{ href: '/#balance', label: 'Training Balance' },
		{ href: '/#privacy', label: 'Free' },
		{ href: '/#faq', label: 'FAQ' }
	];
</script>

<header class="topbar">
	<div class="topbar-inner">
		<a class="wordmark" href="/">
			<img src={icon} alt="" width="26" height="26" />
			<span>eassy</span>
		</a>

		<nav aria-label="Sections">
			{#each links as link (link.href)}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<a class="btn btn-primary cta" href={APP_STORE_URL} onclick={() => captureAppStoreClick('header')}
			>Download</a
		>
	</div>
</header>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 20;
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: blur(14px) saturate(1.4);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
	}

	.topbar-inner {
		display: flex;
		align-items: center;
		gap: var(--space-32);
		box-sizing: border-box;
		height: 3.5rem;
		max-width: var(--width-page);
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		font-size: var(--font-size-350);
		font-weight: var(--weight-semibold);
		letter-spacing: -0.02em;
		color: var(--fg);
		text-decoration: none;
	}

	.wordmark img {
		border-radius: 22%;
		/* The icon's ink matches the dark page, so a hairline keeps its shape. */
		outline: 1px solid var(--border-strong);
		outline-offset: -1px;
	}

	nav {
		display: flex;
		gap: var(--space-24);
		margin-inline-start: auto;
	}

	nav a {
		font-size: var(--font-size-150);
		font-weight: var(--weight-medium);
		color: var(--fg-muted);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	nav a:hover {
		color: var(--fg);
	}

	.cta {
		height: 2.25rem;
		padding-inline: var(--space-16);
		font-size: var(--font-size-100);
	}

	@media (max-width: 52rem) {
		nav {
			display: none;
		}

		.cta {
			margin-inline-start: auto;
		}
	}
</style>
