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
	<svg class="mark" viewBox="0 0 814 1000" aria-hidden="true" focusable="false">
		<path
			fill="currentColor"
			d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
		/>
	</svg>

	<span class="lockup">
		<span class="kicker">Download on the</span>
		<span class="wordmark">App Store</span>
	</span>
</a>

<style>
	/* Every dimension is a ratio of the badge height, taken off Apple's supplied
	   artwork, so the lockup holds together at any size:
	     mark .553 tall · gap .191 · kicker .21 · wordmark .42 · radius .157
	     side padding .243 · overall aspect 3.07
	   The stroke is Apple's own #a6a6a6 rather than plain white — that is the
	   bordered black badge they ship for dark backgrounds. */
	.badge {
		--badge-height: 3.5rem;

		display: inline-flex;
		align-items: center;
		gap: calc(var(--badge-height) * 0.191);
		box-sizing: border-box;
		height: var(--badge-height);
		/* Less the 1px stroke, so the outer padding measures Apple's .243. */
		padding-inline: calc(var(--badge-height) * 0.243 - 1px);
		border: 1px solid #a6a6a6;
		border-radius: calc(var(--badge-height) * 0.157);
		background: #000;
		color: #fff;
		text-decoration: none;
		/* Apple sets the badge in SF Pro *Text*, not the Display cut the rest of
		   the page uses — Display runs materially narrower at these sizes and will
		   not reach the artwork's line widths at the right cap height. */
		font-family: 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		white-space: nowrap;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out);
	}

	.badge:hover,
	.badge:focus-visible {
		background: #1a1a1a;
		border-color: #d2d2d2;
	}

	/* The viewBox is cropped to the glyph itself (814×1000, the mark's real
	   0.814 aspect), so these numbers are the mark as it actually paints rather
	   than a box with slack around it. */
	.mark {
		width: calc(var(--badge-height) * 0.451);
		height: calc(var(--badge-height) * 0.553);
		flex: none;
		/* The mark sits fractionally high against the two-line lockup. */
		margin-top: calc(var(--badge-height) * -0.02);
	}

	.lockup {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	.kicker {
		font-size: calc(var(--badge-height) * 0.21);
		line-height: 1.2;
		/* Residual tracking, measured against the artwork: SF Pro Text lands just
		   short on this line and just over on the wordmark, so each is nudged
		   until the rendered widths hit 1.791H and 1.940H. */
		letter-spacing: 0.0403em;
		font-weight: var(--weight-regular);
	}

	/* The wordmark carries the badge — it is more than twice the kicker, set
	   tight, and optically aligned to the kicker's left edge. */
	.wordmark {
		font-size: calc(var(--badge-height) * 0.42);
		line-height: 1.08;
		letter-spacing: -0.0214em;
		font-weight: var(--weight-medium);
	}
</style>
