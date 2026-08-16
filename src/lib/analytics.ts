// PostHog web analytics for eassy.app.
//
// This site shares PostHog project 560510 with the iOS app rather than using a
// project of its own. That has one consequence worth knowing before changing
// anything here: the app's product-health dashboard and its eleven cohorts are
// built on *person* records and on specific event names. Two settings below
// exist to keep site traffic from disturbing them —
//
//   * `person_profiles: 'identified_only'` — the site never calls `identify`,
//     so anonymous visitors create no person records at all. Without this,
//     every visitor would become a person and the lifecycle cohorts
//     ("0 Workouts", "1 Workout", …) would be counted against a denominator
//     full of people who never installed the app.
//
//   * a `platform: 'web'` super property on every event — the iOS client
//     stamps `platform: 'ios'` (see AnalyticsContext.properties in the app
//     repo), so one filter separates the two surfaces. Keep the key and the
//     value in step with the app if either ever changes.
//
// Consent: nothing is initialised, and no cookie is set, until the visitor
// accepts. See `consent.svelte.ts` for why the choice is stored here rather
// than read back out of PostHog.

import { browser } from '$app/environment';

type PostHog = typeof import('posthog-js').default;

/** Project 560510 — a write-only client key, safe to commit (same class of
 *  value as the app's `EASSY_POSTHOG_API_KEY` in Info.plist). */
const PROJECT_TOKEN = 'phc_vMmrdmgJMnFwjLDeFtgsp9zxRfTqoXQMMXbkx7EtBaMn';
const API_HOST = 'https://us.i.posthog.com';

const STORAGE_KEY = 'eassy_analytics_consent';

export type ConsentChoice = 'accepted' | 'declined';
export type ConsentState = ConsentChoice | 'pending';

/** Resolved once PostHog has actually loaded and initialised. */
let client: PostHog | null = null;
/** In-flight (or settled) boot, so concurrent callers share one import. */
let booting: Promise<void> | null = null;

/**
 * The visitor's stored choice.
 *
 * PostHog's own `has_opted_in_capturing()` / `has_opted_out_capturing()` cannot
 * express "hasn't chosen yet" — both can read false, and with
 * `opt_out_capturing_by_default` the opted-out reading is indistinguishable
 * from a deliberate refusal (PostHog/posthog-js#1547). The banner needs that
 * third state to know whether to appear, so the choice is stored here instead.
 */
export function getConsent(): ConsentState {
	if (!browser) return 'pending';
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw === 'accepted' || raw === 'declined' ? raw : 'pending';
	} catch {
		// Safari in Lockdown/private mode throws on localStorage access rather
		// than returning null. Treat it as undecided and simply never start.
		return 'pending';
	}
}

function storeConsent(choice: ConsentChoice): void {
	try {
		localStorage.setItem(STORAGE_KEY, choice);
	} catch {
		// Non-fatal: the banner reappears next visit, which is the safe failure.
	}
}

/**
 * Boots PostHog, but only for a visitor who has accepted. Idempotent.
 *
 * `posthog-js` is imported dynamically rather than at the top of this module.
 * Statically imported it is ~236 KB of the site's ~386 KB of client JavaScript,
 * and every visitor paid for it — including the ones who decline and everyone
 * who has not chosen yet. This way the vendor bundle is fetched only once
 * consent exists.
 */
export function startAnalytics(): Promise<void> {
	if (!browser) return Promise.resolve();
	if (getConsent() !== 'accepted') return Promise.resolve();

	// Assigned before the first await so two callers in the same tick (the
	// layout's `afterNavigate`, and the click that granted consent) share one
	// import and one `init` rather than racing to initialise twice.
	booting ??= import('posthog-js').then(({ default: posthog }) => {
		posthog.init(PROJECT_TOKEN, {
			api_host: API_HOST,
			person_profiles: 'identified_only',
			// Pageviews are captured by hand from `afterNavigate` instead. Every
			// route here is prerendered and then navigated client-side, so a
			// single deliberate call per navigation is easier to reason about
			// than relying on history-change detection, and it cannot
			// double-count against the capture made when consent is granted.
			capture_pageview: false,
			capture_pageleave: true
		});
		posthog.register({ platform: 'web' });
		client = posthog;
	});

	return booting;
}

export async function capturePageview(): Promise<void> {
	await startAnalytics();
	client?.capture('$pageview');
}

/**
 * The site's only conversion: a click through to the App Store listing.
 *
 * Best-effort by design. This fires on a link that is already navigating away,
 * so it is not awaited — if PostHog has not finished loading yet the click goes
 * unrecorded rather than delaying the navigation.
 */
export function captureAppStoreClick(placement: string): void {
	client?.capture('app_store_clicked', { placement });
}

/**
 * Records a decision and applies it immediately.
 *
 * Declining after having accepted has to stop capture in the current tab too,
 * not just on the next load — hence the `opt_out_capturing()` call rather than
 * only clearing the stored value.
 */
export async function setConsent(choice: ConsentChoice): Promise<void> {
	storeConsent(choice);

	if (choice === 'accepted') {
		await capturePageview();
		return;
	}

	client?.opt_out_capturing();
}
