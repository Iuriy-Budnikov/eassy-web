<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import { captureAppStoreClick } from '$lib/analytics';

	/**
	 * The App Store badge, in Apple's black-on-dark treatment: black fill, hairline
	 * white stroke, Apple mark, and the two-line "Download on the / App Store"
	 * lockup at Apple's proportions (mark and type each keyed off the badge
	 * height, the way their artwork scales).
	 *
	 * Note this is a rebuild in markup rather than Apple's supplied artwork. See
	 * the note in the page where it is used.
	 */
	let { placement }: { placement: string } = $props();
</script>

<a class="badge" href={APP_STORE_URL} onclick={() => captureAppStoreClick(placement)}>
	<svg class="mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<path
			fill="currentColor"
			d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
		/>
	</svg>

	<span class="lockup">
		<span class="kicker">Download on the</span>
		<span class="wordmark">App Store</span>
	</span>
</a>

<style>
	.badge {
		--badge-height: 3.5rem;

		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		box-sizing: border-box;
		height: var(--badge-height);
		padding-inline: calc(var(--badge-height) * 0.28);
		border: 1px solid rgb(255 255 255 / 65%);
		border-radius: calc(var(--badge-height) * 0.16);
		background: #000;
		color: #fff;
		text-decoration: none;
		/* Apple's badge is set in the system font at a fixed optical size, so it
		   does not inherit the page's heading tracking. */
		font-family: var(--font-sans);
		white-space: nowrap;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out);
	}

	.badge:hover,
	.badge:focus-visible {
		background: #1a1a1a;
		border-color: rgb(255 255 255 / 90%);
	}

	.mark {
		width: calc(var(--badge-height) * 0.44);
		height: calc(var(--badge-height) * 0.44);
		flex: none;
		/* The Apple mark sits fractionally high against the two-line lockup. */
		margin-top: -0.06em;
	}

	.lockup {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.kicker {
		font-size: calc(var(--badge-height) * 0.2);
		line-height: 1.2;
		letter-spacing: 0.01em;
		font-weight: var(--weight-regular);
	}

	.wordmark {
		font-size: calc(var(--badge-height) * 0.36);
		line-height: 1.15;
		letter-spacing: -0.01em;
		font-weight: var(--weight-medium);
	}
</style>
