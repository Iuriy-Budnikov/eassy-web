<script lang="ts">
	import ConveyorArt from '$lib/art/ConveyorArt.svelte';
	import { reveal } from '$lib/reveal';

	/**
	 * The category sentence, after qlane.ai's "Qlane is an AI QA engineer…":
	 * what eassy is, in one line, then the diagram of what goes in and what
	 * comes out.
	 */
</script>

<section class="section" id="what">
	<div class="section-inner">
		<div class="section-head" use:reveal>
			<span class="label">02 Definition</span>
			<h2 class="h-section">
				eassy is a strength tracker that reads your recovery before it plans your workout.
			</h2>
			<p class="intro">
				It turns your recent training load and the health data you allow — sleep, HRV, resting heart
				rate — into three answers: how ready you are today, which workout fits, and when to add
				weight.
			</p>
		</div>

		<div class="panel">
			<ConveyorArt />
		</div>
	</div>
</section>

<style>
	.panel {
		padding: clamp(0.5rem, 2vw, 1.5rem);
	}
</style>
