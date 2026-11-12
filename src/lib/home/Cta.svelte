<script lang="ts">
	import AppStoreBadge from '$lib/AppStoreBadge.svelte';
	import { reveal } from '$lib/reveal';

	/**
	 * The close, after qlane.ai's: the ask, what happens in the first few
	 * minutes, and a sample of what the reader gets — the "today" card a
	 * morning with eassy starts from. The card's figures are illustrative.
	 */
	const next = [
		{ who: 'You', title: 'Download eassy', body: 'Free on the App Store. Nothing to sign up for.' },
		{ who: 'Optional', title: 'Allow Apple Health', body: 'For Readiness, heart-rate charts and Training Balance.' },
		{ who: 'You', title: 'Pick a template', body: 'One of eassy’s, or build your own.' },
		{ who: 'eassy', title: 'Log your first set', body: 'From iPhone or your wrist. Progress starts here.' }
	];

	const today = [
		{ k: 'Readiness', v: '82', note: 'Ready to train', tone: 'pass' },
		{ k: 'Workout', v: 'Lower · Strength', note: '5 exercises · ~48 min' },
		{ k: 'Suggested', v: 'Squat 67.5 kg × 6', note: '+2.5 kg', tone: 'lime' },
		{ k: 'Balance', v: '1.08', note: 'Optimal', tone: 'lime' }
	];
</script>

<section class="section cta" id="start">
	<div class="section-inner">
		<div class="section-head" use:reveal>
			<span class="label">09 Start with your next workout</span>
			<h2 class="h-display">Open eassy before your next workout.</h2>
			<p class="intro">
				Free, no account, and your data stays on your iPhone. It takes a minute to set up.
			</p>
			<div class="actions"><AppStoreBadge placement="closing" /></div>
		</div>

		<div class="bottom">
			<div class="next">
				<span class="tag">What happens next · about a minute</span>
				<ol class="numbered">
					{#each next as step, i (step.title)}
						<li>
							<span class="tag">{String(i + 1).padStart(2, '0')} · {step.who}</span>
							<div>
								<h3>{step.title}</h3>
								<p>{step.body}</p>
							</div>
						</li>
					{/each}
				</ol>
			</div>

			<article class="sample" use:reveal>
				<header>
					<span class="tag">Sample · Today, 07:12</span>
					<span class="pill">Ready</span>
				</header>
				<h3>Your morning, decided.</h3>
				<dl>
					{#each today as row (row.k)}
						<div>
							<dt class="tag">{row.k}</dt>
							<dd>
								<span class="v">{row.v}</span>
								<span class="note {row.tone ?? ''}">{row.note}</span>
							</dd>
						</div>
					{/each}
				</dl>
			</article>
		</div>
	</div>
</section>

<style>
	.cta {
		padding-bottom: var(--section-gap);
	}

	.actions {
		margin-top: var(--space-8);
	}

	.bottom {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: start;
	}

	.next > .tag {
		display: block;
		margin-bottom: var(--space-12);
	}

	.numbered > li > .tag {
		width: 7rem;
	}

	.sample {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
		padding: var(--space-24);
		border: 1px solid var(--border);
		border-radius: var(--radius-900);
		background: var(--card);
		box-shadow: 0 24px 60px -32px rgb(0 0 0 / 35%);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.pill {
		padding: 0.25rem 0.625rem;
		border-radius: var(--radius-round);
		background: var(--lime);
		font-family: var(--font-mono);
		font-size: var(--type-tag);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--brand-ink);
	}

	h3 {
		margin: 0;
		font-size: var(--type-step);
		line-height: 1.2;
		font-weight: var(--weight-medium);
		letter-spacing: -0.015em;
	}

	dl {
		margin: 0;
	}

	dl > div {
		display: grid;
		grid-template-columns: 6.5rem 1fr;
		gap: var(--space-12);
		padding-block: var(--space-12);
		border-top: 1px solid var(--border);
	}

	dt {
		padding-top: 0.2rem;
	}

	dd {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--space-4) var(--space-12);
		margin: 0;
	}

	.v {
		font-weight: var(--weight-medium);
	}

	.note {
		font-size: var(--font-size-100);
		color: var(--fg-3);
	}

	.note.pass {
		color: var(--pass);
	}

	.note.lime {
		color: var(--lime-ink);
	}

	@media (max-width: 52rem) {
		.bottom {
			grid-template-columns: 1fr;
		}
	}
</style>
