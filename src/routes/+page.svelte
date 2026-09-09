<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import Footer from '$lib/Footer.svelte';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import RevealHeader from '$lib/RevealHeader.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import PhoneVideo from '$lib/PhoneVideo.svelte';
	import AppStoreBadge from '$lib/AppStoreBadge.svelte';
	import { reveal } from '$lib/reveal';

	/** Passed to <RevealHeader />, which watches it to know when to slide in. */
	let firstScreen = $state<HTMLDivElement | undefined>(undefined);

	/**
	 * Cards for the two galleries. Every line is condensed from copy already
	 * published on this site — the FAQ below, and /support — rather than written
	 * fresh, so the pages never drift apart.
	 */
	const features = [
		{
			title: 'Training Readiness',
			body: 'A daily score that shows how ready you are to train, based on recovery and recent training.',
			key: 'how ready you are to train'
		},
		{
			title: 'Training Balance',
			body: 'See how your workload compares with what your body has adapted to.',
			key: 'what your body has adapted to'
		},
		{
			title: 'Smart Progression',
			body: 'Get small, sensible increases in weight and reps based on your actual performance.',
			key: 'based on your actual performance'
		},
		{
			title: 'Smart Templates',
			body: 'Find the right workout for today, shaped by recovery, goals, experience, and recent sessions.',
			key: 'the right workout for today'
		},
		{
			title: 'Workout Tracking',
			body: 'Log sets, reps, weight, and rest without breaking the flow of your workout.',
			key: 'without breaking the flow'
		},
		{
			title: 'Apple Watch',
			body: 'Track your workout from your wrist and keep everything in sync with iPhone.',
			key: 'from your wrist'
		},
		{
			title: 'Workout Insights',
			body: 'Review volume, heart rate, effort, and progress after every session.',
			key: 'volume, heart rate, effort, and progress'
		}
	];

	const practical = [
		{
			title: 'Your Training Balance',
			body: 'See where your current workload sits compared with what your body has adapted to.',
			key: 'what your body has adapted to'
		},
		{
			title: 'Optimal Range',
			body: 'Know when your training load is in the sweet spot for steady progress.',
			key: 'in the sweet spot'
		},
		{
			title: 'Too Much, Too Fast',
			body: 'Spot when your recent workload is rising faster than your baseline.',
			key: 'rising faster than your baseline'
		},
		{
			title: 'Falling Behind',
			body: 'See when your training load is dropping below your usual level.',
			key: 'dropping below your usual level'
		},
		{
			title: 'See the Trend',
			body: 'Follow how your balance changes over time, not just today’s number.',
			key: 'changes over time'
		},
		{
			title: 'Understand the Range',
			body: 'See how much time you spend Optimal, Detraining, or at higher risk.',
			key: 'Optimal, Detraining, or at higher risk'
		},
		{
			title: 'Train With Context',
			body: 'Use Training Balance to understand when to push, hold, or recover.',
			key: 'when to push, hold, or recover'
		}
	];

	const faqs = [
		{
			q: 'Do I need an Apple Watch?',
			a: 'No. eassy works fully on iPhone. Apple Watch adds wrist-based workout tracking and keeps your session in sync.'
		},
		{
			q: 'What is Training Readiness?',
			a: 'A daily score that combines your recent training load, sleep, HRV, and resting heart rate to show how ready you are to train.'
		},
		{
			q: 'What is Training Balance?',
			a: 'It shows how your recent training load compares with the workload your body has adapted to — helping you see when you’re in a productive range or pushing too hard.'
		},
		{
			q: 'Does eassy automatically increase my weights?',
			a: 'Smart Progression can suggest small increases in weight or reps based on your previous workouts. You always stay in control.'
		},
		{
			q: 'Can I use my own workout plans?',
			a: 'Yes. Create your own templates, edit exercises, sets and reps, build supersets, and reuse them whenever you train.'
		},
		{
			q: 'Does eassy work with Apple Health?',
			a: 'Yes. eassy can import workouts and use permitted health data to power features like Readiness, heart-rate charts, and Training Balance.'
		},
		{
			q: 'Do I need to create an account?',
			a: 'No. There is no sign-up or account required.'
		},
		{
			q: 'Where is my data stored?',
			a: 'Your workout and health data stays on your device. eassy does not require cloud storage or an account to work.'
		}
	];

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

<RevealHeader watch={firstScreen} />

<div class="first-screen" bind:this={firstScreen}>
	<SiteHeader />

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

<!-- 3. Gallery -->
<Gallery title="Inside the app." cards={features} />

<!-- 4. Training Balance — media on the left, mirroring the section above. -->
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

<!-- 5. Gallery -->
<Gallery title="Training Balance, closer up." cards={practical} />

<!-- 6. FAQ — native disclosure rows, so it opens without scripting and stays
     keyboard-operable. -->
<section class="faq">
	<div class="inner" use:reveal>
		<h2>Questions? Answers.</h2>

		<ul class="faq-list">
			{#each faqs as item (item.q)}
				<li>
					<details name="faq">
						<summary>
							<span>{item.q}</span>
						</summary>
						<p>{item.a}</p>
					</details>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- 7. Closing -->
<section class="closing">
	<div class="inner" use:reveal>
		<h2>Your core workout data stays on your iPhone.</h2>

		<AppStoreBadge placement="closing" />
	</div>
</section>

<Footer />

<style>
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

	/* The wash the clips sit on, shared with the FAQ so the page keeps one
	   surface treatment; the closing block stays on the flat page background. */
	.hero,
	.split,
	.faq {
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

	.closing h2 {
		max-width: 20ch;
		margin-bottom: var(--space-40);
	}

	/* FAQ — centred heading over a left-aligned column of disclosure rows. */

	/* Tighter block than the product sections above — a reference list, not a
	   statement, so it should not eat a whole screen. */
	.faq {
		padding-block: clamp(var(--space-56), 7vw, var(--space-96));
	}

	.faq .inner {
		max-width: 42rem;
	}

	.faq h2 {
		margin-bottom: clamp(var(--space-32), 4vw, var(--space-56));
	}

	.faq-list {
		list-style: none;
		margin: 0;
		padding: 0;
		text-align: left;
	}

	.faq-list li + li {
		border-top: 1px solid rgb(255 255 255 / 7%);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-24);
		padding-block: clamp(var(--space-20), 2vw, var(--space-24));
		/* Pull the hit area out to the row edges so the whole strip highlights and
		   responds to a click, not just the words. */
		padding-inline: var(--space-12);
		margin-inline: calc(var(--space-12) * -1);
		border-radius: var(--radius-500);
		cursor: pointer;
		/* A double-click on an accordion header should open it twice, not select
		   the question text. */
		user-select: none;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
		font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
		line-height: 1.35;
		letter-spacing: -0.005em;
		font-weight: var(--weight-semibold);
		color: var(--fg);
		/* Hide the native triangle in both engines; the marker below replaces it. */
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover {
		background: rgb(255 255 255 / 4%);
	}

	summary:hover::after,
	details[open] summary::after {
		color: var(--fg);
	}

	summary:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	/* A plus that becomes a close cross when the row is open. Two bars rather
	   than a glyph, so the rotation lands exactly on 45°. */
	summary::after {
		content: '';
		flex: none;
		width: 1rem;
		height: 1rem;
		background:
			linear-gradient(currentColor, currentColor) center / 100% 1.5px no-repeat,
			linear-gradient(currentColor, currentColor) center / 1.5px 100% no-repeat;
		color: var(--fg-muted);
		transition:
			transform var(--duration-base) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	details[open] summary::after {
		transform: rotate(45deg);
	}

	/* Open/close animation. `::details-content` is the box the browser toggles,
	   and `interpolate-size` is what lets height animate to and from `auto`
	   without measuring anything in JS. Browsers without either simply snap open,
	   which is the current behaviour, so this is purely additive. */
	details::details-content {
		height: 0;
		overflow: hidden;
		opacity: 0;
		transition:
			height var(--duration-base) var(--ease-out),
			opacity 320ms var(--ease-out),
			content-visibility var(--duration-base);
		transition-behavior: allow-discrete;
	}

	details[open]::details-content {
		height: auto;
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		summary,
		summary::after,
		details::details-content {
			transition: none;
		}
	}

	details p {
		margin: 0;
		padding-bottom: clamp(var(--space-16), 2vw, var(--space-24));
		max-width: 60ch;
		font-size: clamp(1rem, 1.2vw, 1.0625rem);
		line-height: 1.55;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
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
