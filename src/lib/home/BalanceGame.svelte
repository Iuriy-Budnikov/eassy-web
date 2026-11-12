<script lang="ts">
	/**
	 * "Stay in balance" — the closing mini-game, after qlane.ai's bug hunt.
	 *
	 * Training load drifts on its own and life knocks it about ("Bad night",
	 * "PR attempt"). The reader steers it with the pointer, a finger or the
	 * arrow keys and tries to keep it in the Optimal band. Time in the band is
	 * the score; staying out of it for too long is a strike, and three strikes
	 * end the run. Until Play is pressed, eassy's autopilot plays, as qlane's
	 * drone does.
	 *
	 * Drawn on a canvas: it redraws every frame, which SVG would do no better.
	 * Colours are read from the theme tokens through a probe element, so the
	 * game follows light and dark like the rest of the page. With reduced
	 * motion nothing moves until the reader starts a run.
	 */
	type Mode = 'idle' | 'auto' | 'play' | 'over';

	const BAND_LOW = 0.38;
	const BAND_HIGH = 0.62;
	const STRIKE_AFTER = 1.4; // seconds out of band
	const MAX_STRIKES = 3;
	const HISTORY = 240;

	const events = [
		{ text: 'Bad night', push: -0.22 },
		{ text: 'PR attempt', push: 0.26 },
		{ text: 'Deload week', push: -0.18 },
		{ text: 'Extra session', push: 0.2 },
		{ text: 'Busy week', push: -0.16 },
		{ text: 'New program', push: 0.22 }
	];

	let canvas: HTMLCanvasElement;
	let probe: HTMLSpanElement;

	let mode = $state<Mode>('idle');
	let score = $state(0);
	let strikes = $state(0);
	let best = $state<number | null>(null);
	let banner = $state('');
	/** Bumped on every new banner, so the same text twice still replays. */
	let bannerId = $state(0);

	// Simulation state, outside Svelte's reactivity: it changes every frame.
	let value = 0.5;
	let velocity = 0;
	let target = 0.5;
	let outFor = 0;
	let nextEvent = 3;
	let history: number[] = [];

	function readBest() {
		try {
			const raw = localStorage.getItem('eassy-balance-best');
			best = raw ? Number(raw) : null;
		} catch {
			best = null;
		}
	}

	function saveBest(seconds: number) {
		if (best !== null && seconds <= best) return;
		best = seconds;
		try {
			localStorage.setItem('eassy-balance-best', String(seconds));
		} catch {
			// Storage can be unavailable (private mode); the best simply isn't kept.
		}
	}

	function reset() {
		value = 0.5;
		velocity = 0;
		target = 0.5;
		outFor = 0;
		nextEvent = 2.5;
		history = [];
		score = 0;
		strikes = 0;
		banner = '';
	}

	function start() {
		reset();
		mode = 'play';
		canvas.focus();
	}

	function colour(token: string) {
		probe.style.color = `var(${token})`;
		return getComputedStyle(probe).color;
	}

	$effect(() => {
		readBest();
		const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!still) mode = 'auto';

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let palette: Record<string, string> = {};
		const refreshPalette = () => {
			palette = {
				fg: colour('--fg'),
				fg3: colour('--fg-3'),
				border: colour('--border'),
				lime: colour('--lime'),
				limeInk: colour('--lime-ink'),
				limeSoft: colour('--lime-soft'),
				fail: colour('--fail'),
				p2: colour('--p2')
			};
		};
		refreshPalette();
		const scheme = window.matchMedia('(prefers-color-scheme: dark)');
		scheme.addEventListener('change', refreshPalette);

		let width = 0;
		let height = 0;
		const resize = () => {
			const ratio = window.devicePixelRatio || 1;
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = Math.round(width * ratio);
			canvas.height = Math.round(height * ratio);
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		// Only run frames while the game is on screen.
		let visible = false;
		const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		io.observe(canvas);

		let frame = 0;
		let last = performance.now();
		let paletteAge = 0;

		const y = (v: number) => height * (1 - v);

		const draw = () => {
			ctx.clearRect(0, 0, width, height);

			// Bands
			ctx.fillStyle = palette.p2;
			ctx.fillRect(0, y(BAND_LOW), width, height - y(BAND_LOW));
			ctx.fillStyle = palette.limeSoft;
			ctx.fillRect(0, y(BAND_HIGH), width, y(BAND_LOW) - y(BAND_HIGH));
			ctx.globalAlpha = 0.08;
			ctx.fillStyle = palette.fail;
			ctx.fillRect(0, 0, width, y(BAND_HIGH));
			ctx.globalAlpha = 1;

			ctx.font = '500 11px "Fira Code Variable", ui-monospace, monospace';
			ctx.fillStyle = palette.fail;
			ctx.fillText('HIGHER RISK', 14, 22);
			ctx.fillStyle = palette.limeInk;
			ctx.fillText('OPTIMAL', 14, y(BAND_HIGH) + 20);
			ctx.fillStyle = palette.fg3;
			ctx.fillText('DETRAINING', 14, height - 14);

			// Load line, scrolling left; the head sits at 72% of the width.
			const head = width * 0.72;
			const step = head / HISTORY;
			ctx.beginPath();
			history.forEach((v, i) => {
				const px = head - (history.length - 1 - i) * step;
				if (i === 0) ctx.moveTo(px, y(v));
				else ctx.lineTo(px, y(v));
			});
			ctx.strokeStyle = palette.fg;
			ctx.lineWidth = 2.5;
			ctx.lineJoin = 'round';
			ctx.stroke();

			// Steering target, when the reader is playing.
			if (mode === 'play') {
				ctx.setLineDash([3, 5]);
				ctx.strokeStyle = palette.fg3;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(head, y(target));
				ctx.lineTo(width, y(target));
				ctx.stroke();
				ctx.setLineDash([]);
			}

			const inBand = value >= BAND_LOW && value <= BAND_HIGH;
			ctx.beginPath();
			ctx.arc(head, y(value), 7, 0, Math.PI * 2);
			ctx.fillStyle = inBand ? palette.lime : palette.fail;
			ctx.fill();
			ctx.lineWidth = 1.5;
			ctx.strokeStyle = palette.fg;
			ctx.stroke();
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;

			paletteAge += dt;
			if (paletteAge > 1) {
				paletteAge = 0;
				refreshPalette();
			}

			if (!visible || mode === 'idle' || mode === 'over') {
				if (history.length === 0) history = Array(HISTORY).fill(0.5);
				draw();
				return;
			}

			// Life happens.
			nextEvent -= dt;
			if (nextEvent <= 0) {
				const e = events[Math.floor(Math.random() * events.length)];
				velocity += e.push;
				banner = e.text;
				bannerId += 1;
				nextEvent = 2.2 + Math.random() * 2.4;
			}

			// The autopilot steers toward the middle of the band, a little late.
			if (mode === 'auto') target = 0.5 + Math.sin(now / 1400) * 0.05;

			// Drift, steering and damping.
			velocity += (Math.random() - 0.5) * 0.9 * dt;
			velocity += (target - value) * 2.2 * dt;
			velocity *= Math.pow(0.12, dt);
			value = Math.min(0.98, Math.max(0.02, value + velocity * dt * 3));

			history.push(value);
			if (history.length > HISTORY) history.shift();

			if (mode === 'play') {
				const inBand = value >= BAND_LOW && value <= BAND_HIGH;
				if (inBand) {
					score += dt;
					outFor = 0;
				} else {
					outFor += dt;
					if (outFor >= STRIKE_AFTER) {
						outFor = 0;
						strikes += 1;
						banner = value > BAND_HIGH ? 'Overreached' : 'Detrained';
						bannerId += 1;
						value = 0.5;
						velocity = 0;
						if (strikes >= MAX_STRIKES) {
							mode = 'over';
							saveBest(Math.round(score * 10) / 10);
						}
					}
				}
			}

			draw();
		};

		frame = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(frame);
			ro.disconnect();
			io.disconnect();
			scheme.removeEventListener('change', refreshPalette);
		};
	});

	function steer(event: PointerEvent) {
		if (mode !== 'play') return;
		const box = canvas.getBoundingClientRect();
		target = Math.min(0.98, Math.max(0.02, 1 - (event.clientY - box.top) / box.height));
	}

	function keys(event: KeyboardEvent) {
		if (mode !== 'play') return;
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			target = Math.min(0.98, Math.max(0.02, target + (event.key === 'ArrowUp' ? 0.06 : -0.06)));
		}
	}

	const status = $derived(
		mode === 'play' ? 'You' : mode === 'auto' ? 'eassy playing' : mode === 'over' ? 'Run over' : 'Idle'
	);
</script>

<section class="section game" aria-label="Mini-game">
	<div class="section-inner">
		<div class="top">
			<div class="copy">
				<span class="label">Stay in balance</span>
				<h2 class="title">Keep your training load in the green.</h2>
				<p class="intro">
					eassy plays until you take over. Move up and down to steer — or use the arrow keys. Three
					strikes out of range and the run is over.
				</p>
			</div>

			<dl class="stats">
				<div><dt class="tag">Status</dt><dd>{status}</dd></div>
				<div><dt class="tag">In range</dt><dd>{score.toFixed(1)}s</dd></div>
				<div><dt class="tag">Strikes</dt><dd>{strikes}<span>/{MAX_STRIKES}</span></dd></div>
				<div><dt class="tag">Best</dt><dd>{best === null ? '—' : `${best}s`}</dd></div>
			</dl>
		</div>

		<div class="board panel">
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<canvas
				bind:this={canvas}
				tabindex="0"
				aria-label="Training load game board. Use the arrow keys to steer."
				onpointermove={steer}
				onpointerdown={steer}
				onkeydown={keys}
			></canvas>

			{#if banner && (mode === 'play' || mode === 'auto')}
				{#key bannerId}
					<span class="banner tag">{banner}</span>
				{/key}
			{/if}

			{#if mode !== 'play'}
				<div class="overlay">
					{#if mode === 'over'}
						<p class="result">You stayed in range for {score.toFixed(1)}s.</p>
					{/if}
					<button type="button" class="btn btn-primary" onclick={start}
						>{mode === 'over' ? 'Play again' : 'Play'}</button
					>
				</div>
			{/if}
		</div>
	</div>

	<span class="probe" bind:this={probe} aria-hidden="true"></span>
</section>

<style>
	.game {
		padding-block: clamp(2.5rem, 5vw, 4.5rem);
		border-top: 1px solid var(--border);
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-24);
		margin-bottom: var(--space-24);
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
		max-width: 36rem;
	}

	.title {
		margin: 0;
		font-size: var(--type-step);
		line-height: 1.25;
		font-weight: var(--weight-medium);
		letter-spacing: -0.015em;
	}

	.stats {
		display: flex;
		gap: var(--space-24);
		margin: 0;
	}

	.stats div {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	dd {
		margin: 0;
		font-size: var(--font-size-300);
		font-weight: var(--weight-medium);
		font-variant-numeric: tabular-nums;
	}

	dd span {
		color: var(--fg-3);
	}

	.board {
		position: relative;
		background: var(--card);
	}

	canvas {
		display: block;
		width: 100%;
		height: clamp(14rem, 30vw, 20rem);
		touch-action: none;
		cursor: ns-resize;
	}

	canvas:focus-visible {
		outline: 2px solid var(--lime-ink);
		outline-offset: -2px;
	}

	.banner {
		position: absolute;
		top: var(--space-16);
		right: var(--space-16);
		padding: 0.25rem 0.625rem;
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-round);
		background: var(--card);
		color: var(--fg);
		animation: banner 1.6s var(--ease-out) both;
		pointer-events: none;
	}

	@keyframes banner {
		0% {
			opacity: 0;
			transform: translateY(-4px);
		}
		15%,
		70% {
			opacity: 1;
			transform: none;
		}
		100% {
			opacity: 0;
		}
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-12);
		background: radial-gradient(closest-side, color-mix(in srgb, var(--card) 80%, transparent), transparent);
		pointer-events: none;
	}

	.overlay > * {
		pointer-events: auto;
	}

	.result {
		margin: 0;
		font-size: var(--font-size-300);
		font-weight: var(--weight-medium);
	}

	.probe {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
	}

	@media (prefers-reduced-motion: reduce) {
		.banner {
			animation: none;
		}
	}
</style>
