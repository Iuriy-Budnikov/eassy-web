<script lang="ts">
	import Steps from '$lib/Steps.svelte';
	import TemplatesArt from '$lib/art/TemplatesArt.svelte';
	import LogArt from '$lib/art/LogArt.svelte';
	import ProgressionArt from '$lib/art/ProgressionArt.svelte';
	import InsightsArt from '$lib/art/InsightsArt.svelte';
	import { reveal } from '$lib/reveal';

	/** One session, start to finish, as numbered stops on a rail. */
	const steps = [
		{
			title: 'Find the right workout for today',
			body: 'Smart Templates are shaped by recovery, goals, experience and recent sessions. Or build your own: edit exercises, sets and reps, add supersets, and reuse them whenever you train.',
			art: TemplatesArt
		},
		{
			title: 'Log it without breaking the flow',
			body: 'Sets, reps, weight and rest, a tap each. Track from your wrist with Apple Watch — the rest timer runs there too — and everything stays in sync with iPhone.',
			art: LogArt
		},
		{
			title: 'Add weight when you’ve earned it',
			body: 'Smart Progression suggests small, sensible increases in weight or reps based on your actual performance. You always stay in control.',
			art: ProgressionArt
		},
		{
			title: 'See what the session did',
			body: 'Review volume, heart rate, effort and progress after every workout, then follow the trend over weeks rather than chasing one number.',
			art: InsightsArt
		}
	];
</script>

<section class="section" id="how">
	<div class="section-inner">
		<div class="section-head" use:reveal>
			<span class="label">04 How it works</span>
			<h2 class="h-section">What eassy does with a training session.</h2>
			<p class="intro">The same four stops every time, on iPhone or from your wrist.</p>
		</div>

		<Steps {steps} />
	</div>
</section>
