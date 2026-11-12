<script lang="ts">
	import { inview } from '$lib/inview';

	/**
	 * On-device storage: the data types eassy works with sit inside a boundary
	 * around the phone, and a packet heading out for a cloud account stops at
	 * that boundary.
	 */
	const cx = 280;
	const cy = 232;
	const r = 186;

	const chips = [
		{ text: 'WORKOUTS', x: 118, y: 150 },
		{ text: 'HEART RATE', x: 118, y: 288 },
		{ text: 'HRV', x: 350, y: 288 },
		{ text: 'SLEEP', x: 350, y: 220 }
	];
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	<circle class="zone" {cx} {cy} {r} />
	<circle class="boundary" {cx} {cy} {r} />

	{#each chips as chip, i (chip.text)}
		<g class="chip" style:--i={i}>
			<rect class="card" x={chip.x} y={chip.y} width="92" height="28" rx="14" />
			<text class="t-mono" x={chip.x + 46} y={chip.y + 18} text-anchor="middle">{chip.text}</text>
		</g>
	{/each}

	<rect class="phone" x="220" y="112" width="120" height="236" rx="24" />
	<rect class="notch" x="262" y="124" width="36" height="9" rx="4.5" />
	<g class="lock">
		<path class="shackle" d="M268 226 v-9 a12 12 0 0 1 24 0 v9" />
		<rect x="260" y="224" width="40" height="32" rx="7" />
		<circle class="keyhole" cx="280" cy="238" r="3.5" />
	</g>
	<text class="t-mono" x={cx} y="292" text-anchor="middle">ON DEVICE</text>

	<!-- The packet that never leaves. -->
	<line class="route" x1="338" y1="150" x2="426" y2="118" />
	<circle class="packet" cx="338" cy="150" r="4.5" />
	<g class="stop" transform="translate(427 117)">
		<path d="M-6 -6 L6 6 M6 -6 L-6 6" />
	</g>

	<g class="cloud">
		<path
			d="M470 84 h44 a14 14 0 0 0 0 -28 a20 20 0 0 0 -38 -6 a14 14 0 0 0 -6 34 z"
			transform="translate(0 4)"
		/>
		<line x1="466" y1="44" x2="524" y2="96" />
	</g>
	<text class="t-mono" x="532" y="124" text-anchor="end">NO ACCOUNT</text>

	<text class="t-mono" x="28" y="446">NO SIGN-UP · NO CLOUD STORAGE REQUIRED</text>
</svg>

<style>
	.zone {
		fill: var(--lime-soft);
		opacity: 0.5;
	}

	.boundary {
		fill: none;
		stroke: var(--lime-ink);
		stroke-width: 1.5;
		stroke-dasharray: 6 8;
		transform-box: fill-box;
		transform-origin: center;
		animation: spin 40s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.chip {
		animation: float 5s ease-in-out infinite;
		animation-delay: calc(var(--i) * -1.25s);
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	.phone {
		fill: var(--card);
		stroke: var(--fg);
		stroke-width: 2;
	}

	.notch {
		fill: var(--fg);
	}

	.lock rect {
		fill: var(--lime);
		stroke: var(--brand-ink);
		stroke-width: 1.5;
	}

	.shackle {
		fill: none;
		stroke: var(--fg);
		stroke-width: 3.5;
		stroke-linecap: round;
	}

	.keyhole {
		fill: var(--brand-ink);
	}

	.route {
		stroke: var(--border-strong);
		stroke-width: 1.5;
		stroke-dasharray: 3 5;
	}

	/* Out along the route, stopped dead at the boundary, then fade. */
	.packet {
		fill: var(--lime-ink);
		opacity: 0;
		animation: leave 3.6s cubic-bezier(0.5, 0, 0.75, 0) 0.6s infinite;
	}

	@keyframes leave {
		0% {
			transform: translate(0, 0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		45% {
			transform: translate(84px, -30px);
			opacity: 1;
		}
		60%,
		100% {
			transform: translate(84px, -30px);
			opacity: 0;
		}
	}

	.stop path {
		fill: none;
		stroke: var(--fail);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.stop {
		opacity: 0.35;
		animation: flash 3.6s ease-out 0.6s infinite;
	}

	@keyframes flash {
		0%,
		42% {
			opacity: 0.35;
		}
		48% {
			opacity: 1;
		}
		80%,
		100% {
			opacity: 0.35;
		}
	}

	.cloud path {
		fill: var(--p2);
		stroke: var(--fg-3);
		stroke-width: 1.5;
	}

	.cloud line {
		stroke: var(--fg-3);
		stroke-width: 2;
		stroke-linecap: round;
	}
</style>
