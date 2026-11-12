<script lang="ts">
	import AppStoreBadge from '$lib/AppStoreBadge.svelte';
	import PrivacyArt from '$lib/art/PrivacyArt.svelte';
	import { reveal } from '$lib/reveal';

	/**
	 * The offer, in the slot qlane.ai gives its pilot: the price, then the
	 * promises that remove the risk of trying, as a carousel of numbered cards
	 * ("01 / 05"). The carousel is a native scroll-snap row; the arrows and the
	 * counter only drive and follow it, so it still works by swipe and keyboard
	 * scroll.
	 */
	const promises = [
		{ tag: 'Price', title: 'Free', body: 'eassy is free to download and use.' },
		{ tag: 'Sign-up', title: 'No account', body: 'There is no sign-up or account required. Open the app and train.' },
		{
			tag: 'Storage',
			title: 'Your data stays on your iPhone',
			body: 'Your workout and health data stays on your device. eassy does not require cloud storage to work.'
		},
		{
			tag: 'Hardware',
			title: 'Works without a Watch',
			body: 'eassy works fully on iPhone. Apple Watch adds wrist-based tracking and keeps your session in sync.'
		},
		{
			tag: 'Control',
			title: 'You stay in control',
			body: 'Smart Progression suggests; you decide. Build and edit your own templates whenever you want.'
		}
	];

	let track: HTMLOListElement;
	let current = $state(0);

	function onScroll() {
		const card = track.firstElementChild as HTMLElement | null;
		if (!card) return;
		const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
		current = Math.min(promises.length - 1, Math.round(track.scrollLeft / step));
	}

	function go(delta: number) {
		const target = track.children[Math.max(0, Math.min(promises.length - 1, current + delta))] as HTMLElement;
		track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
	}
</script>

<section class="section" id="privacy">
	<div class="section-inner">
		<div class="split">
			<div class="offer">
				<div class="section-head" use:reveal>
					<span class="label">07 The offer</span>
					<h2 class="h-section">Free on the App Store. No account, no catch.</h2>
					<p class="intro">Everything on this page, on your iPhone, for nothing.</p>
				</div>

				<div class="price">
					<span class="amount">Free</span>
					<AppStoreBadge placement="offer" />
				</div>

				<div class="carousel">
					<div class="controls">
						<span class="tag counter"
							>{String(current + 1).padStart(2, '0')} / {String(promises.length).padStart(2, '0')}</span
						>
						<button type="button" aria-label="Previous" disabled={current === 0} onclick={() => go(-1)}
							>←</button
						>
						<button
							type="button"
							aria-label="Next"
							disabled={current === promises.length - 1}
							onclick={() => go(1)}>→</button
						>
					</div>

					<ol class="track" bind:this={track} onscroll={onScroll}>
						{#each promises as p, i (p.title)}
							<li>
								<span class="tag">{String(i + 1).padStart(2, '0')} · {p.tag}</span>
								<h3>{p.title}</h3>
								<p>{p.body}</p>
							</li>
						{/each}
					</ol>
				</div>
			</div>

			<div class="panel">
				<PrivacyArt />
			</div>
		</div>
	</div>
</section>

<style>
	.offer {
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
	}

	.offer .section-head {
		margin-bottom: 0;
	}

	.price {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-24);
	}

	.amount {
		font-size: clamp(3rem, 6vw, 4.5rem);
		font-weight: var(--weight-medium);
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		margin-bottom: var(--space-12);
	}

	.counter {
		margin-right: auto;
	}

	.controls button {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-400);
		background: var(--card);
		font: inherit;
		color: var(--fg);
		cursor: pointer;
	}

	.controls button:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.controls button:focus-visible {
		outline: 2px solid var(--lime-ink);
		outline-offset: 2px;
	}

	.track {
		display: grid;
		grid-auto-columns: minmax(15rem, 70%);
		grid-auto-flow: column;
		column-gap: var(--space-12);
		margin: 0;
		padding: 0 0 var(--space-4);
		list-style: none;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.track li {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		padding: var(--space-24);
		border: 1px solid var(--border);
		border-radius: var(--radius-900);
		background: var(--card);
		scroll-snap-align: start;
	}

	.track .tag {
		color: var(--lime-ink);
	}

	.track h3 {
		margin: var(--space-16) 0 0;
		font-size: clamp(1.375rem, 2.2vw, 1.75rem);
		line-height: 1.2;
		font-weight: var(--weight-medium);
		letter-spacing: -0.015em;
	}

	.track p {
		margin: 0;
		font-size: var(--font-size-150);
		line-height: 1.55;
		color: var(--fg-muted);
	}
</style>
