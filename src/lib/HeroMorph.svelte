<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	/**
	 * The cycling tail of the hero headline ("eassy ___."), after the morphing
	 * tail on qlane.ai's hero. The full sentence is given to
	 * assistive tech once, through `aria-label` on the heading; the cycling words
	 * themselves are hidden from it so a screen reader is not interrupted every
	 * few seconds. With reduced motion the first word simply stays.
	 */
	let { words, interval = 2600 }: { words: string[]; interval?: number } = $props();

	let index = $state(0);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = setInterval(() => {
			index = (index + 1) % words.length;
		}, interval);
		return () => clearInterval(timer);
	});
</script>

<span class="stack" aria-hidden="true">
	{#key index}
		<span
			class="word"
			in:fly={{ y: '0.45em', delay: 180, duration: 520, easing: cubicOut, opacity: 0 }}
			out:fly={{ y: '-0.3em', duration: 220, easing: cubicOut, opacity: 0 }}>{words[index]}</span
		>
	{/key}
</span>

<style>
	/* Both the leaving and the arriving word occupy the same grid cell, so the
	   line never reflows mid-transition. */
	.stack {
		display: inline-grid;
		vertical-align: bottom;
	}

	.word {
		grid-area: 1 / 1;
		color: var(--fg);
		background: linear-gradient(transparent 64%, var(--lime-soft) 64%, var(--lime-soft) 92%, transparent 92%);
	}
</style>
