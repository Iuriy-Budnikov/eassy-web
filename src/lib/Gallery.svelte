<script lang="ts">
	import { reveal } from '$lib/reveal';

	/**
	 * A snapping horizontal card rail, built to the gallery on
	 * apple.com/iphone-17-pro. Measured off that page: 372px cards 20px apart,
	 * 28px corners, 17/25 semibold captions with a white heading over grey body,
	 * snapping to the start of each card, and 36px circular paddle arrows.
	 *
	 * Each instance owns its own rail element and edge state, so a page can carry
	 * several galleries without them fighting over one scroll position.
	 */
	type Card = { title: string; body: string; key?: string; image?: string };

	let { title, cards }: { title: string; cards: Card[] } = $props();

	/**
	 * Splits a card body around its key phrase so that phrase can be picked out in
	 * white against the muted rest. Done as text nodes rather than by injecting
	 * markup, so the copy stays plain strings. A `key` that is not found in the
	 * body simply leaves the line unhighlighted rather than breaking it.
	 */
	function segments(card: Card) {
		const at = card.key ? card.body.indexOf(card.key) : -1;
		if (at < 0) return [{ text: card.body, lit: false }];

		return [
			{ text: card.body.slice(0, at), lit: false },
			{ text: card.key as string, lit: true },
			{ text: card.body.slice(at + (card.key as string).length), lit: false }
		].filter((part) => part.text);
	}

	let rail: HTMLDivElement | undefined = $state();
	let atStart = $state(true);
	let atEnd = $state(false);

	function updateRailEdges() {
		if (!rail) return;
		atStart = rail.scrollLeft <= 1;
		atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1;
	}

	/** Moves by exactly one card pitch, so a click lands where the snap would. */
	function slide(direction: 1 | -1) {
		const list = rail?.firstElementChild;
		const card = list?.firstElementChild;
		if (!rail || !list || !card) return;

		const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
		rail.scrollBy({
			left: direction * (card.getBoundingClientRect().width + gap),
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
		});
	}

	// The rail may not overflow at all on a wide screen, so seed the edge state
	// once it exists rather than assuming there is somewhere to scroll.
	$effect(() => {
		if (rail) updateRailEdges();
	});
</script>

<section>
	<div class="head" use:reveal>
		<h2>{title}</h2>

		<div class="rail-nav">
			<button
				type="button"
				class="paddle"
				aria-label="Previous cards"
				disabled={atStart}
				onclick={() => slide(-1)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path
						d="M15 4 7 12l8 8"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<button
				type="button"
				class="paddle"
				aria-label="Next cards"
				disabled={atEnd}
				onclick={() => slide(1)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path
						d="M9 4l8 8-8 8"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</div>

	<div class="rail" bind:this={rail} onscroll={updateRailEdges}>
		<ul class="cards" use:reveal>
			{#each cards as card (card.title)}
				<li>
					<div class="tile">
						{#if card.image}
							<img src={card.image} alt="" loading="lazy" />
						{:else}
							<span>{card.title}</span>
						{/if}
					</div>

					<h3 class="card-title">{card.title}</h3>

					<p class="card-body">
						{#each segments(card) as part (part.text)}{#if part.lit}<span class="key"
									>{part.text}</span
								>{:else}{part.text}{/if}{/each}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	/* The rail is full-bleed so cards can run off the right edge, so the section
	   drops its own horizontal padding and the gutter moves onto the children —
	   computed so the first card lines up with the page column rather than the
	   viewport edge. */

	section {
		--gutter: max(var(--space-16), calc((100vw - var(--width-page)) / 2));

		position: relative;
		box-sizing: border-box;
		padding-block: clamp(var(--space-128), 16vw, 12rem);
		padding-inline: 0;
		background-image: var(--fill-gradient);
		overflow-x: clip;
	}

	.head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-24);
		max-width: none;
		margin-bottom: clamp(var(--space-32), 4vw, var(--space-48));
		padding-inline: var(--gutter);
	}

	h2 {
		margin: 0;
		max-width: 24ch;
		font-size: clamp(2rem, 4.4vw, 3.5rem);
		line-height: 1.0715;
		letter-spacing: -0.005em;
		font-weight: var(--weight-semibold);
	}

	.rail-nav {
		display: flex;
		flex: none;
		gap: var(--space-8);
	}

	/* Apple's paddlenav: a 36px circle, rgba(66,66,69,.72) behind a slightly
	   dimmed white chevron, fading back rather than disappearing at each end. */
	.paddle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: rgb(66 66 69 / 72%);
		color: rgb(255 255 255 / 80%);
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			opacity var(--duration-fast) var(--ease-out);
	}

	.paddle svg {
		width: 1rem;
		height: 1rem;
	}

	.paddle:hover:not(:disabled) {
		background: rgb(86 86 90 / 82%);
	}

	.paddle:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.paddle:disabled {
		opacity: 0.42;
		cursor: default;
	}

	/* The scroller and the list are two elements on purpose. `overflow-x: auto`
	   makes a box scrollable on *both* axes — there is no way to opt one axis out,
	   since `overflow-y: clip` computes back to `hidden` next to a scrolling axis,
	   and Chrome still steers wheel deltas into a `hidden` axis that has room. The
	   reveal offsets each card down by 18px on its way in, which is exactly that
	   much room: a wheel tick over the gallery spent itself on those 18px instead
	   of the page, so the page felt stuck on this section. Clipping the offset at
	   the list, one level inside the scroller, leaves the scroller with nothing to
	   scroll vertically and the wheel goes back to the page. */
	.rail {
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: var(--gutter);
		/* The rail is discoverable by dragging and by the cards running off the
		   edge; a scrollbar under it would only add noise. */
		scrollbar-width: none;
	}

	.rail::-webkit-scrollbar {
		display: none;
	}

	.cards {
		display: flex;
		/* Cards size to their own content. Stretching them to a shared height
		   squeezes a three-line caption into the two-line box the shorter cards
		   set, and the clipping below cuts the overflow rather than letting it
		   merely spill. */
		align-items: flex-start;
		gap: 1.25rem;
		list-style: none;
		margin: 0;
		width: max-content;
		padding-inline: var(--gutter);
		overflow: hidden;
	}

	.cards li {
		flex: none;
		width: min(23.25rem, 78vw);
		scroll-snap-align: start;
	}

	.tile {
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		height: min(28.125rem, 94vw);
		border-radius: 1.75rem;
		background: linear-gradient(160deg, #1c1c1f, #0d0d0f 70%);
		overflow: hidden;
	}

	.tile img {
		display: block;
		width: 100%;
		height: 100%;
		/* Anchored to the top so the crop keeps the screen's own header in frame
		   rather than centring on whatever happens to be mid-screen. */
		object-fit: cover;
		object-position: top;
	}

	/* Fallback for a card with no image yet. */
	.tile span {
		padding: var(--space-32);
		font-size: clamp(1.75rem, 2.4vw, 2.5rem);
		line-height: 1.1;
		letter-spacing: -0.005em;
		font-weight: var(--weight-semibold);
	}

	/* Caption follows Apple's: the card's name on its own line in white, then the
	   description muted beneath it. */
	.card-title {
		margin: 0.85rem 0 0;
		padding-inline: 0.9375rem;
		font-size: 1.0625rem;
		line-height: 1.47;
		font-weight: var(--weight-semibold);
		color: var(--fg);
	}

	/* Muted by default, with only the key phrase lifted to full strength — the
	   eye lands on the point of the card before reading the whole line. */
	.card-body {
		margin: 0;
		/* Apple insets the caption 15px from each tile edge rather than running it
		   flush, which keeps the text off the card's corner radius. */
		padding-inline: 0.9375rem;
		/* Reserve three lines on every card. The list clips its overflow, so a
		   caption that runs longer than its neighbours is cut rather than
		   spilling; reserving the space up front avoids that and squares off the
		   bottom of the row. */
		min-height: calc(1.47em * 3);
		font-size: 1.0625rem;
		line-height: 1.47;
		font-weight: var(--weight-semibold);
		color: var(--fg-muted);
	}

	.key {
		color: var(--fg);
	}

	@media (max-width: 40rem) {
		.rail-nav {
			display: none;
		}
	}
</style>
