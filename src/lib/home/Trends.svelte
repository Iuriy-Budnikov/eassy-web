<script lang="ts">
	import TrendsArt from '$lib/art/TrendsArt.svelte';
	import { reveal } from '$lib/reveal';

	/** Second deep dive: progress over time. */
	const points = [
		{
			title: 'This period against the last',
			body: 'Every chart sets the current week, month or year beside the one before it.'
		},
		{
			title: 'Load, volume, duration, energy',
			body: 'The numbers that describe a training block, summed for you.'
		},
		{
			title: 'Performance in context',
			body: 'Your best sets and how often you trained, next to the load that produced them.'
		},
		{
			title: 'Pulled from Apple Health too',
			body: 'eassy can import workouts you logged elsewhere, so the picture is complete.'
		}
	];
</script>

<section class="section" id="trends">
	<div class="section-inner">
		<div class="section-head" use:reveal>
			<span class="label">06 Trends</span>
			<h2 class="h-section">Progress, without the noise.</h2>
			<p class="intro">
				See load, volume, duration, energy and performance in context — by week, month or year.
			</p>
		</div>

		<TrendsArt />

		<ol class="numbered cols">
			{#each points as p, i (p.title)}
				<li>
					<span class="tag">{String(i + 1).padStart(2, '0')}</span>
					<div>
						<h3>{p.title}</h3>
						<p>{p.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		column-gap: var(--space-32);
		margin-top: var(--space-32);
	}
</style>
