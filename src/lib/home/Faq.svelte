<script lang="ts">
	import { reveal } from '$lib/reveal';

	/**
	 * Objections, grouped in the order they come up — before downloading, in
	 * the first week, and about data — as tabs over the native disclosure rows,
	 * after qlane.ai's FAQ.
	 */
	const groups = [
		{
			title: 'Before you download',
			items: [
				{ q: 'How much does eassy cost?', a: 'eassy is free to download and use.' },
				{
					q: 'Do I need an Apple Watch?',
					a: 'No. eassy works fully on iPhone. Apple Watch adds wrist-based workout tracking and keeps your session in sync.'
				},
				{ q: 'Do I need to create an account?', a: 'No. There is no sign-up or account required.' }
			]
		},
		{
			title: 'Your first week',
			items: [
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
				}
			]
		},
		{
			title: 'Your data',
			items: [
				{
					q: 'Does eassy work with Apple Health?',
					a: 'Yes. eassy can import workouts and use permitted health data to power features like Readiness, heart-rate charts, and Training Balance.'
				},
				{
					q: 'Where is my data stored?',
					a: 'Your workout and health data stays on your device. eassy does not require cloud storage or an account to work.'
				}
			]
		}
	];

	let active = $state(0);
</script>

<section class="section" id="faq">
	<div class="section-inner grid">
		<div class="section-head" use:reveal>
			<span class="label">08 Before you download</span>
			<h2 class="h-section">What people ask before they train with it.</h2>
			<p class="intro">
				In the order the questions come up. Anything else, <a href="/support">ask support</a>.
			</p>

			<div class="tabs" role="tablist" aria-label="Question groups">
				{#each groups as g, i (g.title)}
					<button
						type="button"
						role="tab"
						id="faq-tab-{i}"
						aria-selected={active === i}
						aria-controls="faq-panel"
						tabindex={active === i ? 0 : -1}
						onclick={() => (active = i)}
						onkeydown={(e) => {
							if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
							e.preventDefault();
							active = (active + (e.key === 'ArrowDown' ? 1 : groups.length - 1)) % groups.length;
							document.getElementById(`faq-tab-${active}`)?.focus();
						}}
					>
						<span class="tag">{String(i + 1).padStart(2, '0')}</span>
						{g.title}
					</button>
				{/each}
			</div>
		</div>

		<div id="faq-panel" role="tabpanel" aria-labelledby="faq-tab-{active}">
			<span class="tag group">{String(active + 1).padStart(2, '0')} {groups[active].title}</span>
			<ul class="faq-list">
				{#each groups[active].items as item (item.q)}
					<li>
						<details name="faq">
							<summary><span>{item.q}</span></summary>
							<p>{item.a}</p>
						</details>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: start;
	}

	.grid .section-head {
		position: sticky;
		top: 6rem;
		margin-bottom: 0;
	}

	.tabs {
		display: flex;
		flex-direction: column;
		margin-top: var(--space-16);
		border-top: 1px solid var(--border);
	}

	.tabs button {
		display: flex;
		align-items: center;
		gap: var(--space-12);
		padding: var(--space-12) 0;
		border: 0;
		border-bottom: 1px solid var(--border);
		background: none;
		font: inherit;
		font-size: var(--font-size-200);
		font-weight: var(--weight-medium);
		text-align: left;
		color: var(--fg-muted);
		cursor: pointer;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.tabs button[aria-selected='true'] {
		color: var(--fg);
	}

	.tabs button[aria-selected='true'] .tag {
		color: var(--lime-ink);
	}

	.tabs button:focus-visible {
		outline: 2px solid var(--lime-ink);
		outline-offset: 2px;
	}

	.group {
		display: block;
		margin-bottom: var(--space-12);
	}

	.faq-list {
		margin: 0;
		padding: 0;
		list-style: none;
		border-bottom: 1px solid var(--border);
	}

	.faq-list li {
		border-top: 1px solid var(--border);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-24);
		padding-block: var(--space-20);
		cursor: pointer;
		/* A double-click on an accordion header should open it twice, not select
		   the question text. */
		user-select: none;
		font-size: clamp(1.0625rem, 1.35vw, 1.1875rem);
		line-height: 1.35;
		font-weight: var(--weight-medium);
		transition: color var(--duration-fast) var(--ease-out);
		/* Hide the native triangle in both engines; the marker below replaces it. */
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover {
		color: var(--lime-ink);
	}

	summary:focus-visible {
		outline: 2px solid var(--lime-ink);
		outline-offset: 2px;
	}

	/* A plus that becomes a close cross when the row is open. Two bars rather
	   than a glyph, so the rotation lands exactly on 45°. */
	summary::after {
		content: '';
		flex: none;
		width: 0.875rem;
		height: 0.875rem;
		background:
			linear-gradient(currentColor, currentColor) center / 100% 1.5px no-repeat,
			linear-gradient(currentColor, currentColor) center / 1.5px 100% no-repeat;
		color: var(--fg-3);
		transition: transform var(--duration-base) var(--ease-out);
	}

	details[open] summary::after {
		transform: rotate(45deg);
	}

	/* Open/close animation. `::details-content` is the box the browser toggles,
	   and `interpolate-size` is what lets height animate to and from `auto`
	   without measuring anything in JS. Browsers without either simply snap open. */
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

	details p {
		margin: 0;
		padding-bottom: var(--space-24);
		max-width: 60ch;
		font-size: var(--font-size-200);
		line-height: 1.6;
		color: var(--fg-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		summary,
		summary::after,
		details::details-content {
			transition: none;
		}
	}

	@media (max-width: 62.5rem) {
		.grid {
			grid-template-columns: 1fr;
		}

		.grid .section-head {
			position: static;
		}
	}
</style>
