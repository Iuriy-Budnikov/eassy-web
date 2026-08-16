<script lang="ts">
	import LegalPage from '$lib/LegalPage.svelte';
	import { APP_STORE_URL } from '$lib';
</script>

<svelte:head>
	<title>Support — eassy</title>
	<meta
		name="description"
		content="Get help with eassy: Apple Health syncing, Apple Watch, Live Activities, Training Readiness, Training Balance, Smart Progression, and where your workout data is stored."
	/>
	<link rel="canonical" href="https://eassy.app/support" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="Support — eassy" />
	<meta
		property="og:description"
		content="Answers to common eassy questions and how to reach us — Apple Health, Apple Watch, Live Activities, training metrics, and your data."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://eassy.app/support" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<LegalPage>
	<h1>Support</h1>

	<p>
		Something not working, or not behaving the way you expected? Email
		<a href="mailto:info@eassy.app">info@eassy.app</a> and a person will read it. We usually reply within
		a couple of working days.
	</p>

	<p>
		Most of the questions we get are about the same handful of things, so it may be quicker to check
		below first.
	</p>

	<ul class="toc">
		<li><a href="#contacting-us">Contacting us</a></li>
		<li><a href="#apple-health">Apple Health isn't syncing</a></li>
		<li><a href="#apple-watch">My Apple Watch isn't showing the workout</a></li>
		<li><a href="#live-activity">The Lock Screen or Dynamic Island isn't showing my workout</a></li>
		<li><a href="#readiness">Training Readiness says "Building your baseline"</a></li>
		<li><a href="#training-balance">Training Balance says "No Data"</a></li>
		<li><a href="#smart-progression">Smart Progression isn't adjusting my weights</a></li>
		<li><a href="#interrupted-workout">My workout was interrupted</a></li>
		<li><a href="#your-data">Where your data is stored</a></li>
		<li><a href="#settings">Units, week start, and language</a></li>
		<li><a href="#analytics">Turning off usage analytics</a></li>
		<li><a href="#requirements">Requirements</a></li>
		<li><a href="#bugs-and-requests">Reporting a bug or requesting a feature</a></li>
	</ul>

	<h2 id="contacting-us">Contacting us</h2>

	<p>Email <a href="mailto:info@eassy.app">info@eassy.app</a>.</p>

	<p>If you are reporting a problem, it helps enormously if you include:</p>

	<ul>
		<li>what you expected to happen, and what happened instead;</li>
		<li>your iPhone model and iOS version, and your Apple Watch model if it's involved;</li>
		<li>
			the eassy version — <strong>You</strong> → <strong>Devices</strong> →
			<strong>Apple Watch</strong> shows the app version, and the watch app's version too;
		</li>
		<li>roughly when it happened, and whether it happens every time or occasionally;</li>
		<li>a screenshot or screen recording, if the problem is visible.</li>
	</ul>

	<p>
		Please don't send screenshots of anything you consider private — we don't need your health data
		to investigate most problems.
	</p>

	<h2 id="apple-health">Apple Health isn't syncing</h2>

	<p>
		Apple Health permissions are granted per data type, and iOS does not tell apps which ones you
		declined. If workouts, heart rate, sleep, or body measurements look missing, check what eassy is
		actually allowed to read:
	</p>

	<p>
		Open the <strong>Health</strong> app, then <strong>Sharing</strong> → <strong>Apps and Services</strong>
		→ <strong>eassy</strong>, and turn on the categories you want eassy to use.
	</p>

	<p>
		A common surprise: granting access later does not backfill everything instantly. eassy imports
		workouts when the app is opened and in the background, so give it a launch or two.
	</p>

	<p>
		Features that depend on Health will stay quiet without it — Training Readiness needs sleep, heart
		rate variability, and resting heart rate, and Training Balance needs workouts with heart-rate
		data.
	</p>

	<h2 id="apple-watch">My Apple Watch isn't showing the workout</h2>

	<ul>
		<li>Make sure the eassy watch app is installed — check the Watch app on your iPhone.</li>
		<li>
			Keep both devices unlocked and nearby when starting a workout, so the first handshake can
			complete.
		</li>
		<li>
			If the watch and iPhone disagree about what is happening, finishing the workout on either
			device will reconcile them.
		</li>
	</ul>

	<p>
		Heart rate and calories measured by the watch are merged into the workout when it finishes, so
		they may appear a moment after you tap Finish rather than immediately.
	</p>

	<h2 id="live-activity">The Lock Screen or Dynamic Island isn't showing my workout</h2>

	<p>
		Live Activities need notification permission. Check <strong>Settings</strong> →
		<strong>Notifications</strong> → <strong>eassy</strong>, and confirm <strong>Live Activities</strong>
		is allowed.
	</p>

	<p>
		A Focus mode, Low Power Mode, or starting a workout from your wrist while the iPhone is locked
		can all delay it appearing. It should catch up the next time you unlock your phone.
	</p>

	<h2 id="readiness">Training Readiness says "Building your baseline"</h2>

	<p>
		This is expected on a new install, and it is deliberate. Training Readiness compares today
		against <em>your</em> normal — your own sleep, heart rate variability, and resting heart rate over
		the preceding weeks — rather than against a population average.
	</p>

	<p>
		Until there is enough history for that comparison to mean anything, eassy shows the learning state
		instead of inventing a score. Keep logging workouts and wearing your watch overnight, and it will
		fill in.
	</p>

	<h2 id="training-balance">Training Balance says "No Data"</h2>

	<p>
		Training Balance compares your recent training load against the longer-term load your body has
		adapted to. It needs workout history to compute that, and it will show <strong>No Data</strong>
		rather than a fabricated 0.00 when it doesn't have enough.
	</p>

	<p>
		While the longer-term baseline is still filling in, the value is shown but flagged as still
		developing. Rest days don't break it — they simply lower the ratio, which is the point.
	</p>

	<h2 id="smart-progression">Smart Progression isn't adjusting my weights</h2>

	<p>There are a few reasons it may be holding steady:</p>

	<ul>
		<li>
			<strong>Learning phase.</strong> Smart Progression waits until you have logged
			<strong>five workouts in eassy</strong> before it changes any targets. Workouts imported from
			Apple Health do not count toward this — only sessions you actually logged in the app.
		</li>
		<li>
			<strong>It is set to None.</strong> Check <strong>You</strong> →
			<strong>Training Profile</strong> → <strong>Smart Progression</strong>.
		</li>
		<li>
			<strong>Low readiness.</strong> On a low-readiness day the engine deliberately holds targets
			rather than pushing you.
		</li>
		<li>
			<strong>A long gap.</strong> After several weeks away it holds your previous target instead of
			reading the break as "stronger now".
		</li>
		<li>
			<strong>Some movements never auto-progress.</strong> Mobility and plyometric exercises are paced
			by you, by design.
		</li>
	</ul>

	<p>
		When it does adjust something, the changed value carries a small green marker. Tapping it explains
		exactly why the target moved.
	</p>

	<h2 id="interrupted-workout">My workout was interrupted</h2>

	<p>
		If eassy is closed, crashes, or your phone restarts mid-workout, reopening the app restores the
		session where you left off, including sets you had already logged. You do not need to start again.
	</p>

	<p>
		Recovery snapshots are short-lived by design, so restore the session on the same day rather than
		days later.
	</p>

	<h2 id="your-data">Where your data is stored</h2>

	<p>
		eassy does not require an account, and your workout history, templates, and profile live
		<strong>on your iPhone</strong> — not in an eassy cloud account, and not in iCloud or CloudKit.
	</p>

	<p>This has one important consequence worth knowing before it matters:</p>

	<ul>
		<li>
			deleting the app, or losing the device, can lose that data — and because we never receive a
			copy, we cannot restore it for you;
		</li>
		<li>
			an encrypted iPhone backup (iCloud Backup or a computer backup) is the way to preserve it
			across devices.
		</li>
	</ul>

	<p>
		Workouts you have written to Apple Health remain in Apple Health regardless, and are managed
		there.
	</p>

	<h2 id="settings">Units, week start, and language</h2>

	<p>
		Weight and distance units, and which day your week starts on, are on the <strong>You</strong>
		screen. Weight units can also be overridden for an individual exercise.
	</p>

	<p>
		eassy is available in English, Ukrainian, German, French, Spanish, and Portuguese (Portugal), and
		follows your iPhone's language. You can change it in
		<strong>You</strong> → <strong>Language</strong>.
	</p>

	<h2 id="analytics">Turning off usage analytics</h2>

	<p>
		eassy records a small amount of anonymous usage information — which features get used — so we can
		improve the app. It never includes your Apple Health data, body measurements, or the names of your
		workouts.
	</p>

	<p>
		You can switch it off at any time under <strong>You</strong> → <strong>Privacy</strong> →
		<strong>Usage Analytics</strong>. Nothing in the app depends on it. The
		<a href="/privacy-policy">Privacy Policy</a> lists exactly what is and isn't collected.
	</p>

	<h2 id="requirements">Requirements</h2>

	<ul>
		<li>iPhone running iOS 26.4 or later.</li>
		<li>Apple Watch running watchOS 26.4 or later, for the watch companion.</li>
		<li>Apple Health, for readiness, heart-rate, and training-load features. Optional.</li>
		<li>
			Some on-device AI coaching text requires a device with Apple Intelligence. Where it isn't
			available, eassy falls back to written copy rather than showing nothing.
		</li>
	</ul>

	<h2 id="bugs-and-requests">Reporting a bug or requesting a feature</h2>

	<p>
		Both go to <a href="mailto:info@eassy.app">info@eassy.app</a>. Feature requests genuinely do get
		read — a good description of the training problem you're trying to solve is far more useful to us
		than a proposed solution.
	</p>

	<p>
		If eassy has been useful, a review on the
		<a href={APP_STORE_URL} rel="noopener noreferrer">App Store</a> helps more than you would think.
	</p>

	<p>
		See also the <a href="/privacy-policy">Privacy Policy</a> and
		<a href="/terms-and-conditions">Terms and Conditions</a>.
	</p>
</LegalPage>
