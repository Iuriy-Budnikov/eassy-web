<script lang="ts">
	import { inview } from '$lib/inview';

	/**
	 * Hero illustration: the four Apple Health inputs flowing into the daily
	 * Training Readiness score. The figures are illustrative, not real data.
	 */
	const inputs = [
		{ label: 'SLEEP', value: '7 h 42 m' },
		{ label: 'HRV', value: '64 ms' },
		{ label: 'RESTING HR', value: '52 bpm' },
		{ label: 'LOAD · 7 DAYS', value: 'Steady' }
	];

	const cx = 408;
	const cy = 230;
	const ticks = Array.from({ length: 60 }, (_, i) => (i / 60) * Math.PI * 2);
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	{#each inputs as input, i (input.label)}
		{@const y = 68 + i * 92}
		{@const path = `M206 ${y + 28} C 262 ${y + 28}, 248 ${cy}, 296 ${cy}`}
		<path class="wire" d={path} />
		<path class="pulse" d={path} pathLength="100" style:--i={i} />

		<g class="chip" style:--i={i}>
			<rect class="card" x="28" {y} width="178" height="56" rx="10" />
			<text class="t-mono" x="46" y={y + 22}>{input.label}</text>
			<text class="t-body" x="46" y={y + 42}>{input.value}</text>
			<circle class="led" cx="188" cy={y + 28} r="4" style:--i={i} />
		</g>
	{/each}

	<g class="ticks">
		{#each ticks as a, i (i)}
			<line
				x1={cx + Math.cos(a) * 128}
				y1={cy + Math.sin(a) * 128}
				x2={cx + Math.cos(a) * (i % 5 === 0 ? 138 : 133)}
				y2={cy + Math.sin(a) * (i % 5 === 0 ? 138 : 133)}
			/>
		{/each}
	</g>

	<circle class="halo" {cx} {cy} r="114" />
	<circle class="track" {cx} {cy} r="96" />
	<circle class="ring" {cx} {cy} r="96" pathLength="100" transform="rotate(-90 {cx} {cy})" />

	<text class="t-mono" x={cx} y={cy - 40} text-anchor="middle">READINESS</text>
	<text class="score" x={cx} y={cy + 22} text-anchor="middle">82</text>
	<g class="verdict">
		<circle cx={cx - 50} cy={cy + 50} r="4" />
		<text x={cx - 40} y={cy + 55}>Ready to train</text>
	</g>

	<text class="t-mono" x="28" y="436">FROM APPLE HEALTH · UPDATED 07:12</text>
</svg>

<style>
	.wire {
		fill: none;
		stroke: var(--border-strong);
		stroke-width: 1.5;
		stroke-dasharray: 3 5;
	}

	/* A short lime segment that runs the length of each wire, staggered. */
	.pulse {
		fill: none;
		stroke: var(--lime-ink);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-dasharray: 10 90;
		opacity: 0;
		animation: travel 2.6s linear infinite;
		animation-delay: calc(var(--i) * 0.45s + 1.2s);
	}

	@keyframes travel {
		0% {
			stroke-dashoffset: 100;
			opacity: 0;
		}
		10%,
		85% {
			opacity: 1;
		}
		100% {
			stroke-dashoffset: 10;
			opacity: 0;
		}
	}

	.chip {
		animation: chip-in 0.7s var(--ease-out) both;
		animation-delay: calc(var(--i) * 0.1s);
	}

	@keyframes chip-in {
		from {
			opacity: 0;
			transform: translateX(-12px);
		}
	}

	.led {
		fill: var(--lime);
		stroke: var(--lime-ink);
		stroke-width: 1;
		transform-box: fill-box;
		transform-origin: center;
		animation: blink 2.6s ease-in-out infinite;
		animation-delay: calc(var(--i) * 0.45s + 1.2s);
	}

	@keyframes blink {
		0%,
		100% {
			transform: scale(1);
		}
		8% {
			transform: scale(1.6);
		}
		20% {
			transform: scale(1);
		}
	}

	.ticks line {
		stroke: var(--border-strong);
		stroke-width: 1.5;
	}

	.ticks {
		transform-box: view-box;
		transform-origin: 408px 230px;
		animation: spin 60s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.halo {
		fill: none;
		stroke: var(--lime);
		stroke-width: 1.5;
		opacity: 0.5;
		transform-box: fill-box;
		transform-origin: center;
		animation: breathe 3.2s ease-in-out infinite;
	}

	@keyframes breathe {
		0%,
		100% {
			transform: scale(0.97);
			opacity: 0.15;
		}
		50% {
			transform: scale(1.03);
			opacity: 0.6;
		}
	}

	.track {
		fill: var(--card);
		stroke: var(--p3);
		stroke-width: 16;
	}

	.ring {
		fill: none;
		stroke: var(--lime);
		stroke-width: 16;
		stroke-linecap: round;
		stroke-dasharray: 100 100;
		stroke-dashoffset: 18;
		animation: fill-ring 1.8s var(--ease-out) 0.4s both;
	}

	@keyframes fill-ring {
		from {
			stroke-dashoffset: 100;
		}
	}

	.score {
		font-family: var(--font-sans);
		font-size: 68px;
		font-weight: 500;
		letter-spacing: -0.03em;
		fill: var(--fg);
	}

	.verdict circle {
		fill: var(--pass);
	}

	.verdict text {
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		fill: var(--pass);
	}

	.verdict {
		animation: chip-in 0.6s var(--ease-out) 1.8s both;
	}
</style>
