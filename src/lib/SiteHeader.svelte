<script lang="ts">
	import icon from '$lib/assets/eassy-icon.svg';
</script>

<!--
	The site header: just the wordmark. It scrolls away with the page rather than
	sticking — nothing in it needs to stay reachable, and a translucent bar over
	the homepage clips would tint them.
-->
<header class="topbar">
	<div class="topbar-inner">
		<a class="wordmark" href="/">
			<img src={icon} alt="" width="28" height="28" />
			<span>eassy</span>
		</a>
	</div>
</header>

<style>
	.topbar {
		background: var(--fill);
	}

	.topbar-inner {
		display: flex;
		align-items: center;
		gap: var(--space-16);
		max-width: var(--width-page);
		margin-inline: auto;
		padding: var(--space-12) var(--space-16);
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		font-size: var(--font-size-300);
		font-weight: var(--weight-bold);
		letter-spacing: var(--tracking-300);
		color: var(--fg);
		text-decoration: none;
	}

	.wordmark img {
		border-radius: 22%;
	}
</style>
