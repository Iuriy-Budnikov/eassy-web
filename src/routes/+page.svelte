<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import icon from '$lib/assets/eassy-icon.svg';
	import Footer from '$lib/Footer.svelte';

	const appStoreUrl: string | null = APP_STORE_URL;
</script>

<svelte:head>
	<title>eassy — Smart Strength Training for iPhone &amp; Apple Watch</title>
	<meta
		name="description"
		content="Track strength workouts, follow smarter progression, monitor training readiness, and train from your Apple Watch with eassy."
	/>
	<link rel="canonical" href="https://eassy.app/" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="eassy — Train smarter. Progress with confidence." />
	<meta
		property="og:description"
		content="A focused strength-training app for iPhone and Apple Watch with smart progression, readiness, workout tracking, and private on-device data."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://eassy.app/" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="eassy — Smart Strength Training" />
	<meta
		name="twitter:description"
		content="Track workouts, understand readiness, and know when to progress — on iPhone and Apple Watch."
	/>
</svelte:head>

<div class="page">
	<header class="hero">
		<img class="mark" src={icon} alt="" width="72" height="72" />

		<h1>Train smarter.<br />Progress with confidence.</h1>

		<p class="lede">
			eassy is a strength-training companion for iPhone and Apple Watch that helps you log less,
			understand your training, and know what to do next.
		</p>

		<p class="sub">
			Track every set, follow your real progress, and get practical guidance based on your workout
			history, readiness, and training load.
		</p>

		<!-- Until the App Store URL exists, the working action carries the filled style. -->
		<div class="ctas">
			{#if appStoreUrl}
				<a class="btn filled" href={appStoreUrl}>Download on the App Store</a>
				<a class="btn outline" href="#features">Explore features</a>
			{:else}
				<span class="btn disabled" aria-disabled="true">Download on the App Store</span>
				<a class="btn filled" href="#features">Explore features</a>
			{/if}
		</div>

		{#if !appStoreUrl}
			<p class="note">Coming soon to the App Store.</p>
		{/if}

		<ul class="points">
			<li>Fast set, weight, rep, rest, and effort tracking</li>
			<li>Apple Watch workout companion</li>
			<li>Smart Progression based on previous performance</li>
			<li>Training Readiness and Training Load Ratio</li>
			<li>Reusable workout templates and 1,700+ exercises</li>
		</ul>
	</header>

	<section id="features">
		<p class="eyebrow">Know what to train. Know when to push.</p>
		<h2>More than a workout log.</h2>

		<p class="intro">
			eassy turns your training history into useful decisions — without forcing you to interpret a
			wall of charts.
		</p>

		<div class="cards">
			<article>
				<h3>Training Readiness</h3>
				<p>
					See a daily readiness score built from your recent training load and, when Apple Health is
					connected, signals such as sleep, HRV, and resting heart rate.
				</p>
				<p>
					Use it as a simple answer to one question: <strong>how ready am I to train today?</strong>
				</p>
			</article>

			<article>
				<h3>Smart Progression</h3>
				<p>
					eassy looks at completed reps, previous sessions, exercise type, training level, and
					readiness before adjusting your next workout targets.
				</p>
				<p>Progress when the data supports it. Hold when it doesn't.</p>
			</article>

			<article>
				<h3>Smarter workout recommendations</h3>
				<p>
					Your Dashboard considers what you trained recently, muscle recovery, your routine,
					readiness, training load, and the templates that have worked for you before.
				</p>
				<p>
					Instead of showing the same workout every day, eassy helps surface the session that makes
					sense <strong>today</strong>.
				</p>
			</article>
		</div>

		<p class="section-cta"><a href="#built">See how eassy works</a></p>
	</section>

	<section id="built">
		<p class="eyebrow">Built around your workout. Built for Apple.</p>
		<h2>From your wrist to your history.</h2>

		<p>
			Start on iPhone or Apple Watch and keep your workout in sync while you train. Rest timing, set
			duration, weights, reps, and workout state stay connected across your devices.
		</p>

		<p>
			Live Activities and Dynamic Island keep the current exercise, set, and rest timer visible
			without making you reopen the app.
		</p>

		<p>
			Connect Apple Health to bring supported workouts, heart rate, pace, sleep, HRV, resting heart
			rate, height, and weight into the features that use them.
		</p>

		<div class="privacy">
			<h3>Private by design.</h3>

			<p>Your core eassy workout data is stored locally on your iPhone.</p>

			<ul>
				<li>No eassy account required</li>
				<li>No eassy cloud workout sync</li>
				<li>Apple Health access is optional and permission-based</li>
				<li>Built-in Apple Intelligence coaching runs on-device where supported</li>
				<li>External sharing happens only when you choose to share</li>
			</ul>
		</div>

	</section>
</div>

<!-- Closing CTA band, following notion.com/product: full-bleed gray-200,
     centred display heading over the primary and secondary actions. -->
<section class="band">
	<div class="band-inner">
		<h2>Get started today.</h2>

		<div class="ctas">
			{#if appStoreUrl}
				<a class="btn filled" href={appStoreUrl}>Download eassy on the App Store</a>
			{:else}
				<span class="btn disabled" aria-disabled="true">Download eassy on the App Store</span>
			{/if}
		</div>
	</div>
</section>

<Footer />

<style>
	.page {
		max-width: var(--width-page);
		margin-inline: auto;
		padding: 0 var(--space-20) var(--space-64);
	}

	/* Hero */

	.hero {
		position: relative;
		padding: var(--space-96) 0 var(--space-80);
		text-align: center;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: -10rem;
		left: 50%;
		width: min(56rem, 100%);
		height: 34rem;
		transform: translateX(-50%);
		background: radial-gradient(
			ellipse 42% 46% at 50% 50%,
			rgb(168 230 42 / var(--glow, 0.16)),
			transparent 70%
		);
		pointer-events: none;
		z-index: -1;
	}

	.mark {
		border-radius: 22%;
		margin-bottom: var(--space-32);
	}

	h1 {
		font-size: var(--font-size-800);
		line-height: var(--line-height-800);
		letter-spacing: var(--tracking-800);
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-24);
	}

	.lede {
		font-size: var(--font-size-350);
		line-height: var(--line-height-500);
		letter-spacing: var(--tracking-400);
		font-weight: var(--weight-medium);
		max-width: 38rem;
		margin: 0 auto var(--space-16);
	}

	.sub {
		color: var(--fg-muted);
		font-size: var(--font-size-300);
		line-height: var(--line-height-300);
		max-width: 36rem;
		margin: 0 auto var(--space-40);
	}

	/* Buttons */

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-12);
		justify-content: center;
		margin-bottom: var(--space-12);
	}

	/* Button system from notion.com: 0.5rem radius, size-L metrics,
	   1rem/medium label, and alpha-shifted backgrounds on hover. */

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

	.outline {
		background: var(--surface);
		border-color: var(--border-strong);
		color: var(--fg);
	}

	.outline:hover {
		background: var(--bg-subtle);
	}

	.disabled {
		background: none;
		border-color: var(--border);
		color: var(--fg-muted);
		cursor: auto;
	}

	.note {
		color: var(--fg-muted);
		font-size: var(--font-size-100);
		line-height: var(--line-height-100);
		margin: 0 0 var(--space-48);
	}

	.points {
		display: inline-grid;
		gap: var(--space-8);
		list-style: none;
		margin: 0;
		padding: 0;
		text-align: left;
		color: var(--fg-muted);
		font-size: var(--font-size-150);
	}

	.points li {
		padding-left: 1.125rem;
		text-indent: -1.125rem;
	}

	.points li::before {
		content: '';
		display: inline-block;
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
		background: var(--accent);
		margin-right: var(--space-12);
		vertical-align: middle;
	}

	/* Sections */

	section {
		padding: var(--space-80) 0;
		border-top: 1px solid var(--border);
	}

	.eyebrow {
		color: var(--accent-text);
		font-size: var(--font-size-100);
		line-height: var(--line-height-100);
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-12);
	}

	h2 {
		font-size: var(--font-size-700);
		line-height: var(--line-height-700);
		letter-spacing: var(--tracking-700);
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-20);
	}

	h3 {
		font-size: var(--font-size-300);
		line-height: var(--line-height-300);
		letter-spacing: var(--tracking-300);
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-12);
	}

	section p {
		margin: 0 0 var(--space-16);
		max-width: 42rem;
	}

	.intro {
		color: var(--fg-muted);
		font-size: var(--font-size-300);
		line-height: var(--line-height-300);
		margin-bottom: var(--space-40);
	}

	.cards {
		display: grid;
		gap: var(--space-16);
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		margin-bottom: var(--space-32);
	}

	.cards article {
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: var(--radius-900);
		padding: var(--space-24);
	}

	.cards p {
		color: var(--fg-muted);
		font-size: var(--font-size-150);
		margin-bottom: var(--space-12);
	}

	.cards p:last-child {
		margin-bottom: 0;
	}

	.cards strong {
		color: var(--fg);
		font-weight: var(--weight-semibold);
	}

	.section-cta a {
		color: var(--accent-text);
		font-weight: var(--weight-medium);
		text-decoration: none;
	}

	.section-cta a:hover {
		text-decoration: underline;
	}

	.privacy {
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		border-radius: var(--radius-900);
		padding: var(--space-32);
		margin: var(--space-40) 0;
	}

	.privacy ul {
		margin: 0;
		padding-left: var(--space-20);
		color: var(--fg-muted);
		font-size: var(--font-size-150);
	}

	.privacy li {
		margin-bottom: var(--space-8);
	}

	.privacy li::marker {
		color: var(--accent);
	}

	/* Closing CTA band */

	.band {
		background: var(--bg-band);
		padding: clamp(var(--space-80), 13vw, 10rem) var(--space-16);
	}

	.band-inner {
		max-width: var(--width-page);
		margin-inline: auto;
		text-align: center;
	}

	.band h2 {
		font-size: var(--font-size-600);
		line-height: var(--line-height-600);
		letter-spacing: var(--tracking-600);
		font-weight: var(--weight-bold);
		margin: 0;
	}

	.band .ctas {
		margin: var(--space-24) 0 0;
	}

	@media (max-width: 40rem) {
		.band h2 {
			font-size: var(--font-size-500);
			line-height: var(--line-height-500);
			letter-spacing: var(--tracking-500);
		}
	}


	/* Notion scales its display sizes down a step on small screens */

	@media (max-width: 40rem) {
		h1 {
			font-size: var(--font-size-600);
			line-height: var(--line-height-600);
			letter-spacing: var(--tracking-600);
		}

	}

	/* Keep the authored line break intact by stepping the headline down again. */
	@media (max-width: 30rem) {
		h1 {
			font-size: var(--font-size-500);
			line-height: var(--line-height-500);
			letter-spacing: var(--tracking-500);
		}

		.lede {
			font-size: var(--font-size-200);
			line-height: var(--line-height-200);
		}

		h2 {
			font-size: var(--font-size-500);
			line-height: var(--line-height-600);
			letter-spacing: var(--tracking-500);
		}

		.hero {
			padding: var(--space-64) 0 var(--space-56);
		}

		section {
			padding: var(--space-56) 0;
		}
	}
</style>
