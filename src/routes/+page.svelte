<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import icon from '$lib/assets/eassy-icon.svg';
	import Footer from '$lib/Footer.svelte';
	import PhoneVideo from '$lib/PhoneVideo.svelte';
	import AppStoreBadge from '$lib/AppStoreBadge.svelte';
	import { reveal } from '$lib/reveal';

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

<div class="first-screen">
	<header class="topbar">
		<div class="topbar-inner">
			<a class="wordmark" href="/">
				<img src={icon} alt="" width="28" height="28" />
				<span>eassy</span>
			</a>
		</div>
	</header>

	<!-- 1. Hero -->
	<section class="hero">
		<div class="inner">
			<!-- The clip sits outside the revealed block: it runs its own fade. -->
			<div class="hero-copy" use:reveal>
				<AppStoreBadge placement="hero" />

				<h1>Less app. More training.</h1>

				<p class="lines">
					Log your workouts, understand your readiness,<br />
					and see your progress over time.
				</p>
			</div>

			<div class="hero-media">
				<PhoneVideo
					src="/media/trends.mp4"
					poster="/media/trends-poster.jpg"
					label="The Trends screen in eassy, showing weekly training load, volume and summary totals."
					maxWidth="min(31rem, 42svh)"
				/>
			</div>
		</div>
	</section>
</div>

<!-- 2. Trends -->
<section class="split">
	<div class="inner two-col">
		<div class="copy" use:reveal>
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
		<div class="copy" use:reveal>
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
	<div class="inner" use:reveal>
		<h2>Your core workout data stays on your iPhone.</h2>

		<AppStoreBadge placement="closing" />
	</div>
</section>

<Footer />

<style>
	/* Header — just the wordmark; the calls to action live in the page. */

	/* Scrolls away with the page — nothing in it needs to stay reachable, and a
	   translucent bar over the clips would tint them. */
	.topbar {
		background: var(--fill);
	}

	.topbar-inner {
		display: flex;
		align-items: center;
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

	/* Only the sections carrying a clip get the wash — it is there to sit behind
	   the phone, so the closing block stays on the flat page background. */
	.hero,
	.split {
		background-image: var(--fill-gradient);
		/* A phone at this height needs real air above and below it, or the three
		   clips read as one continuous column rather than three statements. */
		padding-block: clamp(var(--space-128), 16vw, 12rem);
	}

	.inner {
		max-width: var(--width-page);
		margin-inline: auto;
		text-align: center;
	}

	/* Type scale lifted from apple.com/iphone-17-pro: their elevated headline is
	   80/84 at -1.2px, section headlines 56/60 at -0.28px, and body copy 21/29 at
	   +0.231px — all semibold, not bold. Tracking is expressed in em so it holds
	   its ratio as the clamps scale down. */

	h1 {
		font-size: clamp(2.5rem, 6.2vw, 5rem);
		line-height: 1.05;
		letter-spacing: -0.015em;
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-32);
	}

	h2 {
		font-size: clamp(2rem, 4.4vw, 3.5rem);
		line-height: 1.0715;
		letter-spacing: -0.005em;
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-24);
		max-width: 24ch;
	}

	.inner > h2 {
		margin-inline: auto;
	}

	/* Apple set body copy semibold and grey rather than regular — that weight is
	   a large part of the look. The colour stays at our own --fg-muted, which is
	   a step brighter than their #86868b: theirs is tuned for copy on white, and
	   this page is black. */
	.lines {
		font-size: clamp(1.1875rem, 1.7vw, 1.3125rem);
		line-height: 1.381;
		letter-spacing: 0.011em;
		font-weight: var(--weight-semibold);
		color: var(--fg-muted);
		margin: 0 0 var(--space-40);
	}

	.copy .lines {
		margin-bottom: 0;
	}

	/* The call to action leads the hero block, so it carries the gap and the
	   body copy no longer needs a trailing one. */
	.hero-copy > :global(.badge) {
		margin-bottom: var(--space-32);
	}

	.hero-copy .lines {
		margin-bottom: 0;
	}

	/* Hero — the clip fills the first screen and the headline, body and call to
	   action sit over its lower half. */

	/* Exactly one screen tall: the clip is capped against the viewport height
	   below, and the copy is out of flow, so nothing can push past the fold.
	   `overflow: hidden` is the backstop — if the phone does run long on an odd
	   aspect it is cropped at the bottom, which is already under the scrim. */
	/* Header and hero share one screen: the wrapper is the viewport height and the
	   hero takes whatever the header leaves, so the header's height never has to
	   be hardcoded here. */
	.first-screen {
		display: flex;
		flex-direction: column;
		height: 100svh;
		min-height: 34rem;
	}

	.hero {
		display: flex;
		flex: 1;
		/* There is no global box-sizing reset in this project, so without this the
		   padding would be added on top of the flex height and push the section
		   past the fold by exactly its own padding. */
		box-sizing: border-box;
		min-height: 0;
		padding-top: clamp(var(--space-24), 3vw, var(--space-56));
		padding-bottom: 0;
		overflow: hidden;
	}

	.hero .inner {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}

	.hero-copy {
		position: absolute;
		inset-inline: 0;
		bottom: clamp(var(--space-32), 4vw, var(--space-64));
		z-index: 2;
	}

	/* The phone's own UI runs right under this text, so the lower half of the
	   section fades to solid before the copy starts. Full-bleed across the
	   section rather than sized to the copy box, so the falloff never shows as an
	   edge, and reaching solid well above the headline. */
	.hero::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		bottom: 0;
		height: 55%;
		z-index: 1;
		background: linear-gradient(to bottom, transparent, var(--fill) 40%);
		pointer-events: none;
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

</style>
