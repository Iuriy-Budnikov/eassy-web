// Reactive wrapper around the stored consent choice.
//
// Split from `analytics.ts` so that module stays free of runes and can be
// imported anywhere; this one carries the `.svelte.ts` extension because it
// declares `$state`.
//
// `value` starts as `null` rather than `'pending'` on purpose. Every route is
// prerendered, so the banner's markup is baked into the HTML at build time —
// rendering it before `load()` runs on the client would either ship a banner to
// visitors who already decided, or produce a hydration mismatch. `null` means
// "not yet known", and nothing renders until the client says otherwise.

import { getConsent, setConsent, type ConsentChoice, type ConsentState } from './analytics';

export const consent = $state<{ value: ConsentState | null }>({ value: null });

/** Reads the stored choice. Call once the client is mounted. */
export function loadConsent(): void {
	consent.value = getConsent();
}

export function chooseConsent(choice: ConsentChoice): void {
	// Not awaited: the banner should dismiss on click, not after PostHog's
	// bundle has finished downloading.
	void setConsent(choice);
	consent.value = choice;
}

/**
 * Re-opens the banner so a visitor can change their mind.
 *
 * Consent has to be as easy to withdraw as it was to give, so the footer links
 * here. The stored value is deliberately left alone until an actual choice is
 * made — dismissing the site mid-reconsideration should not silently revoke a
 * consent that was never withdrawn.
 */
export function reopenConsent(): void {
	consent.value = 'pending';
}
