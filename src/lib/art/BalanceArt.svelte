<script lang="ts">
	import { inview } from '$lib/inview';
	import { smooth } from './smooth';

	/**
	 * Training Balance: four weeks of recent-versus-adapted load drawn across
	 * the Detraining, Optimal and Higher-risk bands, with one push into the top
	 * band and a return to the middle. Illustrative data.
	 */
	const ratios = [
		0.92, 0.95, 0.98, 1.0, 1.04, 1.02, 1.06, 1.1, 1.12, 1.15, 1.18, 1.22, 1.28, 1.36, 1.44, 1.42,
		1.34, 1.24, 1.16, 1.1, 1.06, 1.04, 1.07, 1.1, 1.08, 1.06, 1.07, 1.08
	];

	const top = 104;
	const bottom = 360;
	const left = 28;
	const right = 532;
	const y = (r: number) => bottom - ((r - 0.5) / 1.2) * (bottom - top);
	const x = (i: number) => left + (i / (ratios.length - 1)) * (right - left);

	const points = ratios.map((r, i) => [x(i), y(r)] as [number, number]);
	const line = smooth(points);
	const area = `${line} L${right} ${bottom} L${left} ${bottom} Z`;
	const [endX, endY] = points[points.length - 1];

	const bands = [
		{ name: 'HIGHER RISK', from: 1.7, to: 1.3, kind: 'risk' },
		{ name: 'OPTIMAL', from: 1.3, to: 0.8, kind: 'optimal' },
		{ name: 'DETRAINING', from: 0.8, to: 0.5, kind: 'low' }
	];
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	<text class="title" x="28" y="52">Training Balance</text>
	<text class="t-mono" x="28" y="76">RECENT VS ADAPTED LOAD · 28 DAYS</text>

	{#each bands as band, i (band.name)}
		<rect
			class="band {band.kind}"
			x={left}
			y={y(band.from)}
			width={right - left}
			height={y(band.to) - y(band.from)}
			style:--i={i}
		/>
		<text class="t-mono band-label {band.kind}" x={left + 12} y={y(band.from) + 20}
			>{band.name}</text
		>
	{/each}

	<path class="area" d={area} />
	<path class="line" d={line} pathLength="100" />

	<g class="end">
		<circle class="end-halo" cx={endX} cy={endY} r="14" />
		<circle class="end-dot" cx={endX} cy={endY} r="5" />
	</g>

	<g class="readout">
		<rect class="card" x={endX - 132} y={endY - 62} width="118" height="40" rx="10" />
		<text class="t-body" x={endX - 118} y={endY - 37}>1.08</text>
		<text class="t-mono ok" x={endX - 78} y={endY - 37}>OPTIMAL</text>
	</g>

	<text class="t-mono" x={left} y="388">4 WEEKS AGO</text>
	<text class="t-mono" x={right} y="388" text-anchor="end">TODAY</text>

	<text class="t-mono" x="28" y="436">WHEN TO PUSH, HOLD, OR RECOVER</text>
</svg>

<style>
	.title {
		font-family: var(--font-sans);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.01em;
		fill: var(--fg);
	}

	.band {
		animation: fade 0.8s var(--ease-out) both;
		animation-delay: calc(var(--i) * 0.1s);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	.band.risk {
		fill: color-mix(in srgb, var(--fail) 10%, transparent);
	}

	.band.optimal {
		fill: var(--lime-soft);
	}

	.band.low {
		fill: var(--p2);
	}

	.band-label.risk {
		fill: var(--fail);
	}

	.band-label.optimal,
	.ok {
		fill: var(--lime-ink);
	}

	.area {
		fill: color-mix(in srgb, var(--fg) 5%, transparent);
		animation: fade 1s var(--ease-out) 1.6s both;
	}

	.line {
		fill: none;
		stroke: var(--fg);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-dasharray: 100 100;
		animation: draw 2.2s cubic-bezier(0.45, 0, 0.25, 1) 0.3s both;
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 100;
		}
	}

	.end,
	.readout {
		animation: pop 0.6s var(--ease-out) 2.4s both;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	.end-dot {
		fill: var(--lime);
		stroke: var(--brand-ink);
		stroke-width: 1.5;
	}

	.end-halo {
		fill: var(--lime);
		opacity: 0.35;
		transform-box: fill-box;
		transform-origin: center;
		animation: ping 2s ease-out 3s infinite;
	}

	@keyframes ping {
		0% {
			transform: scale(0.4);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.8);
			opacity: 0;
		}
	}
</style>
