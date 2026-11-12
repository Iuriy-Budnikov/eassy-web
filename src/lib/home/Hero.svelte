<script lang="ts">
	import AppStoreBadge from '$lib/AppStoreBadge.svelte';
	import HeroMorph from '$lib/HeroMorph.svelte';
	import ReadinessArt from '$lib/art/ReadinessArt.svelte';
	import { reveal } from '$lib/reveal';

	/**
	 * The first screen. One claim in two lines: the reader's part, then what
	 * eassy does with it, cycling through the four jobs the page goes on to
	 * prove. The primary action is the download; the secondary one only scrolls
	 * to the demo, and the line under them answers the three objections that
	 * stop a download (price, sign-up, data).
	 */
	// The brand name rides inside each phrase, so a phrase too long for the
	// line wraps as a whole instead of leaving "eassy" stranded on its own.
	const jobs = [
		'eassy checks your recovery.',
		'eassy picks today’s workout.',
		'eassy logs every set.',
		'eassy knows when to push.'
	];
</script>

<section class="section hero">
	<div class="section-inner grid">
		<div class="copy" use:reveal>
			<p class="pill">Strength training · iPhone &amp; Apple Watch</p>

			<h1
				class="h-display"
				aria-label="You show up to train. eassy checks your recovery, picks today’s workout, logs every set, and knows when to push."
			>
				<span class="line">You show up to train.</span>
				<span class="line"><HeroMorph words={jobs} /></span>
			</h1>

			<p class="lead">
				Log your workouts, understand your readiness, and see your progress over time. Minimal
				strength tracking for iPhone and Apple Watch.
			</p>

			<div class="actions">
				<AppStoreBadge placement="hero" />
				<a class="btn btn-ghost" href="#demo">Watch it work</a>
			</div>

			<p class="meta">Free. No account. Your data stays on your iPhone.</p>
		</div>

		<div class="panel art-wrap">
			<ReadinessArt />
		</div>
	</div>
</section>

<style>
	.hero {
		padding-top: clamp(3rem, 7vw, 6.5rem);
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: clamp(2.25rem, 4.6vw, 4.5rem);
	}

	.copy {
		display: flex;
		flex: 1 1 28rem;
		flex-direction: column;
		gap: var(--space-24);
		min-width: 0;
	}

	.art-wrap {
		flex: 1 1 24rem;
		min-width: 0;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		box-sizing: border-box;
		min-height: 1.875rem;
		margin: 0;
		padding: var(--space-4) var(--space-12);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-round);
		font-family: var(--font-mono);
		font-size: var(--type-label);
		font-weight: var(--weight-medium);
		line-height: 1.2;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.line {
		display: block;
	}

	.lead {
		margin: 0;
		max-width: 30em;
		font-size: var(--type-lead);
		line-height: 1.5;
		color: var(--fg-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-12);
		margin-top: var(--space-8);
	}

	/* Matched to the App Store badge beside it. */
	.actions .btn {
		height: 3.5rem;
	}

	.meta {
		margin: calc(var(--space-12) * -1) 0 0;
		font-size: 0.8125rem;
		color: var(--fg-3);
	}
</style>
