<script lang="ts">
	import { inview } from '$lib/inview';
	import { reveal } from '$lib/reveal';
	import { smooth } from '$lib/art/smooth';

	/**
	 * The problem, after qlane.ai's "The gap": one ordinary training week told
	 * twice, without eassy and with it, behind a toggle that plays on its own
	 * until the reader takes it over. The load line above the days shows the
	 * same story as Training Balance would — a spike into the risk band, or a
	 * week that stays in range. Below, the three moments a plain log misses.
	 */
	type Tone = 'neutral' | 'warn' | 'fail' | 'lime' | 'pass';
	type Day = { day: string; tone: Tone; text: string };

	const weeks: Record<'without' | 'with', { load: number[]; days: Day[]; verdict: string }> = {
		without: {
			load: [72, 80, 26, 38, 100, 136, 124],
			days: [
				{ day: 'Mon', tone: 'neutral', text: 'Heavy squat day' },
				{ day: 'Tue', tone: 'warn', text: 'Slept five hours' },
				{ day: 'Wed', tone: 'fail', text: 'Trained hard anyway' },
				{ day: 'Thu', tone: 'warn', text: 'Legs still sore' },
				{ day: 'Fri', tone: 'fail', text: 'Missed reps on squat' },
				{ day: 'Sat', tone: 'neutral', text: 'Skipped the gym' },
				{ day: 'Sun', tone: 'neutral', text: 'The week stalled' }
			],
			verdict: 'Every set was logged. Nothing said to ease off on Wednesday.'
		},
		with: {
			load: [72, 80, 100, 84, 70, 92, 84],
			days: [
				{ day: 'Mon', tone: 'neutral', text: 'Heavy squat day' },
				{ day: 'Tue', tone: 'warn', text: 'Slept five hours' },
				{ day: 'Wed', tone: 'lime', text: 'Readiness 54 · lighter template' },
				{ day: 'Thu', tone: 'pass', text: 'Recovered · readiness 81' },
				{ day: 'Fri', tone: 'pass', text: '+2.5 kg suggested, and made' },
				{ day: 'Sat', tone: 'neutral', text: 'Rest · balance optimal' },
				{ day: 'Sun', tone: 'pass', text: 'On track for next week' }
			],
			verdict: 'Same week. eassy read Tuesday night and changed Wednesday.'
		}
	};

	const moments = [
		{
			moment: 'Before you train',
			kept: 'What you lifted last time',
			missed: 'How recovered you are today',
			eassy: 'Training Readiness: a daily score from recent load, sleep, HRV and resting heart rate.'
		},
		{
			moment: 'During the session',
			kept: 'Sets and reps',
			missed: 'Rest, heart rate and the flow of the workout',
			eassy: 'Log sets, reps, weight and rest on iPhone or from your wrist.'
		},
		{
			moment: 'Week to week',
			kept: 'A growing pile of numbers',
			missed: 'Whether the load is too much, or too little',
			eassy: 'Training Balance: recent load against what your body has adapted to.'
		}
	];

	let mode = $state<'without' | 'with'>('without');
	let pinned = $state(false);

	$effect(() => {
		if (pinned || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = setInterval(() => {
			mode = mode === 'without' ? 'with' : 'without';
		}, 7000);
		return () => clearInterval(timer);
	});

	function pick(next: 'without' | 'with') {
		mode = next;
		pinned = true;
	}

	const week = $derived(weeks[mode]);
	const x = (i: number) => 70 + i * 140;
	const line = $derived(smooth(week.load.map((y, i) => [x(i), y])));
</script>

<section class="section" id="why">
	<div class="section-inner">
		<div class="section-head" use:reveal>
			<span class="label">03 The gap</span>
			<h2 class="h-section">Most logs remember what you lifted. None tell you what today should be.</h2>
			<p class="intro">
				A training log is a record. It can’t see that you slept five hours, or that this week’s load
				is climbing faster than your body has adapted to. eassy is the step that reads both before
				you load the bar.
			</p>
		</div>

		<div class="panel week">
			<div class="week-top">
				<span class="tag">One week · two ways</span>
				<div class="toggle" role="group" aria-label="Scenario">
					<button type="button" aria-pressed={mode === 'without'} onclick={() => pick('without')}
						>Without eassy</button
					>
					<button type="button" aria-pressed={mode === 'with'} onclick={() => pick('with')}
						>With eassy</button
					>
				</div>
			</div>

			{#key mode}
				<svg class="art chart" viewBox="0 0 980 170" use:inview aria-hidden="true">
					<rect class="band risk" x="0" y="0" width="980" height="56" />
					<rect class="band ok" x="0" y="56" width="980" height="56" />
					<rect class="band low" x="0" y="112" width="980" height="58" />
					<text class="t-mono risk-t" x="964" y="22" text-anchor="end">HIGHER RISK</text>
					<text class="t-mono ok-t" x="964" y="78" text-anchor="end">OPTIMAL</text>
					<text class="t-mono" x="964" y="134" text-anchor="end">DETRAINING</text>
					<path class="load" d={line} pathLength="100" />
					{#each week.load as y, i (i)}
						<circle class="pt" class:bad={y < 56 || y > 112} cx={x(i)} cy={y} r="5" style:--i={i} />
					{/each}
				</svg>

				<ol class="days">
					{#each week.days as d, i (d.day)}
						<li class="day {d.tone}" style:--i={i}>
							<span class="tag">{d.day}</span>
							<span class="dot"></span>
							<span class="text">{d.text}</span>
						</li>
					{/each}
				</ol>

				<p class="verdict {mode}">{week.verdict}</p>
			{/key}
		</div>

		<ul class="moments">
			{#each moments as card, i (card.moment)}
				<li use:reveal>
					<span class="tag">{String(i + 1).padStart(2, '0')} · {card.moment}</span>
					<div class="checks">
						<p class="kept"><span class="mark" aria-hidden="true">✓</span>Kept: {card.kept}</p>
						<p class="missed"><span class="mark" aria-hidden="true">✕</span>Missed: {card.missed}</p>
					</div>
					<p class="answer">{card.eassy}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.week {
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
		padding: clamp(1rem, 2.5vw, 2rem);
		background: var(--card);
	}

	.week-top {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-12);
	}

	.toggle {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-4);
		border: 1px solid var(--border);
		border-radius: var(--radius-500);
		background: var(--p2);
	}

	.toggle button {
		height: 2.25rem;
		padding-inline: var(--space-16);
		border: 1px solid transparent;
		border-radius: var(--radius-400);
		background: none;
		font: inherit;
		font-size: var(--font-size-150);
		font-weight: var(--weight-medium);
		color: var(--fg-muted);
		cursor: pointer;
	}

	.toggle button[aria-pressed='true'] {
		border-color: var(--border-strong);
		background: var(--card);
		color: var(--fg);
	}

	.toggle button:focus-visible {
		outline: 2px solid var(--lime-ink);
		outline-offset: 2px;
	}

	.chart {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius-500);
	}

	.band.risk {
		fill: color-mix(in srgb, var(--fail) 9%, transparent);
	}

	.band.ok {
		fill: var(--lime-soft);
	}

	.band.low {
		fill: var(--p2);
	}

	.risk-t {
		fill: var(--fail);
	}

	.ok-t {
		fill: var(--lime-ink);
	}

	.load {
		fill: none;
		stroke: var(--fg);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-dasharray: 100 100;
		animation: draw 1.6s cubic-bezier(0.45, 0, 0.25, 1) both;
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 100;
		}
	}

	.pt {
		fill: var(--card);
		stroke: var(--fg);
		stroke-width: 2;
		animation: pop 0.4s var(--ease-out) both;
		animation-delay: calc(0.2s + var(--i) * 0.2s);
	}

	.pt.bad {
		fill: var(--fail);
		stroke: var(--fail);
	}

	@keyframes pop {
		from {
			opacity: 0;
		}
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: var(--space-8);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.day {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		padding: var(--space-12);
		border: 1px solid var(--border);
		border-radius: var(--radius-700);
		background: var(--bg);
		animation: day-in 0.5s var(--ease-out) both;
		animation-delay: calc(0.2s + var(--i) * 0.2s);
	}

	@keyframes day-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--border-strong);
	}

	.warn .dot {
		background: var(--warn);
	}

	.fail .dot {
		background: var(--fail);
	}

	.pass .dot {
		background: var(--pass);
	}

	.lime {
		border-color: var(--lime-ink);
		background: var(--lime-soft);
	}

	.lime .dot {
		background: var(--lime);
		box-shadow: 0 0 0 3px var(--lime-soft);
	}

	.text {
		font-size: var(--font-size-150);
		line-height: 1.35;
		font-weight: var(--weight-medium);
	}

	.verdict {
		margin: 0;
		padding-top: var(--space-16);
		border-top: 1px solid var(--border);
		font-size: var(--font-size-300);
		font-weight: var(--weight-medium);
		animation: day-in 0.6s var(--ease-out) 1.6s both;
	}

	.verdict.with {
		color: var(--lime-ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.day,
		.verdict {
			animation: none;
		}
	}

	@media (max-width: 52rem) {
		.days {
			grid-template-columns: 1fr;
		}

		.day {
			flex-direction: row;
			align-items: center;
		}

		.day .tag {
			width: 2rem;
		}
	}

	/* The three moments */

	.moments {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
		gap: var(--space-16);
		margin: var(--space-16) 0 0;
		padding: 0;
		list-style: none;
	}

	.moments li {
		display: flex;
		flex-direction: column;
		gap: var(--space-20);
		padding: var(--space-24);
		border: 1px solid var(--border);
		border-radius: var(--radius-900);
		background: var(--card);
	}

	.checks {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.checks p {
		display: flex;
		gap: var(--space-8);
		margin: 0;
		font-size: var(--font-size-150);
		line-height: 1.45;
		color: var(--fg-muted);
	}

	.mark {
		display: grid;
		flex: none;
		place-items: center;
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.0625rem;
		border-radius: 50%;
		font-size: 0.625rem;
		font-weight: var(--weight-bold);
		color: #fff;
	}

	.kept .mark {
		background: var(--pass);
	}

	.missed .mark {
		background: var(--fail);
	}

	.answer {
		margin: auto 0 0;
		padding-top: var(--space-16);
		border-top: 1px solid var(--border);
		font-size: var(--font-size-300);
		line-height: 1.4;
		font-weight: var(--weight-medium);
		letter-spacing: -0.01em;
	}
</style>
