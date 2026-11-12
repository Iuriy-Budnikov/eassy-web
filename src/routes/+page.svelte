<script lang="ts">
	import { APP_STORE_URL } from '$lib';
	import Footer from '$lib/Footer.svelte';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import Hero from '$lib/home/Hero.svelte';
	import WorksWith from '$lib/home/WorksWith.svelte';
	import Demo from '$lib/home/Demo.svelte';
	import Definition from '$lib/home/Definition.svelte';
	import Gap from '$lib/home/Gap.svelte';
	import HowItWorks from '$lib/home/HowItWorks.svelte';
	import Balance from '$lib/home/Balance.svelte';
	import Trends from '$lib/home/Trends.svelte';
	import Offer from '$lib/home/Offer.svelte';
	import Faq from '$lib/home/Faq.svelte';
	import Cta from '$lib/home/Cta.svelte';
	import BalanceGame from '$lib/home/BalanceGame.svelte';

	/*
	 * The page follows qlane.ai's narrative, one question per section: what is
	 * it (hero, definition), can I trust it (works with), show me (demo), why do
	 * I need it (the gap), how does it work, what's special (Training Balance,
	 * Trends), what does it cost (offer), what about… (FAQ), what now (CTA).
	 *
	 * Copy is condensed from text already published on the site — the FAQ and
	 * /support — rather than written fresh, so the pages never drift apart.
	 */

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'eassy',
		applicationCategory: 'HealthApplication',
		operatingSystem: 'iOS',
		description:
			'A strength workout tracker for iPhone and Apple Watch with Training Readiness, Smart Progression, workout templates, and Apple Health integration.',
		url: 'https://eassy.app/',
		downloadUrl: APP_STORE_URL,
		offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }
	};
</script>

<svelte:head>
	<title>eassy — Less app. More training.</title>
	<meta
		name="description"
		content="Free strength tracking for iPhone and Apple Watch. Log your workouts, understand your readiness, and see your progress over time. No account required."
	/>
	<link rel="canonical" href="https://eassy.app/" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="eassy — Less app. More training." />
	<meta
		property="og:description"
		content="Free, minimal strength tracking for iPhone and Apple Watch."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://eassy.app/" />
	<meta property="og:image" content="https://eassy.app/og.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="eassy — Less app. More training." />
	<meta
		name="twitter:description"
		content="Free, minimal strength tracking for iPhone and Apple Watch."
	/>
	<meta name="twitter:image" content="https://eassy.app/og.jpg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<SiteHeader />

<main>
	<Hero />
	<WorksWith />
	<Demo />
	<Definition />
	<Gap />
	<HowItWorks />
	<Balance />
	<Trends />
	<Offer />
	<Faq />
	<Cta />
	<BalanceGame />
</main>

<Footer />
