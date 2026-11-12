<script lang="ts">
	import { inview } from '$lib/inview';

	/**
	 * Smart Templates: a selection scans the day's options against recovery,
	 * goal and recent sessions, then settles on one. The resting frame is the
	 * settled choice.
	 */
	const context = [
		{ text: 'READINESS 82', w: 112 },
		{ text: 'LAST · UPPER, 2D', w: 142 },
		{ text: 'GOAL · STRENGTH', w: 134 }
	];

	const templates = [
		{ name: 'Upper · Push', meta: '6 exercises · ~55 min', load: [22, 18, 26] },
		{ name: 'Lower · Strength', meta: '5 exercises · ~48 min', load: [26, 22, 24] },
		{ name: 'Full body · Light', meta: '4 exercises · ~35 min', load: [10, 8, 12] }
	];
</script>

<svg class="art" viewBox="0 0 560 460" use:inview aria-hidden="true">
	{#each context as chip, i (chip.text)}
		{@const x = 28 + context.slice(0, i).reduce((sum, c) => sum + c.w + 10, 0)}
		<g class="ctx" style:--i={i}>
			<rect class="pill" {x} y="30" width={chip.w} height="28" rx="14" />
			<text class="t-mono" x={x + chip.w / 2} y="48" text-anchor="middle">{chip.text}</text>
		</g>
	{/each}

	<rect class="focus" x="22" y="198" width="516" height="104" rx="16" />

	{#each templates as t, i (t.name)}
		{@const y = 92 + i * 110}
		<g class="tpl" style:--i={i}>
			<rect class="card" x="28" {y} width="504" height="92" rx="12" />
			<text class="name" x="52" y={y + 40}>{t.name}</text>
			<text class="t-muted" x="52" y={y + 64}>{t.meta}</text>
			{#each t.load as h, j (j)}
				<rect class="bar" x={476 + j * 12} y={y + 72 - h} width="6" height={h} rx="2" />
			{/each}
		</g>
	{/each}

	<g class="tag">
		<rect x="306" y="216" width="122" height="24" rx="12" />
		<text x="367" y="232" text-anchor="middle">RECOMMENDED</text>
	</g>

	<text class="t-mono" x="28" y="436">SHAPED BY RECOVERY, GOALS AND RECENT SESSIONS</text>
</svg>

<style>
	.pill {
		fill: var(--p2);
		stroke: var(--border);
	}

	.ctx {
		animation: rise 0.6s var(--ease-out) both;
		animation-delay: calc(var(--i) * 0.08s);
	}

	.tpl {
		animation: rise 0.7s var(--ease-out) both;
		animation-delay: calc(0.25s + var(--i) * 0.1s);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	.name {
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 500;
		fill: var(--fg);
	}

	.bar {
		fill: var(--border-strong);
	}

	/* The selection rests on the middle card; the keyframes are offsets from it. */
	.focus {
		fill: var(--lime-soft);
		stroke: var(--lime-ink);
		stroke-width: 2;
		animation: scan 7s var(--ease-out) 0.8s infinite;
	}

	@keyframes scan {
		0% {
			transform: translateY(-110px);
			opacity: 0;
		}
		6%,
		18% {
			transform: translateY(-110px);
			opacity: 1;
		}
		28%,
		36% {
			transform: translateY(0);
		}
		46%,
		54% {
			transform: translateY(110px);
		}
		64%,
		94% {
			transform: translateY(0);
			opacity: 1;
		}
		100% {
			transform: translateY(0);
			opacity: 0;
		}
	}

	.tag rect {
		fill: var(--lime);
	}

	.tag text {
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 600;
		letter-spacing: 0.08em;
		fill: var(--brand-ink);
	}

	.tag {
		transform-box: fill-box;
		transform-origin: center;
		animation: tag 7s var(--ease-out) 0.8s infinite;
	}

	@keyframes tag {
		0%,
		62% {
			opacity: 0;
			transform: scale(0.85);
		}
		70%,
		92% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
		}
	}
</style>
