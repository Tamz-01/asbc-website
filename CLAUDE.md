# Instructions for AI assistants editing this website

This is the ASBC website (Astro), in Lao (default), English and Chinese.
The test site is https://tamz-01.github.io/asbc-website/ and it updates automatically about
one minute after a change reaches the `main` branch.

## Rules

1. **This repository is public.** Everything committed, including comments in .yml files and
   commit messages, can be read by anyone. Never add private company documents, client names,
   tax numbers, passwords or personal data that is not already meant to be on the website.
   PDF, Word and Excel files are blocked by `.gitignore`; do not work around that.
2. **Never push to `main`.** Work on a new branch and open a pull request. The site owner
   reviews and merges it. `main` is protected, so a direct push will be refused.
3. **Run `npm run build` before opening the pull request** and make sure it finishes without
   errors. A broken build means the site does not update.
4. **Keep the three languages in step.** A change to prices or facts in `content/en.yml`
   normally needs the same change in `content/lo.yml` and `content/zh.yml`. If you cannot
   translate something reliably, say so in the pull request instead of guessing.
5. **Keep the change small** and do only what was asked. Describe in the pull request, in plain
   words, what changed and on which pages.

## Where things are

| What | File |
|---|---|
| All page text and prices | `content/lo.yml`, `content/en.yml`, `content/zh.yml` |
| Company name, phone, email, address, licence | `content/business.yml` |
| Insights videos | `content/videos.yml` |
| Page layouts | `src/pages/[lang]/*.astro` |
| Header, footer, page frame | `src/layouts/Base.astro` |
| Colours and styles | `src/styles/global.css` |
| Images | `public/images/` (keep each under 500 KB) |

`README.md` explains the .yml editing rules. Follow them: change only the text inside the
quotes, keep the indentation, use spaces not tabs.

## Technical notes

- Links must use `pageUrl()` and `asset()` from `src/lib/content.js`, never a hard-coded
  `/lo/...` or `/images/...`. The site lives under `/asbc-website/` and these helpers add that.
- Preview with `npm install` (first time) and `npm run dev`, then open
  http://localhost:4321/asbc-website/
- Chinese text has not yet been checked by a fluent speaker (see the `TODO` notes); do not
  remove those notes.
- `scripts/make-images.mjs` needs a private folder that is not in this repository. Do not run it.
