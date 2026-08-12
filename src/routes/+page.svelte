<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import icon from '$lib/assets/eassy-icon.svg';
	import Footer from '$lib/Footer.svelte';

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
	<title>eassy — Strength Training, Smarter</title>
	<meta
		name="description"
		content="Track workouts, understand your readiness, and progress with confidence on iPhone and Apple Watch."
	/>
	<link rel="canonical" href="https://eassy.app/" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="eassy — Know what to train. Know when to push." />
	<meta property="og:description" content="A smarter strength workout tracker for iPhone and Apple Watch." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://eassy.app/" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="eassy — Know what to train. Know when to push." />
	<meta
		name="twitter:description"
		content="A smarter strength workout tracker for iPhone and Apple Watch."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<header class="topbar">
	<div class="topbar-inner">
		<a class="wordmark" href="/">
			<img src={icon} alt="" width="28" height="28" />
			<span>eassy</span>
		</a>

		<a class="btn filled small" href={APP_STORE_URL}>Download on the App Store</a>
	</div>
</header>

<!-- 1. Hero -->
<section class="hero">
	<div class="inner">
		<h1>Know what to train.<br />Know when to push.</h1>

		<p class="lines">
			Track your workouts.<br />
			Understand your readiness.<br />
			Progress at the right pace.
		</p>

		<a class="btn filled" href={APP_STORE_URL}>Download on the App Store</a>

		<p class="platforms"><em>iPhone + Apple Watch</em></p>
	</div>
</section>

<!-- 2. Smarter training -->
<section class="smarter">
	<div class="inner">
		<h2>Your training history should tell you what to do next.</h2>

		<ol class="pillars">
			<li>
				<p class="label">Readiness</p>
				<p class="claim">Know when to push, maintain, or recover.</p>
			</li>

			<li>
				<p class="label">Smart Progression</p>
				<p class="claim">Progress weight and reps when your performance supports it.</p>
			</li>

			<li>
				<p class="label">Smart Workouts</p>
				<p class="claim">See the workout that makes the most sense today.</p>
			</li>
		</ol>
	</div>
</section>

<!-- 3. Built for Apple -->
<section class="apple">
	<div class="inner">
		<h2>Train from your wrist.<br />Keep your data yours.</h2>

		<p class="lines">
			Workout on iPhone or Apple Watch.<br />
			Connect Apple Health when you want more context.
		</p>

		<p class="lines muted">
			Your core workout data stays on your iPhone.<br />
			No eassy account required.
		</p>

		<a class="btn filled" href={APP_STORE_URL}>Download on the App Store</a>
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

	/* One message per screen: each section gets its own generous block. */

	section {
		position: relative;
		padding: clamp(var(--space-96), 16vw, 15rem) var(--space-16);
	}

	.inner {
		max-width: var(--width-page);
		margin-inline: auto;
		text-align: center;
	}

	h1 {
		font-size: clamp(2.625rem, 7vw, var(--font-size-900));
		line-height: 1.05;
		letter-spacing: var(--tracking-900);
		font-weight: var(--weight-bold);
		margin: 0 0 var(--space-40);
	}

	h2 {
		font-size: clamp(2rem, 5vw, var(--font-size-800));
		line-height: 1.1;
		letter-spacing: var(--tracking-800);
		font-weight: var(--weight-bold);
		margin: 0 0 var(--space-40);
		max-width: 24ch;
		margin-inline: auto;
	}

	.lines {
		font-size: clamp(var(--font-size-300), 2.2vw, var(--font-size-400));
		line-height: 1.6;
		letter-spacing: var(--tracking-400);
		margin: 0 0 var(--space-48);
	}

	.lines.muted {
		color: var(--fg-muted);
	}

	.platforms {
		margin: var(--space-24) 0 0;
		color: var(--fg-muted);
		font-size: var(--font-size-150);
	}

	/* Atmosphere, not content — a slow drifting readiness gradient. */

	.hero::before,
	.smarter::before {
		content: '';
		position: absolute;
		top: 42%;
		left: 50%;
		width: min(84rem, 150%);
		height: 56rem;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			ellipse 46% 50% at 50% 50%,
			rgb(168 230 42 / 0.13),
			transparent 78%
		);
		pointer-events: none;
		z-index: -1;
		animation: drift 18s ease-in-out infinite alternate;
	}

	.smarter::before {
		top: 50%;
		opacity: 0.55;
		animation-duration: 24s;
		animation-direction: alternate-reverse;
	}

	@keyframes drift {
		from {
			transform: translate(-51%, -52%) scale(1);
		}
		to {
			transform: translate(-49%, -48%) scale(1.08);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero::before,
		.smarter::before {
			animation: none;
		}
	}

	/* Three claims, stacked and large — no feature grid. */

	.pillars {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: clamp(var(--space-64), 8vw, var(--space-128));
	}

	.label {
		margin: 0 0 var(--space-12);
		color: var(--accent-text);
		font-size: var(--font-size-100);
		font-weight: var(--weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.claim {
		margin: 0;
		font-size: clamp(var(--font-size-500), 3.4vw, var(--font-size-700));
		line-height: 1.2;
		letter-spacing: var(--tracking-600);
		font-weight: var(--weight-semibold);
		max-width: 20ch;
		margin-inline: auto;
	}

	/* Buttons — notion.com metrics */

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-12);
		box-sizing: border-box;
		min-height: 2.875rem;
		padding: 0.6875rem 1.25rem;
		border: 1px solid transparent;
		border-radius: var(--radius-500);
		font-size: var(--font-size-200);
		line-height: var(--line-height-200);
		font-weight: var(--weight-medium);
		letter-spacing: 0;
		text-align: center;
		text-decoration: none;
		transition-property: background-color, color;
		transition-duration: 120ms;
	}

	.btn.small {
		min-height: 2.25rem;
		padding: 0.25rem 0.875rem;
		font-size: var(--font-size-150);
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
