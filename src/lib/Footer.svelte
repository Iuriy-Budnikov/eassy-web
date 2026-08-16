<script lang="ts">
	import icon from '$lib/assets/eassy-icon.svg';
	import { reopenConsent } from '$lib/consent.svelte';
</script>

<footer>
	<div class="inner">
		<a class="logo" href="/">
			<img src={icon} alt="" width="24" height="24" />
			<span>eassy</span>
		</a>

		<nav aria-label="Footer">
			<a href="/privacy-policy">Privacy</a>
			<span aria-hidden="true">·</span>
			<a href="/terms-and-conditions">Terms</a>
			<span aria-hidden="true">·</span>
			<a href="/support">Support</a>
			<span aria-hidden="true">·</span>
			<!-- Withdrawing consent has to be as easy as granting it, so this
			     re-opens the banner rather than living behind a settings page. -->
			<button type="button" onclick={reopenConsent}>Cookies</button>
		</nav>

		<p class="copyright">© 2026 eassy</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--border);
	}

	.inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-16);
		max-width: var(--width-page);
		margin-inline: auto;
		padding: var(--space-40) var(--space-16);
	}

	.logo {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		font-size: var(--font-size-200);
		font-weight: var(--weight-bold);
		letter-spacing: var(--tracking-300);
		color: var(--fg);
		text-decoration: none;
	}

	.logo img {
		border-radius: 22%;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-8);
		color: var(--border-strong);
		font-size: var(--font-size-150);
	}

	nav a,
	nav button {
		color: var(--fg-muted);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.15em;
		transition: color 120ms ease, text-decoration-color 120ms ease;
	}

	/* The cookie control is an action, not a destination, so it is a button —
	   stripped back to match the links it sits beside. */
	nav button {
		padding: 0;
		background: none;
		border: 0;
		font: inherit;
		cursor: pointer;
	}

	nav a:hover,
	nav button:hover {
		color: var(--fg);
		text-decoration-color: currentColor;
	}

	.copyright {
		margin: 0;
		color: var(--fg-muted);
		font-size: var(--font-size-100);
	}

	@media (max-width: 40rem) {
		.inner {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-16);
		}
	}
</style>
