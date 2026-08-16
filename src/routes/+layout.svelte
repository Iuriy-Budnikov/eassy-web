<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/eassy-icon.svg';
	import { afterNavigate } from '$app/navigation';
	import CookieBanner from '$lib/CookieBanner.svelte';
	import { capturePageview } from '$lib/analytics';

	let { children } = $props();

	// `afterNavigate` runs once after the initial render and again after every
	// client-side navigation, so it covers the landing page and each subsequent
	// one with a single call site. `capturePageview` boots PostHog on demand and
	// no-ops entirely for a visitor who has not accepted, so this is safe to run
	// unconditionally — and not awaited, since rendering must not wait on it.
	afterNavigate(() => {
		void capturePageview();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<CookieBanner />
