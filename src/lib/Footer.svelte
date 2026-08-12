<script lang="ts">
	import icon from '$lib/assets/eassy-icon.svg';
</script>

<!--
  Structure and styles follow notion.com's footer: a 25% brand block beside a
  75% grid of link columns, muted column headings over normal-weight links,
  and underlines that appear only on hover.
-->
<footer>
	<nav class="inner" aria-label="Footer">
		<div class="brand">
			<a class="logo" href="/">
				<img src={icon} alt="" width="32" height="32" />
				<span>eassy</span>
			</a>

			<p class="copyright">© 2026 eassy</p>
		</div>

		<div class="columns">
			<ul>
				<li class="heading">Legal</li>
				<li><a href="/privacy-policy">Privacy Policy</a></li>
				<li><a href="/terms-and-conditions">Terms and Conditions</a></li>
			</ul>

			<ul>
				<li class="heading">Support</li>
				<li><a href="mailto:info@eassy.app">Contact</a></li>
			</ul>
		</div>
	</nav>
</footer>

<style>
	footer {
		background: var(--bg);
		border-top: 1px solid var(--border);
	}

	.inner {
		display: flex;
		gap: var(--space-24);
		max-width: var(--width-page);
		margin-inline: auto;
		padding: var(--space-80) var(--space-16);
	}

	.brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
		width: 25%;
	}

	.logo {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		font-size: var(--font-size-350);
		font-weight: var(--weight-bold);
		letter-spacing: var(--tracking-400);
		color: var(--fg);
		text-decoration: none;
	}

	.logo img {
		border-radius: 22%;
	}

	.copyright {
		margin: 0;
		color: var(--fg-muted);
		font-size: var(--font-size-100);
		line-height: var(--line-height-100);
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(3, minmax(10px, 1fr));
		gap: var(--space-24);
		width: 75%;
		/* Pull back the items' inline padding so labels align to the grid. */
		margin-inline-start: calc(var(--space-8) * -1);
	}

	.columns ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.columns li {
		list-style: none;
		padding: var(--space-4) var(--space-8);
	}

	.heading {
		color: var(--fg-muted);
		font-size: var(--font-size-100);
		line-height: var(--line-height-100);
		padding-bottom: var(--space-8);
	}

	.columns a {
		color: var(--fg);
		font-size: var(--font-size-150);
		line-height: var(--line-height-100);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.15em;
		transition: text-decoration-color 120ms ease;
	}

	.columns a:hover {
		text-decoration-color: currentColor;
	}

	@media (max-width: 48rem) {
		.inner {
			flex-direction: column;
			gap: var(--space-40);
			padding: var(--space-48) var(--space-16);
		}

		.brand,
		.columns {
			width: 100%;
		}

		.columns {
			grid-template-columns: repeat(2, minmax(10px, 1fr));
		}
	}
</style>
