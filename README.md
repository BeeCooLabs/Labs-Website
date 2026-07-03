# BeeCooLabs — Public Website

The first public website for **BeeCooLabs** — a privacy-first product lab building focused
domain super apps for everyday life.

Static Astro site, no backend, no tracking, ready for **Cloudflare Pages**.

## Run locally

```bash
npm install
npm run dev        # dev server at http://localhost:4321
```

Production build:

```bash
npm run build      # static output in dist/
npm run preview    # serve the built site locally
```

## Deploy to Cloudflare Pages

The site is deployed as a Cloudflare **Pages** project (`labs-website`) via the Wrangler CLI.

**Live:** https://labs-website-1x7.pages.dev

### Deploy an update

```bash
npm run build                                              # rebuild dist/
npx wrangler pages deploy dist --project-name=labs-website # upload to Pages
```

(First-time only: `npx wrangler login` to authenticate. On Windows PowerShell, use
`npx.cmd` if script execution is blocked.)

This is a **direct-upload** project, so it does **not** auto-deploy on `git push` — run the
command above after changes. To switch to automatic deploys on push, either connect a
Git-linked Pages project in the dashboard, or add a GitHub Actions workflow that runs
`wrangler pages deploy` (needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets).

`public/_headers` ships security headers and long-lived caching for hashed assets.

### Custom domain

Add `beecoolabs.com` under the Pages project → **Custom domains**. Then the canonical URL,
sitemap and OG images (already pointing at `https://beecoolabs.com` via `astro.config.mjs`)
line up with the live domain.

## Project layout

```
src/
  layouts/BaseLayout.astro   # <head>: SEO, Open Graph, Twitter, JSON-LD
  pages/index.astro          # composes the five homepage sections
  components/                # Nav, Hero, IdeasFromLab, WhyBeeCooLabs, Roadmap, IdeaForm, Footer
  data/                      # editable content: idea cards, principles, roadmap, sample ideas
  styles/global.css          # design tokens (palette, type, shape, motion) + base styles
  scripts/motion.ts          # scroll reveal, parallax, nav, form + vote preview handlers
public/                      # favicon, og-cover.png, robots.txt, manifest, _headers
```

### Editing content

All homepage content lives in `src/data/*.ts` — add/edit idea cards, roadmap items,
principles or sample ideas there without touching any markup.

## After the final domain is confirmed

Everything derives from one value — `site` in `astro.config.mjs` (currently
`https://beecoolabs.com`). If the domain changes, update it there and rebuild; canonical URL,
sitemap and absolute OG/Twitter image URLs all follow. Also update the `Sitemap:` line in
`public/robots.txt`.

Then submit the site to:

- **Google Search Console** — verify the domain, submit `/sitemap-index.xml`
- **Bing Webmaster Tools** — same sitemap URL

## Future backend hooks (not built yet, by design)

- **Idea capture** — `src/scripts/motion.ts` has a marked `FUTURE BACKEND HOOK` in the form
  handler; swap the confirmation for a `fetch('/api/ideas', …)` to a Pages Function / Worker
  (D1 or KV storage).
- **Voting / suggestions** — the "People are already suggesting" chips in
  `src/components/IdeaForm.astro` are illustrative (data in `src/data/sampleIdeas.ts`);
  replace with live community submissions and voting later.
- **Dynamic content** — `src/data/*.ts` arrays can be replaced by build-time or runtime
  fetches from D1/KV/a small CMS while keeping every component unchanged.
- **New projects/pages** — add `src/pages/*.astro` files; the sitemap regenerates
  automatically at build.
