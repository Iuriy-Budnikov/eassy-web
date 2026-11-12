<script lang="ts">
	import PhoneVideo from '$lib/PhoneVideo.svelte';
	import { reveal } from '$lib/reveal';

	/**
	 * The product demo, in the slot qlane.ai gives its demo window: the two
	 * screen recordings behind a Trends / Training Balance switcher, with
	 * callouts either side naming what the screen shows.
	 *
	 * There is no box around the phone. The clips are composited with `screen`,
	 * which needs pure black underneath to keep the phone's own colours, so a
	 * black rounded rectangle sits inside the phone's silhouette — the bezel
	 * covers its edge — and the clip's black surround falls straight through to
	 * the page in either theme.
	 *
	 * The tabs advance on their own until the reader picks one.
	 */
	const tabs = [
		{
			id: 'trends',
			name: 'Trends',
			src: '/media/trends.mp4',
			poster: '/media/trends-poster.jpg',
			label: 'The Trends screen in eassy, showing weekly training load, volume and summary totals.',
			callouts: [
				{ tag: 'Load', text: 'This week against last, day by day.' },
				{ tag: 'Volume', text: 'Every set adds up, in kilograms.' },
				{ tag: 'Duration · Energy', text: 'Time trained and calories, in context.' },
				{ tag: 'Week · Month · Year', text: 'Zoom out without losing the thread.' }
			]
		},
		{
			id: 'balance',
			name: 'Training Balance',
			src: '/media/training-balance.mp4',
			poster: '/media/training-balance-poster.jpg',
			label: 'The Training Balance screen in eassy, showing a seven-day training load chart.',
			callouts: [
				{ tag: 'Recent load', text: 'What you’ve done over the last days.' },
				{ tag: 'Adapted load', text: 'What your body is used to.' },
				{ tag: 'Optimal', text: 'The range for steady progress.' },
				{ tag: 'Too much · Too little', text: 'Spot it before it costs you.' }
			]
		}
	];

	let active = $state(0);
	let pinned = $state(false);

	$effect(() => {
		if (pinned || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = setInterval(() => {
			active = (active + 1) % tabs.length;
		}, 14000);
		return () => clearInterval(timer);
	});

	function pick(i: number) {
		active = i;
		pinned = true;
	}

	const tab = $derived(tabs[active]);
</script>

<section class="section demo" id="demo">
	<div class="section-inner">
		<div class="section-head centered" use:reveal>
			<span class="label">01 In the app</span>
			<h2 class="h-section">Your training, in context.</h2>
			<p class="intro">
				Load, volume, duration, energy and performance week over week, and how your recent load
				compares with what your body is adapted to.
			</p>
		</div>

		<div class="tabs" role="group" aria-label="Screen">
			{#each tabs as t, i (t.id)}
				<button type="button" aria-pressed={active === i} onclick={() => pick(i)}>
					<span class="tag">{String(i + 1).padStart(2, '0')}</span>
					{t.name}
				</button>
			{/each}
		</div>

		{#key active}
			<div class="showcase">
				<ul class="callouts left">
					{#each tab.callouts.slice(0, 2) as c, i (c.tag)}
						<li style:--i={i}><span class="tag">{c.tag}</span>{c.text}</li>
					{/each}
				</ul>

				<div class="phone">
					<PhoneVideo
						src={tab.src}
						poster={tab.poster}
						label={tab.label}
						maxWidth="min(19rem, 46svh)"
					/>
				</div>

				<ul class="callouts right">
					{#each tab.callouts.slice(2) as c, i (c.tag)}
						<li style:--i={i + 2}><span class="tag">{c.tag}</span>{c.text}</li>
					{/each}
				</ul>
			</div>
		{/key}
	</div>
</section>

<style>
	.centered {
		align-items: center;
		margin-inline: auto;
		text-align: center;
	}

	.tabs {
		display: flex;
		justify-content: center;
		gap: var(--space-4);
		width: fit-content;
		margin: 0 auto clamp(2rem, 4vw, 3rem);
		padding: var(--space-4);
		border: 1px solid var(--border);
		border-radius: var(--radius-500);
		background: var(--p2);
	}

	button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		height: 2.5rem;
		padding-inline: var(--space-16);
		border: 1px solid transparent;
		border-radius: var(--radius-400);
		background: none;
		font: inherit;
		font-size: var(--font-size-150);
		font-weight: var(--weight-medium);
		color: var(--fg-muted);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	button[aria-pressed='true'] {
		border-color: var(--border-strong);
		background: var(--card);
		color: var(--fg);
	}

	button[aria-pressed='true'] .tag {
		color: var(--lime-ink);
	}

	button:focus-visible {
		outline: 2px solid var(--lime-ink);
		outline-offset: 2px;
	}

	.showcase {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: clamp(1.5rem, 4vw, 4rem);
	}

	/* The black under the phone: inset from the clip's edges so the bezel and
	   the side buttons cover it, rounded to the phone's corners. */
	.phone {
		position: relative;
		width: min(19rem, 46svh);
	}

	.phone::before {
		content: '';
		position: absolute;
		inset: 1.2% 4.5%;
		border-radius: 14% / 6.8%;
		background: #000;
	}

	.callouts {
		display: flex;
		flex-direction: column;
		gap: clamp(3rem, 8vw, 6rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.callouts li {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		max-width: 16rem;
		font-size: var(--font-size-200);
		line-height: 1.45;
		font-weight: var(--weight-medium);
		animation: callout 0.7s var(--ease-out) both;
		animation-delay: calc(0.3s + var(--i) * 0.12s);
	}

	.callouts .tag {
		color: var(--lime-ink);
	}

	.left li {
		margin-left: auto;
		text-align: right;
	}

	/* A leader line from each callout towards the phone, drawn in. */
	.callouts li::after {
		content: '';
		position: absolute;
		top: 0.4rem;
		width: clamp(1rem, 3vw, 3rem);
		height: 1px;
		background: var(--border-strong);
		animation: leader 0.6s var(--ease-out) both;
		animation-delay: calc(0.6s + var(--i) * 0.12s);
	}

	.left li::after {
		left: calc(100% + 0.75rem);
		transform-origin: left;
	}

	.right li::after {
		right: calc(100% + 0.75rem);
		transform-origin: right;
	}

	@keyframes callout {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	@keyframes leader {
		from {
			transform: scaleX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.callouts li,
		.callouts li::after {
			animation: none;
		}
	}

	/* Narrow: phone first, callouts as a two-column list beneath it. */
	@media (max-width: 52rem) {
		.showcase {
			grid-template-columns: 1fr 1fr;
		}

		.phone {
			grid-column: 1 / -1;
			grid-row: 1;
			justify-self: center;
		}

		.callouts {
			gap: var(--space-24);
		}

		.left li {
			margin-left: 0;
			text-align: left;
		}

		.callouts li::after {
			display: none;
		}
	}
</style>
