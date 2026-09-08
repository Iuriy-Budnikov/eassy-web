<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import icon from '$lib/assets/eassy-icon.svg';
	import Footer from '$lib/Footer.svelte';
	import PhoneVideo from '$lib/PhoneVideo.svelte';
	import { captureAppStoreClick } from '$lib/analytics';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'eassy',
		applicationCategory: 'HealthApplication',
		operatingSystem: 'iOS',
		description:
			'A strength workout tracker for iPhone and Apple Watch with Training Readiness, Smart Progression, workout templates, and Apple Health integration.',
		url: 'https://eassy.app/',
		downloadUrl: APP_STORE_URL
	};
</script>

<svelte:head>
	<title>eassy — Less app. More training.</title>
	<meta
		name="description"
		content="Log your workouts, understand your readiness, and see your progress over time. Minimal strength tracking for iPhone and Apple Watch."
	/>
	<link rel="canonical" href="https://eassy.app/" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="eassy — Less app. More training." />
	<meta
		property="og:description"
		content="Minimal strength tracking for iPhone and Apple Watch."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://eassy.app/" />
	<meta property="og:image" content="https://eassy.app/og.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="eassy — Less app. More training." />
	<meta
		name="twitter:description"
		content="Minimal strength tracking for iPhone and Apple Watch."
	/>
	<meta name="twitter:image" content="https://eassy.app/og.jpg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<header class="topbar">
	<div class="topbar-inner">
		<a class="wordmark" href="/">
			<img src={icon} alt="" width="28" height="28" />
			<span>eassy</span>
		</a>

		<a
			class="btn filled small"
			href={APP_STORE_URL}
			onclick={() => captureAppStoreClick('topbar')}>Download on the App Store</a
		>
	</div>
</header>

<!-- 1. Hero -->
<section class="hero">
	<div class="inner">
		<p class="eyebrow">Minimal strength tracking</p>

		<h1>Less app. More training.</h1>

		<p class="lines">
			Log your workouts, understand your readiness,<br />
			and see your progress over time.
		</p>

		<a class="btn filled" href={APP_STORE_URL} onclick={() => captureAppStoreClick('hero')}
			>Download on the App Store</a
		>

		<div class="hero-media">
			<PhoneVideo
				src="/media/trends.mp4"
				poster="/media/trends-poster.jpg"
				label="The Trends screen in eassy, showing weekly training load, volume and summary totals."
			/>
		</div>
	</div>
</section>

<!-- 2. Trends -->
<section class="split">
	<div class="inner two-col">
		<div class="copy">
			<p class="eyebrow">Trends</p>
			<h2>Progress,<br />without the noise.</h2>
			<p class="lines">
				See load, volume, duration, energy,<br />
				and performance in context.
			</p>
		</div>

		<PhoneVideo
			src="/media/trends.mp4"
			poster="/media/trends-poster.jpg"
			label="The Trends screen in eassy, showing weekly training load, volume and summary totals."
		/>
	</div>
</section>

<!-- 3. Training Balance — media on the left, mirroring the section above. -->
<section class="split">
	<div class="inner two-col reversed">
		<div class="copy">
			<p class="eyebrow">Training Balance</p>
			<h2>Stay in balance.</h2>
			<p class="lines">
				See how your recent training load compares<br />
				with what your body is adapted to.
			</p>
		</div>

		<PhoneVideo
			src="/media/training-balance.mp4"
			poster="/media/training-balance-poster.jpg"
			label="The Training Balance screen in eassy, showing a seven-day training load chart."
		/>
	</div>
</section>

<!-- 4. Closing -->
<section class="closing">
	<div class="inner">
		<h2>Your core workout data stays on your iPhone.</h2>

		<a class="btn filled" href={APP_STORE_URL} onclick={() => captureAppStoreClick('closing')}
			>Download on the App Store</a
		>
	</div>
</section>

<Footer />

<style>
	/* Header — logo and the single primary action, nothing else. */

	.topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(12px);
	}

	.topbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-16);
		max-width: var(--width-page);
		margin-inline: auto;
		padding: var(--space-12) var(--space-16);
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		font-size: var(--font-size-300);
		font-weight: var(--weight-bold);
		letter-spacing: var(--tracking-300);
		color: var(--fg);
		text-decoration: none;
	}

	.wordmark img {
		border-radius: 22%;
	}

	/* One message per screen: each section gets its own generous block, and the
	   spacing alone is what separates them. */

	section {
		position: relative;
		padding: clamp(var(--space-80), 12vw, var(--space-128)) var(--space-16);
		/* Guard against decorative bleed panning the page sideways on narrow
		   screens. `clip` on one axis leaves the other visible; `hidden` would
		   force the other axis to scroll. */
		overflow-x: clip;
	}

	.inner {
		max-width: var(--width-page);
		margin-inline: auto;
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 var(--space-24);
		color: var(--accent-text);
		font-size: var(--font-size-100);
		font-weight: var(--weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	h1 {
		font-size: clamp(2.625rem, 7vw, var(--font-size-900));
		line-height: 1.05;
		letter-spacing: var(--tracking-900);
		font-weight: var(--weight-bold);
		margin: 0 0 var(--space-32);
	}

	h2 {
		font-size: clamp(2rem, 4.6vw, var(--font-size-700));
		line-height: 1.1;
		letter-spacing: var(--tracking-800);
		font-weight: var(--weight-bold);
		margin: 0 0 var(--space-24);
		max-width: 24ch;
	}

	.inner > h2 {
		margin-inline: auto;
	}

	.lines {
		font-size: clamp(var(--font-size-300), 2.2vw, var(--font-size-400));
		line-height: 1.6;
		letter-spacing: var(--tracking-400);
		color: var(--fg-muted);
		margin: 0 0 var(--space-40);
	}

	.copy .lines {
		margin-bottom: 0;
	}

	/* Hero — centred, with the clip below the call to action so the headline
	   still owns the top of the page. */

	.hero {
		padding-bottom: clamp(var(--space-48), 6vw, var(--space-80));
	}

	.hero-media {
		margin-top: clamp(var(--space-48), 7vw, var(--space-96));
	}

	/* Alternating media sections. */

	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: clamp(var(--space-40), 6vw, var(--space-96));
		text-align: left;
	}

	/* Reverse visually without reordering the DOM, so the reading order stays
	   eyebrow → headline → body → media in every section. */
	.two-col.reversed {
		direction: rtl;
	}

	.two-col.reversed > :global(*) {
		direction: ltr;
	}

	/* The one rule left on the page: the closing block is a different kind of
	   thing from the three product sections, so it gets a line above it. */
	.closing {
		border-top: 1px solid var(--border);
	}

	.closing h2 {
		max-width: 20ch;
		margin-bottom: var(--space-40);
	}

	/* Mobile: one column, media last, and the headline line breaks stop being
	   deliberate once the measure is this narrow. */

	@media (max-width: 52rem) {
		.two-col {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.two-col.reversed {
			direction: ltr;
		}

		.copy .lines {
			margin-bottom: var(--space-40);
		}

		h2 {
			margin-inline: auto;
		}
	}

	@media (max-width: 30rem) {
		h2 br,
		.lines br {
			display: none;
		}
	}

	/* Buttons — sizing after teamtopia.io (50px tall, 14px/20px padding, 16px
	   semibold, hairline shadow), but squircle corners rather than their pill.
	   `corner-shape` is progressive: where it is unsupported the cap simply falls
	   back to an ordinary rounded rectangle at the same radius, which is why the
	   radii below are chosen to look right either way. */

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-12);
		box-sizing: border-box;
		min-height: 3.125rem;
		padding: 0.875rem 1.25rem;
		border: 1px solid transparent;
		border-radius: 1.25rem;
		corner-shape: squircle;
		font-size: var(--font-size-200);
		line-height: 1.25rem;
		font-weight: var(--weight-semibold);
		letter-spacing: -0.00625rem;
		text-align: center;
		text-decoration: none;
		box-shadow: 0 1px 0 rgb(0 0 0 / 19%);
		transition-property: background-color, color, box-shadow;
		transition-duration: 250ms;
	}

	.btn.small {
		min-height: 2.5rem;
		padding: 0 var(--space-16);
		/* Held to the same ~40% of height as the large cap so the squircle reads
		   at the same strength rather than swallowing the shorter button. */
		border-radius: var(--radius-900);
		font-size: var(--font-size-100);
	}

	.filled {
		background: var(--btn-bg);
		color: var(--btn-fg);
	}

	.filled:hover,
	.filled:focus {
		background: var(--btn-bg-hover);
	}

	.filled:active {
		background: var(--btn-bg-active);
	}
</style>
