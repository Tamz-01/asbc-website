# Instructions for AI assistants editing this website

This is the ASBC website (Astro), in Lao (default), English and Chinese.
The test site is https://tamz-01.github.io/asbc-website/ and it updates automatically about
one minute after a change reaches the `main` branch.

## Rules

1. **This repository is public.** Everything committed, including comments in .yml files and
   commit messages, can be read by anyone. Never add private company documents, client names,
   tax numbers, passwords or personal data that is not already meant to be on the website.
   PDF, Word and Excel files are blocked by `.gitignore`; do not work around that.
2. **Changes go live without review.** The site owner has chosen not to approve each change.
   When the edit is done and the build passes, put it on `main`: push to `main` directly, or,
   if your tool can only push to its own branch, open a pull request and merge it straight away
   (no approval is needed). Never force-push, rewrite history or delete branches; the owner
   relies on the history to undo changes later.
3. **Run `npm run build` before the change reaches `main`** and make sure it finishes without
   errors. Because nobody reviews the change first, this check is the only safety net.
4. **Keep the three languages in step.** A change to prices or facts in `content/en.yml`
   normally needs the same change in `content/lo.yml` and `content/zh.yml`. If you cannot
   translate something reliably, say so in the pull request instead of guessing.
5. **Keep the change small** and do only what was asked, one topic per commit. Write the commit
   message in plain words saying what changed and on which pages (e.g. "Update Starter price
   on Services page, all languages"), so the owner can find and undo it later.

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
