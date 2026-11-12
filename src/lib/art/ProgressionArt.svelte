<script lang="ts">
	import { inview } from '$lib/inview';

	/**
	 * Smart Progression: seven sessions of a lift as bars, the working weight
	 * stepping up as a line across their tops, and the suggested next step as a
	 * ghost bar. Illustrative numbers.
	 */
	const weights = [60, 60, 62.5, 62.5, 62.5, 65, 65];
	const next = 67.5;

	const y = (w: number) => 360 - (w - 50) * 13;
	const x = (i: number) => 76 + i * 56;
	const barWidth = 32;

	const steps = weights
		.map((w, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(w)} H${x(i) + barWidth}`)
		.join(' ');
	const line = `${steps} L${x(weights.length)} ${y(next)} H${x(weights.length) + barWidth}`;
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	<text class="title" x="28" y="52">Squat</text>
	<text class="t-mono" x="28" y="76">WORKING WEIGHT · KG</text>

	{#each [55, 60, 65, 70] as w (w)}
		<line class="grid" x1="64" x2="532" y1={y(w)} y2={y(w)} />
		<text class="t-mono" x="28" y={y(w) + 4}>{w}</text>
	{/each}
	<line class="base" x1="64" x2="532" y1="360" y2="360" />

	{#each weights as w, i (i)}
		<rect class="bar" x={x(i)} y={y(w)} width={barWidth} height={360 - y(w)} rx="4" style:--i={i} />
		<text class="t-mono" x={x(i) + barWidth / 2} y="384" text-anchor="middle">S{i + 1}</text>
	{/each}

	<g class="ghost">
		<rect
			x={x(weights.length)}
			y={y(next)}
			width={barWidth}
			height={360 - y(next)}
			rx="4"
		/>
		<text class="t-mono next" x={x(weights.length) + barWidth / 2} y="384" text-anchor="middle"
			>NEXT</text
		>
	</g>

	<path class="line" d={line} pathLength="100" />

	<g class="suggest">
		<rect class="card" x="300" y="34" width="232" height="58" rx="12" />
		<text class="t-muted" x="318" y="58">Suggested next</text>
		<text class="t-body" x="318" y="80">67.5 kg × 6</text>
		<rect class="plus" x="446" y="50" width="70" height="26" rx="13" />
		<text class="plus-text" x="481" y="67" text-anchor="middle">+2.5 kg</text>
	</g>

	<text class="t-mono" x="28" y="436">FROM YOUR ACTUAL PERFORMANCE · YOU STAY IN CONTROL</text>
</svg>

<style>
	.title {
		font-family: var(--font-sans);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.01em;
		fill: var(--fg);
	}

	.grid {
		stroke: var(--border);
		stroke-dasharray: 2 5;
	}

	.base {
		stroke: var(--border-strong);
	}

	.bar {
		fill: var(--p3);
		stroke: var(--border-strong);
		transform-box: fill-box;
		transform-origin: bottom;
		animation: grow 0.8s var(--ease-out) both;
		animation-delay: calc(var(--i) * 0.08s);
	}

	@keyframes grow {
		from {
			transform: scaleY(0);
		}
	}

	.ghost rect {
		fill: var(--lime-soft);
		stroke: var(--lime-ink);
		stroke-width: 1.5;
		stroke-dasharray: 4 4;
	}

	.ghost .next {
		fill: var(--lime-ink);
	}

	.ghost,
	.suggest {
		animation: pop 0.6s var(--ease-out) 1.7s both;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	.line {
		fill: none;
		stroke: var(--lime-ink);
		stroke-width: 2.5;
		stroke-linejoin: round;
		stroke-dasharray: 100 100;
		animation: draw 1.4s var(--ease-out) 0.6s both;
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 100;
		}
	}

	.plus {
		fill: var(--lime);
	}

	.plus-text {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 600;
		fill: var(--brand-ink);
	}
</style>
