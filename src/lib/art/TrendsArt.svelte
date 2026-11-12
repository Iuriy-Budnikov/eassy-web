<script lang="ts">
	import { inview } from '$lib/inview';
	import { smooth } from './smooth';

	/**
	 * Trends: the Week / Month / Year switcher cycling on its own, with the
	 * cumulative load chart redrawing and the summary tiles changing for each
	 * period. The tiles are HTML rather than part of the SVG so they reflow and
	 * stay legible on a phone.
	 *
	 * Each period owns one third of a 12s cycle. Every timed element carries its
	 * period index in `--s` and shares one set of keyframes, offset by a negative
	 * delay, so the three never drift apart. At rest (reduced motion) the Week
	 * view shows. All figures are illustrative.
	 */
	type Period = {
		name: string;
		labels: string[];
		load: number[];
		previous: number[];
		tiles: { value: string; unit?: string; delta: string; up: boolean }[];
	};

	const periods: Period[] = [
		{
			name: 'Week',
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			load: [120, 0, 180, 140, 0, 210, 90],
			previous: [100, 60, 0, 150, 120, 0, 170],
			tiles: [
				{ value: '740', delta: '12%', up: true },
				{ value: '18,420', unit: 'kg', delta: '8%', up: true },
				{ value: '4h 12m', delta: '5%', up: true },
				{ value: '1,860', unit: 'kcal', delta: '9%', up: true },
				{ value: '+2.5', unit: 'kg', delta: '3%', up: true },
				{ value: '4', delta: '1', up: true }
			]
		},
		{
			name: 'Month',
			labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
			load: [620, 700, 540, 760, 690],
			previous: [580, 610, 650, 500, 560],
			tiles: [
				{ value: '3,310', delta: '6%', up: true },
				{ value: '76,900', unit: 'kg', delta: '4%', up: true },
				{ value: '17h 40m', delta: '2%', up: false },
				{ value: '7,920', unit: 'kcal', delta: '3%', up: true },
				{ value: '+7.5', unit: 'kg', delta: '5%', up: true },
				{ value: '16', delta: '1', up: false }
			]
		},
		{
			name: 'Year',
			labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
			load: [2400, 2600, 2100, 2800, 3000, 2700, 2500, 2900, 3100, 2800, 3000, 3200],
			previous: [2000, 2100, 2300, 1900, 2400, 2200, 2000, 2500, 2600, 2300, 2400, 2500],
			tiles: [
				{ value: '33,100', delta: '21%', up: true },
				{ value: '812k', unit: 'kg', delta: '18%', up: true },
				{ value: '196h', delta: '15%', up: true },
				{ value: '88k', unit: 'kcal', delta: '14%', up: true },
				{ value: '+22.5', unit: 'kg', delta: '11%', up: true },
				{ value: '182', delta: '22', up: true }
			]
		}
	];

	const metrics = ['Training load', 'Volume', 'Duration', 'Energy', 'Best set', 'Sessions'];

	// Chart geometry, in the SVG's own units.
	const left = 40;
	const right = 640;
	const lineTop = 96;
	const lineBottom = 280;
	const barTop = 306;
	const barBottom = 380;

	const cumulative = (values: number[]) => {
		let sum = 0;
		return values.map((v) => (sum += v));
	};

	function chart(period: Period) {
		const n = period.load.length;
		const x = (i: number) => left + (i / (n - 1)) * (right - left);
		const now = cumulative(period.load);
		const before = cumulative(period.previous);
		const max = Math.max(now[n - 1], before[n - 1]) * 1.08;
		const y = (v: number) => lineBottom - (v / max) * (lineBottom - lineTop);
		const line = smooth(now.map((v, i) => [x(i), y(v)]));
		const barMax = Math.max(...period.load);
		const barWidth = Math.min(28, ((right - left) / (n - 1)) * 0.5);

		return {
			line,
			area: `${line} L${right} ${lineBottom} L${left} ${lineBottom} Z`,
			previous: smooth(before.map((v, i) => [x(i), y(v)])),
			end: [x(n - 1), y(now[n - 1])],
			bars: period.load.map((v, i) => ({
				x: x(i) - barWidth / 2,
				w: barWidth,
				h: Math.max(3, (v / barMax) * (barBottom - barTop)),
				label: period.labels[i],
				cx: x(i)
			}))
		};
	}

	const charts = periods.map(chart);
	const gridLines = [0.25, 0.5, 0.75, 1].map((f) => lineBottom - f * (lineBottom - lineTop));
</script>

<div class="trends art" use:inview={0.25}>
	<div class="panel chart">
		<svg viewBox="0 0 680 420" aria-hidden="true">
			<!-- Segmented control, with a thumb that walks across it. -->
			<rect class="seg" x="24" y="24" width="300" height="36" rx="10" />
			<rect class="thumb" x="28" y="28" width="96" height="28" rx="7" />
			{#each periods as period, s (period.name)}
				<text class="seg-label" class:later={s > 0} style:--s={s} x={76 + s * 100} y="47" text-anchor="middle"
					>{period.name}</text
				>
			{/each}

			<line class="key-now" x1="452" x2="472" y1="42" y2="42" />
			<text class="t-mono" x="480" y="46">THIS</text>
			<line class="key-prev" x1="534" x2="554" y1="42" y2="42" />
			<text class="t-mono" x="562" y="46">PREVIOUS</text>

			{#each gridLines as gy (gy)}
				<line class="grid" x1={left} x2={right} y1={gy} y2={gy} />
			{/each}
			<line class="base" x1={left} x2={right} y1={barBottom} y2={barBottom} />

			{#each charts as c, s (s)}
				<g class="slot" class:later={s > 0} style:--s={s}>
					<path class="area" d={c.area} />
					<path class="prev" d={c.previous} />
					<path class="now" d={c.line} pathLength="100" />
					<circle class="end" cx={c.end[0]} cy={c.end[1]} r="5" />

					{#each c.bars as bar, i (i)}
						<rect
							class="bar"
							x={bar.x}
							y={barBottom - bar.h}
							width={bar.w}
							height={bar.h}
							rx="3"
							style:--i={i}
						/>
						<text class="t-mono" x={bar.cx} y="404" text-anchor="middle">{bar.label}</text>
					{/each}
				</g>
			{/each}
		</svg>
	</div>

	<ul class="tiles">
		{#each metrics as metric, m (metric)}
			<li class="tile">
				<span class="tag">{metric}</span>
				<span class="values">
					{#each periods as period, s (period.name)}
						{@const tile = period.tiles[m]}
						<span class="value slot" class:later={s > 0} style:--s={s}>
							<span class="number">{tile.value}</span>
							{#if tile.unit}<span class="unit">{tile.unit}</span>{/if}
							<span class="delta" class:down={!tile.up}>{tile.up ? '▲' : '▼'} {tile.delta}</span>
						</span>
					{/each}
				</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.trends {
		--cycle: 12s;

		display: grid;
		grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
		gap: var(--space-16);
	}

	.chart svg {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Period slots: each third of the cycle belongs to one period. Week is the
	   resting state; the others start hidden. The negative delay puts each slot
	   at its point in the shared cycle from the first frame. */
	.slot {
		animation: slot var(--cycle) ease-in-out infinite;
		animation-delay: calc((var(--s) - 3) * var(--cycle) / 3);
	}

	.slot.later {
		opacity: 0;
	}

	/* Each slot fades out over the same span the next one fades in, so the
	   hand-over is a cross-fade rather than a blank beat. */
	@keyframes slot {
		0% {
			opacity: 0;
		}
		3%,
		33.3% {
			opacity: 1;
		}
		36.3%,
		100% {
			opacity: 0;
		}
	}

	/* Chart */

	.seg {
		fill: var(--p2);
		stroke: var(--border);
	}

	.thumb {
		fill: var(--card);
		stroke: var(--border-strong);
		animation: thumb var(--cycle) var(--ease-out) infinite;
	}

	@keyframes thumb {
		0%,
		31% {
			transform: translateX(0);
		}
		34.3%,
		64.3% {
			transform: translateX(100px);
		}
		67.6%,
		97.6% {
			transform: translateX(200px);
		}
		100% {
			transform: translateX(0);
		}
	}

	/* The label under the thumb reads in full ink. */
	.seg-label {
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		fill: var(--fg);
		animation: seg-label var(--cycle) steps(1, end) infinite;
		animation-delay: calc((var(--s) - 3) * var(--cycle) / 3);
	}

	.seg-label.later {
		fill: var(--fg-3);
	}

	@keyframes seg-label {
		0%,
		32.9% {
			fill: var(--fg);
		}
		33%,
		100% {
			fill: var(--fg-3);
		}
	}

	.key-now {
		stroke: var(--lime-ink);
		stroke-width: 2.5;
	}

	.key-prev {
		stroke: var(--fg-3);
		stroke-width: 1.5;
		stroke-dasharray: 3 3;
	}

	.grid {
		stroke: var(--border);
		stroke-dasharray: 2 5;
	}

	.base {
		stroke: var(--border-strong);
	}

	.area {
		fill: var(--lime-soft);
	}

	.prev {
		fill: none;
		stroke: var(--fg-3);
		stroke-width: 1.5;
		stroke-dasharray: 3 3;
	}

	.now {
		fill: none;
		stroke: var(--lime-ink);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-dasharray: 100 100;
		animation: draw var(--cycle) cubic-bezier(0.45, 0, 0.25, 1) infinite;
		animation-delay: calc((var(--s) - 3) * var(--cycle) / 3);
	}

	@keyframes draw {
		0% {
			stroke-dashoffset: 100;
		}
		14%,
		100% {
			stroke-dashoffset: 0;
		}
	}

	.end {
		fill: var(--lime);
		stroke: var(--brand-ink);
		stroke-width: 1.5;
	}

	.bar {
		fill: var(--border-strong);
		transform-box: fill-box;
		transform-origin: bottom;
		animation: grow var(--cycle) var(--ease-out) infinite;
		animation-delay: calc((var(--s) - 3) * var(--cycle) / 3 + var(--i) * 40ms);
	}

	@keyframes grow {
		0% {
			transform: scaleY(0);
		}
		8%,
		100% {
			transform: scaleY(1);
		}
	}

	/* Tiles */

	.tiles {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-12);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tile {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-12);
		padding: var(--space-16) var(--space-20);
		border: 1px solid var(--border);
		border-radius: var(--radius-700);
		background: var(--card);
	}

	/* The three periods' readings share one grid cell and cross-fade. */
	.values {
		display: grid;
	}

	.value {
		grid-area: 1 / 1;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		column-gap: var(--space-8);
	}

	.number {
		font-size: clamp(1.375rem, 2.2vw, 1.75rem);
		font-weight: var(--weight-medium);
		line-height: 1.1;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}

	.unit {
		margin-left: -0.25rem;
		font-size: var(--font-size-100);
		color: var(--fg-3);
	}

	.delta {
		font-family: var(--font-mono);
		font-size: var(--type-tag);
		font-weight: var(--weight-medium);
		color: var(--pass);
	}

	.delta.down {
		color: var(--fail);
	}

	@media (max-width: 62.5rem) {
		.trends {
			grid-template-columns: 1fr;
		}

		.tiles {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 40rem) {
		.tiles {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
