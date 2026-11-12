<script lang="ts">
	import type { Component } from 'svelte';

	/**
	 * The numbered "How it works" walk-through: text and illustration side by
	 * side, alternating, with a rail down the left edge that fills as the reader
	 * scrolls and lights each step's node as the fill reaches it — after the
	 * journey line on qlane.ai.
	 *
	 * The rail is decoration only and is hidden on narrow screens. Progress is
	 * written to a custom property from a passive, rAF-throttled scroll handler;
	 * with reduced motion the rail renders fully filled and never updates.
	 */
	type Step = { title: string; body: string; art: Component };
	let { steps }: { steps: Step[] } = $props();

	let list: HTMLOListElement;
	let progress = $state(1);
	// Every step lit until the first measurement, so the server render (and a
	// reader with reduced motion) sees the finished state.
	let reached = $state(Infinity);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const box = list.getBoundingClientRect();
			// The fill's leading edge tracks a point 55% of the way down the viewport.
			const edge = window.innerHeight * 0.55 - box.top;
			progress = Math.min(1, Math.max(0, edge / box.height));

			const items = [...list.querySelectorAll<HTMLElement>(':scope > .step')];
			reached = items.filter((item) => item.offsetTop + item.offsetHeight / 2 <= edge).length;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});
</script>

<div class="wrap" style:--progress={progress}>
	<span class="rail" aria-hidden="true">
		<span class="rail-fill"></span>
	</span>

	<ol class="steps" bind:this={list}>
		{#each steps as step, i (step.title)}
			<li class="step" class:reversed={i % 2 === 1} class:lit={i < reached}>
				<span class="node" aria-hidden="true"></span>
				<div class="copy">
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</div>
				<div class="panel">
					<step.art />
				</div>
			</li>
		{/each}
	</ol>
</div>

<style>
	.wrap {
		position: relative;
	}

	.steps {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: clamp(3.5rem, 8vw, 7.5rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: clamp(1.75rem, 5vw, 5rem);
	}

	.step.reversed {
		flex-direction: row-reverse;
	}

	.copy {
		display: flex;
		flex: 1 1 20rem;
		flex-direction: column;
		gap: 0.875rem;
		min-width: 0;
	}

	.panel {
		flex: 1.5 1 24rem;
		min-width: 0;
		max-width: 40rem;
	}

	.num {
		display: grid;
		place-items: center;
		align-self: flex-start;
		box-sizing: border-box;
		height: 1.625rem;
		padding-inline: 0.4375rem;
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-200);
		background: var(--p2);
		font-family: var(--font-mono);
		font-size: var(--type-tag);
		font-weight: var(--weight-medium);
		line-height: 1;
		transition:
			background-color var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out);
	}

	.lit .num {
		border-color: var(--lime-ink);
		background: var(--lime);
		color: var(--brand-ink);
	}

	h3 {
		margin: 0;
		font-size: var(--type-step);
		line-height: 1.25;
		letter-spacing: -0.015em;
		font-weight: var(--weight-medium);
		text-wrap: balance;
	}

	p {
		margin: 0;
		max-width: 54ch;
		font-size: var(--font-size-200);
		line-height: 1.65;
		color: var(--fg-muted);
	}

	.rail,
	.node {
		display: none;
	}

	/* On wide screens the list makes room on its left for the rail. */
	@media (min-width: 62.5rem) {
		.wrap {
			padding-inline-start: 4rem;
		}

		.rail {
			position: absolute;
			display: block;
			top: 0.8125rem;
			bottom: 0;
			left: 0.9375rem;
			width: 2px;
			background: var(--border);
			border-radius: 1px;
		}

		.rail-fill {
			position: absolute;
			inset: 0;
			background: var(--lime-ink);
			border-radius: inherit;
			transform-origin: top;
			transform: scaleY(var(--progress));
		}

		/* The node sits on the rail level with the middle of its row, which is
		   where the copy and the illustration are centred. */
		.node {
			position: absolute;
			display: block;
			left: -3.5rem;
			top: calc(50% - 0.5rem);
			width: 1rem;
			height: 1rem;
			box-sizing: border-box;
			border: 2px solid var(--border-strong);
			border-radius: 50%;
			background: var(--bg);
			transition:
				border-color var(--duration-base) var(--ease-out),
				background-color var(--duration-base) var(--ease-out),
				box-shadow var(--duration-base) var(--ease-out);
		}

		.lit .node {
			border-color: var(--lime-ink);
			background: var(--lime);
			box-shadow: 0 0 0 6px var(--lime-soft);
		}
	}
</style>
