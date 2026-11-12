<script lang="ts">
	import BalanceArt from '$lib/art/BalanceArt.svelte';
	import { reveal } from '$lib/reveal';

	/** Deep dive on the feature that most sets eassy apart. */
	const points = [
		{
			title: 'Optimal range',
			body: 'Know when your training load is in the sweet spot for steady progress.'
		},
		{
			title: 'Too much, too fast',
			body: 'Spot when your recent workload is rising faster than your baseline.'
		},
		{
			title: 'Falling behind',
			body: 'See when your training load is dropping below your usual level.'
		},
		{
			title: 'The trend, not the day',
			body: 'Follow how your balance changes over time, and how much of it you spend Optimal, Detraining, or at higher risk.'
		}
	];
</script>

<section class="section" id="balance">
	<div class="section-inner">
		<div class="section-head" use:reveal>
			<span class="label">05 Training Balance</span>
			<h2 class="h-section">Know when to push, hold, or recover.</h2>
			<p class="intro">
				Training Balance compares your recent training load with the workload your body has adapted
				to, so you can see when you’re in a productive range — or pushing too hard.
			</p>
		</div>

		<div class="split">
			<div class="panel">
				<BalanceArt />
			</div>

			<ol class="numbered">
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
	</div>
</section>
