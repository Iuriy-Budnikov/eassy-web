# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Vite dev server (npm run dev -- --open to open a browser)
npm run check        # svelte-check — the only correctness gate in this repo
npm run check:watch  # same, in watch mode
npm run build        # production build → .svelte-kit/cloudflare/
npm run preview      # build, then serve via `wrangler dev` (real Workers runtime)
npm run deploy       # build, then `wrangler deploy` (uses local wrangler credentials)
npm run cf-typegen   # regenerate worker-configuration.d.ts from wrangler.jsonc
```

There is no test runner, linter, or formatter installed — `npm run check` is the
only automated check. Do not assume `npm test` exists.

`.npmrc` sets `engine-strict=true`.

## Git conventions

Commit messages are a single sentence — no body, no bullet list.

Do not add a `Co-Authored-By:` trailer (or any other trailer) to commits.

## Architecture

Minimal SvelteKit app (Svelte 5, SvelteKit 2, Vite 8, TypeScript) scaffolded with
the `sv` CLI, targeting Cloudflare Workers.

**There is no `svelte.config.js`.** This version of `@sveltejs/vite-plugin-svelte`
takes the Svelte and SvelteKit config inline in `vite.config.ts`, via the
`sveltekit({ ... })` plugin call. Adapter and compiler options live there — look
there before creating a config file that the toolchain will ignore.

`vite.config.ts` forces **runes mode** on for every file outside `node_modules`.
Write Svelte 5 runes (`$props()`, `$state()`, …); legacy `export let` and
reactive `$:` statements will not work in this project's own components.

### Cloudflare Workers

`@sveltejs/adapter-cloudflare` builds to `.svelte-kit/cloudflare/`, producing
`_worker.js` plus static assets. `wrangler.jsonc` points `main` and the `ASSETS`
binding at that directory, so **`wrangler deploy` only works after a build** —
a deploy against a clean checkout with no build step uploads nothing.

`nodejs_compat` is enabled and `compatibility_date` is pinned; changing either
means rerunning `npm run cf-typegen`, which rewrites the generated
`worker-configuration.d.ts` (committed). `src/app.d.ts` wires that generated
`Env` into `App.Platform`, so `event.platform.env` is typed inside load
functions and endpoints.

### Deployment

Deploys run through **Cloudflare Workers Builds** — the repo is connected in the
Cloudflare dashboard and builds on push to `main`. There is no CI in the repo; a
GitHub Actions workflow existed briefly and was removed in favour of this. The
dashboard is configured with build command `npm run build` and deploy command
`npx wrangler deploy`.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
