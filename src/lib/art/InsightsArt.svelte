<script lang="ts">
	import { inview } from '$lib/inview';
	import { smooth } from './smooth';

	/**
	 * Workout Insights: the session summary tiles and the heart-rate trace
	 * behind them. Illustrative numbers.
	 */
	const tiles = [
		{ label: 'VOLUME', value: '8,420', unit: 'kg' },
		{ label: 'DURATION', value: '52', unit: 'min' },
		{ label: 'AVG HEART RATE', value: '128', unit: 'bpm' },
		{ label: 'EFFORT', value: '7', unit: '/ 10' }
	];

	const hr = [
		92, 104, 128, 112, 136, 118, 142, 120, 146, 124, 150, 122, 140, 118, 144, 126, 152, 128, 138,
		112, 100
	];
	const top = 270;
	const bottom = 392;
	const y = (b: number) => bottom - ((b - 80) / 80) * (bottom - top);
	const x = (i: number) => 28 + (i / (hr.length - 1)) * 504;
	const line = smooth(hr.map((b, i) => [x(i), y(b)]));
	const area = `${line} L532 ${bottom} L28 ${bottom} Z`;
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	<defs>
		<linearGradient id="hr-fill" x1="0" x2="0" y1="0" y2="1">
			<stop offset="0" style="stop-color: var(--fail); stop-opacity: 0.28" />
			<stop offset="1" style="stop-color: var(--fail); stop-opacity: 0" />
		</linearGradient>
	</defs>

	<text class="title" x="28" y="52">Push day</text>
	<text class="t-mono" x="28" y="76">SESSION SUMMARY · TODAY</text>

	{#each tiles as tile, i (tile.label)}
		{@const tx = 28 + (i % 2) * 256}
		{@const ty = 96 + Math.floor(i / 2) * 82}
		<g class="tile" style:--i={i}>
			<rect class="card" x={tx} y={ty} width="248" height="70" rx="12" />
			<text class="t-mono" x={tx + 18} y={ty + 26}>{tile.label}</text>
			<text class="value" x={tx + 18} y={ty + 54}
				>{tile.value}<tspan class="unit" dx="6">{tile.unit}</tspan></text
			>
		</g>
	{/each}

	<line class="base" x1="28" x2="532" y1={bottom} y2={bottom} />
	<path class="area" d={area} fill="url(#hr-fill)" />
	<path class="line" d={line} pathLength="100" />
	<line class="scrub" x1="28" x2="28" y1={top - 10} y2={bottom} />

	<text class="t-mono" x="28" y="420">HEART RATE</text>
	<text class="t-mono" x="532" y="420" text-anchor="end">52 MIN</text>
</svg>

<style>
	.title {
		font-family: var(--font-sans);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.01em;
		fill: var(--fg);
	}

	.tile {
		animation: rise 0.6s var(--ease-out) both;
		animation-delay: calc(var(--i) * 0.1s);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	.value {
		font-family: var(--font-sans);
		font-size: 24px;
		font-weight: 500;
		letter-spacing: -0.02em;
		fill: var(--fg);
	}

	.unit {
		font-size: 14px;
		fill: var(--fg-3);
	}

	.base {
		stroke: var(--border-strong);
	}

	.area {
		animation: fade 1s var(--ease-out) 1.6s both;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	.line {
		fill: none;
		stroke: var(--fail);
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-dasharray: 100 100;
		animation: draw 2s cubic-bezier(0.45, 0, 0.25, 1) 0.4s both;
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 100;
		}
	}

	/* A playhead that sweeps the trace once it is drawn. Hidden at rest. */
	.scrub {
		stroke: var(--fg);
		stroke-width: 1;
		stroke-dasharray: 3 3;
		opacity: 0;
		animation: sweep 5s linear 2.6s infinite;
	}

	@keyframes sweep {
		0% {
			transform: translateX(0);
			opacity: 0;
		}
		8%,
		92% {
			opacity: 0.6;
		}
		100% {
			transform: translateX(504px);
			opacity: 0;
		}
	}
</style>
