<script lang="ts">
	import { inview } from '$lib/inview';

	/**
	 * Workout Tracking: one loop of a set on Apple Watch and iPhone together.
	 *
	 *   0–34%   the watch shows set three with live heart rate; the phone row spins
	 *   ~30%    the set is tapped done on the watch
	 *   38–92%  the watch switches to the rest timer — ring and clock counting
	 *           down — while the phone ticks the row and runs the same timer
	 *   96%     back to the set screen
	 *
	 * Every part runs on the same 10s cycle, so they stay in step. The resting
	 * frame (reduced motion) is the set screen with set three already logged.
	 */
	const sets = [
		{ n: 1, kg: '60', reps: '8', state: 'done' },
		{ n: 2, kg: '60', reps: '8', state: 'done' },
		{ n: 3, kg: '62.5', reps: '6', state: 'live' },
		{ n: 4, kg: '62.5', reps: '–', state: 'next' }
	] as const;

	/** The rest clock, one entry per slot of the countdown. */
	const clock = ['1:30', '1:15', '1:00', '0:45', '0:30', '0:15'];

	const ecg = 'M418 254 h22 l5 -4 l5 4 h6 l4 -18 l5 30 l5 -18 l4 6 h10 l5 -4 l5 4 h16';
	const liveY = 128 + 2 * 56;
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	<text class="title" x="28" y="52">Bench press</text>
	<text class="t-mono" x="28" y="76">SET 3 OF 4</text>

	<text class="t-mono" x="48" y="116">SET</text>
	<text class="t-mono" x="112" y="116">KG</text>
	<text class="t-mono" x="212" y="116">REPS</text>

	{#each sets as set, i (set.n)}
		{@const y = 128 + i * 56}
		<g class="row" class:next={set.state === 'next'} style:--i={i}>
			<rect class="card" class:live={set.state === 'live'} x="28" {y} width="332" height="46" rx="10" />
			<text class="t-body" x="52" y={y + 29}>{set.n}</text>
			<text class="t-body" x="112" y={y + 29}>{set.kg}</text>
			<text class="t-body" x="212" y={y + 29}>{set.reps}</text>

			{#if set.state === 'done'}
				<g class="check" transform="translate(334 {y + 23})">
					<circle r="10" />
					<path d="M-4.5 0.5 l3 3 l6 -7" />
				</g>
			{/if}
		</g>
	{/each}

	<!-- Set three: spinner while it is in progress, check once it is tapped done. -->
	<circle class="spinner" cx="334" cy={liveY + 23} r="8" />
	<g class="check logged" transform="translate(334 {liveY + 23})">
		<circle r="10" />
		<path d="M-4.5 0.5 l3 3 l6 -7" />
	</g>

	<g class="rest">
		<text class="t-mono" x="28" y="388">REST</text>
		{#each clock as time, k (time)}
			<text class="t-body tick" class:first={k === 0} x="76" y="389" style:--k={k}>{time}</text>
		{/each}
		<rect class="rest-track" x="120" y="381" width="240" height="6" rx="3" />
		<rect class="rest-fill" x="120" y="381" width="240" height="6" rx="3" />
	</g>

	<!-- Apple Watch -->
	<rect class="band" x="424" y="70" width="80" height="60" rx="12" />
	<rect class="band" x="424" y="280" width="80" height="60" rx="12" />
	<rect class="case" x="398" y="118" width="132" height="174" rx="40" />
	<rect class="crown" x="530" y="168" width="7" height="26" rx="3" />
	<rect class="screen" x="408" y="128" width="112" height="154" rx="31" />

	<!-- Screen A: the set in progress. -->
	<g class="screen-set">
		<text class="w-label" x="424" y="158">BENCH · SET 3</text>
		<text class="w-big" x="424" y="198">62.5</text>
		<text class="w-small" x="424" y="218">kg × 6</text>

		<circle class="tap-ring" cx="500" cy="212" r="11" />
		<g class="done" transform="translate(500 212)">
			<circle r="11" />
			<path d="M-4.5 0.5 l3 3 l6 -7" />
		</g>

		<path class="ecg-trail" d={ecg} />
		<path class="ecg" d={ecg} pathLength="100" />
		<text class="w-hr" x="508" y="274" text-anchor="end">128 ♥</text>
	</g>

	<!-- Screen B: the rest timer. -->
	<g class="screen-rest">
		<text class="w-label" x="464" y="154" text-anchor="middle">REST</text>
		<circle class="w-track" cx="464" cy="202" r="34" />
		<circle class="w-ring" cx="464" cy="202" r="34" pathLength="100" transform="rotate(-90 464 202)" />
		{#each clock as time, k (time)}
			<text class="w-time tick" class:first={k === 0} x="464" y="209" text-anchor="middle" style:--k={k}
				>{time}</text
			>
		{/each}
		<text class="w-next" x="464" y="258" text-anchor="middle">NEXT · 62.5 × 6</text>
		<text class="w-hr" x="464" y="273" text-anchor="middle">112 ♥</text>
	</g>

	<circle class="sync" cx="436" cy="384" r="4" />
	<text class="t-mono" x="448" y="388">IN SYNC</text>
</svg>

<style>
	/* The shared cycle. Every animation below that is part of the loop uses this
	   duration so the watch and the phone stay in step. */
	.art {
		--cycle: 10s;
	}

	.title {
		font-family: var(--font-sans);
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.01em;
		fill: var(--fg);
	}

	.row {
		animation: rise 0.6s var(--ease-out) both;
		animation-delay: calc(var(--i) * 0.12s);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	.row.next text {
		fill: var(--fg-3);
	}

	.row.next .card {
		fill: none;
		stroke-dasharray: 4 4;
	}

	.card.live {
		stroke: var(--lime-ink);
		stroke-width: 1.5;
	}

	.check circle {
		fill: var(--pass);
	}

	.check path,
	.done path {
		fill: none;
		stroke: #fff;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* Phone, set three. */

	.spinner {
		fill: none;
		stroke: var(--fg-3);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-dasharray: 36 14;
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
		animation:
			spin 0.9s linear infinite,
			pending var(--cycle) linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes pending {
		0%,
		31% {
			opacity: 1;
		}
		33%,
		100% {
			opacity: 0;
		}
	}

	.check.logged {
		animation: logged var(--cycle) var(--ease-out) infinite;
	}

	@keyframes logged {
		0%,
		32% {
			opacity: 0;
			transform: translate(334px, 263px) scale(0.5);
		}
		36%,
		97% {
			opacity: 1;
			transform: translate(334px, 263px) scale(1);
		}
		100% {
			opacity: 0;
			transform: translate(334px, 263px) scale(1);
		}
	}

	/* Rest timer, phone and watch. Each clock reading holds one ninth of the
	   rest window; the first reading also shows before the rest begins. */

	.tick {
		opacity: 0;
		animation: tick var(--cycle) steps(1, end) infinite;
		animation-delay: calc((var(--k) - 1) * var(--cycle) * 0.09);
	}

	@keyframes tick {
		0%,
		46.9% {
			opacity: 0;
		}
		47%,
		55.9% {
			opacity: 1;
		}
		56%,
		100% {
			opacity: 0;
		}
	}

	.tick.first {
		opacity: 1;
		animation: tick-first var(--cycle) steps(1, end) infinite;
	}

	@keyframes tick-first {
		0%,
		46.9% {
			opacity: 1;
		}
		47%,
		95.9% {
			opacity: 0;
		}
		96%,
		100% {
			opacity: 1;
		}
	}

	.rest-track {
		fill: var(--p3);
	}

	.rest-fill {
		fill: var(--lime);
		transform-box: fill-box;
		transform-origin: left center;
		animation: drain var(--cycle) linear infinite;
	}

	@keyframes drain {
		0%,
		38% {
			transform: scaleX(1);
		}
		92% {
			transform: scaleX(0);
		}
		96%,
		100% {
			transform: scaleX(1);
		}
	}

	/* Watch hardware. */

	.band {
		fill: var(--p3);
	}

	.case {
		fill: var(--fg);
	}

	.crown {
		fill: var(--fg-3);
	}

	/* The watch face stays black in both themes, as the hardware does. */
	.screen {
		fill: #000;
	}

	/* Watch screens: set, then rest, then set again. */

	.screen-set {
		animation: show-set var(--cycle) ease-in-out infinite;
	}

	@keyframes show-set {
		0%,
		34% {
			opacity: 1;
		}
		38%,
		94% {
			opacity: 0;
		}
		98%,
		100% {
			opacity: 1;
		}
	}

	.screen-rest {
		opacity: 0;
		animation: show-rest var(--cycle) ease-in-out infinite;
	}

	@keyframes show-rest {
		0%,
		35% {
			opacity: 0;
		}
		39%,
		92% {
			opacity: 1;
		}
		96%,
		100% {
			opacity: 0;
		}
	}

	.w-label {
		font-family: var(--font-mono);
		font-size: 9.5px;
		font-weight: 600;
		letter-spacing: 0.06em;
		fill: var(--brand-lime);
	}

	.w-big {
		font-family: var(--font-sans);
		font-size: 34px;
		font-weight: 500;
		letter-spacing: -0.02em;
		fill: #fff;
	}

	.w-small {
		font-family: var(--font-sans);
		font-size: 13px;
		fill: #a0a0a8;
	}

	.w-hr {
		font-family: var(--font-sans);
		font-size: 11px;
		font-weight: 600;
		fill: #ec6a6f;
	}

	.w-next {
		font-family: var(--font-mono);
		font-size: 8.5px;
		font-weight: 500;
		letter-spacing: 0.04em;
		fill: #a0a0a8;
	}

	/* The done button, pressed just before the switch to rest. */
	.done circle {
		fill: var(--brand-lime);
	}

	.done path {
		stroke: var(--brand-ink);
	}

	.done {
		animation: press var(--cycle) ease-in-out infinite;
	}

	@keyframes press {
		0%,
		27% {
			transform: translate(500px, 212px) scale(1);
		}
		29% {
			transform: translate(500px, 212px) scale(0.78);
		}
		32%,
		100% {
			transform: translate(500px, 212px) scale(1);
		}
	}

	.tap-ring {
		fill: none;
		stroke: var(--brand-lime);
		stroke-width: 2;
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
		animation: ripple var(--cycle) ease-out infinite;
	}

	@keyframes ripple {
		0%,
		28.9% {
			opacity: 0;
			transform: scale(1);
		}
		29% {
			opacity: 0.9;
			transform: scale(1);
		}
		36%,
		100% {
			opacity: 0;
			transform: scale(2.2);
		}
	}

	.w-track {
		fill: none;
		stroke: #26262c;
		stroke-width: 7;
	}

	.w-ring {
		fill: none;
		stroke: var(--brand-lime);
		stroke-width: 7;
		stroke-linecap: round;
		stroke-dasharray: 100 100;
		animation: countdown var(--cycle) linear infinite;
	}

	@keyframes countdown {
		0%,
		38% {
			stroke-dashoffset: 0;
		}
		92%,
		100% {
			stroke-dashoffset: 100;
		}
	}

	.w-time {
		font-family: var(--font-sans);
		font-size: 20px;
		font-weight: 500;
		letter-spacing: -0.01em;
		fill: #fff;
	}

	.ecg-trail {
		fill: none;
		stroke: #ec6a6f;
		stroke-width: 1.5;
		opacity: 0.25;
	}

	.ecg {
		fill: none;
		stroke: #ec6a6f;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 30 70;
		animation: beat 1.6s linear infinite;
	}

	@keyframes beat {
		from {
			stroke-dashoffset: 100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	.sync {
		fill: var(--lime);
		stroke: var(--lime-ink);
		animation: blink 1.6s ease-in-out infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0.25;
		}
	}
</style>
