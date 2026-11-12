<script lang="ts">
	import { inview } from '$lib/inview';

	/**
	 * The definition, drawn: four inputs from Apple Health and your own logs
	 * run into eassy, and three decisions come out the other side. Packets
	 * travel the inputs first and the outputs second, and each output lights as
	 * its packet arrives, on one 4.8s cycle.
	 *
	 * Two layouts of the same diagram: wide for desktop, tall for phones, with
	 * CSS showing one. Figures are illustrative.
	 */
	const inputs = [
		{ label: 'SLEEP', value: '7 h 42 m' },
		{ label: 'HRV', value: '64 ms' },
		{ label: 'RESTING HR', value: '52 bpm' },
		{ label: 'TRAINING LOAD', value: '7 days' }
	];

	const outputs = [
		{ label: 'READINESS', value: '82 · Ready to train' },
		{ label: 'TODAY', value: 'Lower · Strength' },
		{ label: 'NEXT WEIGHT', value: 'Squat 67.5 kg × 6' }
	];

	type Box = { x: number; y: number; w: number; h: number };
	type Layout = {
		view: string;
		inputs: Box[];
		outputs: Box[];
		hub: Box;
		inWire: (b: Box) => string;
		outWire: (b: Box) => string;
	};

	const wide: Layout = (() => {
		const hub = { x: 410, y: 105, w: 140, h: 140 };
		return {
			view: '0 0 960 350',
			inputs: inputs.map((_, i) => ({ x: 24, y: 30 + i * 76, w: 210, h: 56 })),
			outputs: outputs.map((_, i) => ({ x: 712, y: 72 + i * 76, w: 224, h: 56 })),
			hub,
			inWire: (b) =>
				`M${b.x + b.w} ${b.y + b.h / 2} C ${b.x + b.w + 100} ${b.y + b.h / 2}, ${hub.x - 90} ${hub.y + hub.h / 2}, ${hub.x} ${hub.y + hub.h / 2}`,
			outWire: (b) =>
				`M${hub.x + hub.w} ${hub.y + hub.h / 2} C ${hub.x + hub.w + 90} ${hub.y + hub.h / 2}, ${b.x - 90} ${b.y + b.h / 2}, ${b.x} ${b.y + b.h / 2}`
		};
	})();

	const tall: Layout = (() => {
		const hub = { x: 115, y: 250, w: 130, h: 130 };
		return {
			view: '0 0 360 700',
			inputs: inputs.map((_, i) => ({ x: 16 + (i % 2) * 168, y: 16 + Math.floor(i / 2) * 76, w: 160, h: 60 })),
			outputs: outputs.map((_, i) => ({ x: 40, y: 480 + i * 72, w: 280, h: 58 })),
			hub,
			inWire: (b) =>
				`M${b.x + b.w / 2} ${b.y + b.h} C ${b.x + b.w / 2} ${b.y + b.h + 60}, ${hub.x + hub.w / 2} ${hub.y - 60}, ${hub.x + hub.w / 2} ${hub.y}`,
			outWire: (b) =>
				`M${hub.x + hub.w / 2} ${hub.y + hub.h} C ${hub.x + hub.w / 2} ${hub.y + hub.h + 40}, ${b.x - 20} ${b.y + b.h / 2}, ${b.x} ${b.y + b.h / 2}`
		};
	})();
</script>

{#snippet diagram(l: Layout, kind: string)}
	<svg class="art {kind}" viewBox={l.view} use:inview aria-hidden="true">
		{#each l.inputs as b, i (i)}
			<path class="wire" d={l.inWire(b)} />
			<path class="pulse in" d={l.inWire(b)} pathLength="100" style:--i={i} />
		{/each}
		{#each l.outputs as b, i (i)}
			<path class="wire" d={l.outWire(b)} />
			<path class="pulse out" d={l.outWire(b)} pathLength="100" style:--i={i} />
		{/each}

		{#each l.inputs as b, i (i)}
			<g class="box">
				<rect class="card" x={b.x} y={b.y} width={b.w} height={b.h} rx="10" />
				<text class="t-mono" x={b.x + 16} y={b.y + 23}>{inputs[i].label}</text>
				<text class="t-body" x={b.x + 16} y={b.y + 44}>{inputs[i].value}</text>
			</g>
		{/each}

		{#each l.outputs as b, i (i)}
			<g class="box output" style:--i={i}>
				<rect class="card" x={b.x} y={b.y} width={b.w} height={b.h} rx="10" />
				<text class="t-mono label" x={b.x + 16} y={b.y + 23}>{outputs[i].label}</text>
				<text class="t-body" x={b.x + 16} y={b.y + 44}>{outputs[i].value}</text>
			</g>
		{/each}

		<g class="hub">
			<rect class="hub-glow" x={l.hub.x - 10} y={l.hub.y - 10} width={l.hub.w + 20} height={l.hub.h + 20} rx="40" />
			<rect class="hub-body" x={l.hub.x} y={l.hub.y} width={l.hub.w} height={l.hub.h} rx="32" />
			<line
				class="hub-mark"
				x1={l.hub.x + l.hub.w / 2}
				x2={l.hub.x + l.hub.w / 2}
				y1={l.hub.y + l.hub.h * 0.27}
				y2={l.hub.y + l.hub.h * 0.73}
				transform="rotate(22 {l.hub.x + l.hub.w / 2} {l.hub.y + l.hub.h / 2})"
			/>
		</g>
	</svg>
{/snippet}

<div class="conveyor">
	{@render diagram(wide, 'wide')}
	{@render diagram(tall, 'tall')}
</div>

<style>
	.conveyor svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.conveyor .tall {
		display: none;
		max-width: 26rem;
		margin-inline: auto;
	}

	@media (max-width: 40rem) {
		.conveyor .wide {
			display: none;
		}

		.conveyor .tall {
			display: block;
		}
	}

	.art {
		--cycle: 4.8s;
	}

	.wire {
		fill: none;
		stroke: var(--border-strong);
		stroke-width: 1.5;
		stroke-dasharray: 3 5;
	}

	.pulse {
		fill: none;
		stroke: var(--lime-ink);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-dasharray: 12 88;
		opacity: 0;
		animation: travel var(--cycle) linear infinite;
	}

	.pulse.in {
		animation-delay: calc(var(--i) * 0.08s);
	}

	.pulse.out {
		animation-delay: calc(var(--cycle) * 0.5 + var(--i) * 0.12s);
	}

	@keyframes travel {
		0% {
			stroke-dashoffset: 100;
			opacity: 0;
		}
		4%,
		36% {
			opacity: 1;
		}
		40%,
		100% {
			stroke-dashoffset: 12;
			opacity: 0;
		}
	}

	.hub-body {
		fill: var(--brand-ink);
	}

	.hub-mark {
		stroke: var(--brand-lime);
		stroke-width: 13;
		stroke-linecap: round;
	}

	.hub-glow {
		fill: var(--lime-soft);
		transform-box: fill-box;
		transform-origin: center;
		animation: hub var(--cycle) ease-in-out infinite;
	}

	@keyframes hub {
		0%,
		30%,
		70%,
		100% {
			transform: scale(0.94);
			opacity: 0.4;
		}
		44%,
		52% {
			transform: scale(1.06);
			opacity: 1;
		}
	}

	/* Each output lights as its packet lands. */
	.output .card {
		animation: land var(--cycle) ease-out infinite;
		animation-delay: calc(var(--i) * 0.12s);
	}

	@keyframes land {
		0%,
		86% {
			stroke: var(--border-strong);
			fill: var(--card);
		}
		90% {
			stroke: var(--lime-ink);
			fill: var(--lime-soft);
		}
		100% {
			stroke: var(--border-strong);
			fill: var(--card);
		}
	}

	.output .label {
		fill: var(--lime-ink);
	}
</style>
