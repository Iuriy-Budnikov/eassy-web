<!--
	The trust strip, in the slot qlane.ai uses for partner logos. eassy has no
	logos to show, so it states what it runs on and the promises that matter
	before a download. Text only: Apple's marks would read as an endorsement.
-->
<script lang="ts">
	const items = ['Apple Health', 'Apple Watch', 'iPhone', 'No account', 'On-device data', 'Free'];
</script>

<section class="section strip" aria-label="Works with">
	<div class="section-inner row">
		<span class="tag">Works with</span>
		<ul>
			{#each items as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.strip {
		padding-top: clamp(3.5rem, 7vw, 6rem);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-16) var(--space-32);
		padding-block: var(--space-20);
		border-block: 1px solid var(--border);
	}

	ul {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-12) var(--space-24);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		font-size: var(--font-size-300);
		font-weight: var(--weight-medium);
		letter-spacing: -0.01em;
		color: var(--fg-muted);
	}

	li::before {
		content: '';
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
		background: var(--lime);
	}
</style>
