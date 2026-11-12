<script lang="ts">
	import { onMount } from 'svelte';
	import { consent, loadConsent, chooseConsent } from '$lib/consent.svelte';

	onMount(loadConsent);
</script>

{#if consent.value === 'pending'}
	<div class="banner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-text">
		<p id="cookie-banner-text">
			We use analytics cookies to understand how the site is used. Nothing is collected until you
			accept. See our <a href="/privacy-policy">Privacy Policy</a>.
		</p>

		<div class="actions">
			<button type="button" class="decline" onclick={() => chooseConsent('declined')}>
				Decline
			</button>
			<button type="button" class="accept" onclick={() => chooseConsent('accepted')}>
				Accept
			</button>
		</div>
	</div>
{/if}

<style>
	.banner {
		position: fixed;
		inset-inline: var(--space-16);
		bottom: var(--space-16);
		z-index: 100;

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-16);

		max-width: var(--width-page);
		margin-inline: auto;
		padding: var(--space-16) var(--space-20);

		background: var(--surface);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-700);
		box-shadow: 0 12px 40px -12px rgb(0 0 0 / 35%);
	}

	p {
		margin: 0;
		max-width: 60ch;
		color: var(--fg-muted);
		font-size: var(--font-size-100);
		line-height: var(--line-height-100);
	}

	p a {
		color: var(--fg);
		text-underline-offset: 0.15em;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		margin-inline-start: auto;
	}

	button {
		border-radius: var(--radius-round);
		padding: var(--space-8) var(--space-20);
		font-family: inherit;
		font-size: var(--font-size-100);
		font-weight: var(--weight-medium);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.decline {
		background: transparent;
		border: 1px solid var(--border-strong);
		color: var(--fg-muted);
	}

	.decline:hover {
		border-color: var(--fg-muted);
		color: var(--fg);
	}

	.accept {
		background: var(--btn-bg);
		border: 1px solid var(--btn-bg);
		color: var(--btn-fg);
	}

	.accept:hover {
		opacity: 0.85;
	}

	@media (max-width: 40rem) {
		.banner {
			flex-direction: column;
			align-items: stretch;
		}

		.actions {
			margin-inline-start: 0;
		}

		.actions button {
			flex: 1;
		}
	}
</style>
