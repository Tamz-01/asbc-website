# ASBC website — how to use it

The ASBC website in Lao (default), English and Chinese. You only need to edit the files in the
**`content`** folder. Everything else builds itself.

**Folder layout.** This `website` folder is the only thing uploaded to GitHub. The `company data`
folder next to it (company profile PDF, original logo) stays on your computer and is never uploaded.
Don't move private documents into this `website` folder.

```
ASBC Website/
├── company data/   private, never uploaded
└── website/        this folder: the website (goes to GitHub)
```

| Address | Language |
|---|---|
| `/lo/` | Lao (the bare domain sends visitors here) |
| `/en/` | English |
| `/zh/` | Chinese |

Each language has the same five pages: home, `services/`, `about/`, `library/`, `contact/`.
Example for Facebook posts: `https://YOUR-DOMAIN/en/services/`

---

## 1. Preview the website on your computer

1. Open this `website` folder in a terminal (or ask Claude to "start the preview").
2. Run:
   ```
   npm run dev
   ```
3. Open **http://localhost:4321/asbc-website/** in your browser. Changes you save appear immediately.
4. Press `Ctrl + C` in the terminal to stop.

The first time on a new computer, run `npm install` once before step 2.

---

## 2. Change text and prices

All words are in these files. Open them with Notepad or VS Code:

| File | What is in it |
|---|---|
| `content/lo.yml` | All Lao text and prices |
| `content/en.yml` | All English text and prices |
| `content/zh.yml` | All Chinese text and prices |
| `content/business.yml` | Company name, phone, WhatsApp, email, Facebook, map link, hours, Ministry of Finance notice and licence number (shared by all languages) |

**Rules for editing .yml files**
- Only change the words **inside the quotes** `"like this"`.
- Don't change the word before the colon (`price:`, `title:` …). The website uses it to find the text.
- Keep the spaces at the start of each line exactly as they are. Use spaces, not Tab.
- If your text contains a `"`, use `“ ”` instead.
- Lines starting with `#` are notes for you. They don't appear on the website.

**Prices.** Search for `[PRICE]` in each language file and replace it, e.g. `price: "1,500,000 LAK / month"`.
Remember to change all three language files.

**Ministry of Finance notice scan.** Save it as a JPG or PNG (under 500 KB), put it in `public/images/`
and write its name in `business.yml` → `scanImage:`, e.g. `scanImage: "mof-notice-2906.jpg"`.

**Licence number.** When ready, replace `[LICENCE NO.]` in `business.yml` → `licenceNo:`.
It then appears automatically on the About page in all three languages.

**Company name.** When the change to "Co., Ltd" is approved, follow the note at the top of `business.yml`.

---

**Library page.** Its heading, introduction and "coming soon" text are under `library:` in each
language file. The list of documents will be added later.

---

## 3. Put changes online

The test site is at **https://tamz-01.github.io/asbc-website/**, published by GitHub Pages.
Anyone with this address can open it. Every change you save to GitHub goes live automatically
in about one minute:

1. Open **GitHub Desktop**. It lists the files you changed.
2. Type a short note (e.g. "Update prices") and click **Commit to main**.
3. Click **Push origin**.
4. Wait about one minute, then refresh the website.

If the website does not update, open the **Actions** tab of the repository on GitHub to see the
error message (usually a missing quote or wrong spacing in a .yml file).

### Changes made by someone else (for example a friend using AI)

People you invite as collaborators publish **without your approval**: their changes go live
about one minute after they finish. Every change is kept in the history, and nobody can erase
that history, so you can always look back and undo.

**See what changed:** open the repository on GitHub and click the **commits** link (the clock
icon above the file list). Click a change to see exactly what changed (red = removed,
green = added). Changes made through a pull request are also listed under **Pull requests** →
**Closed**.

**Undo a change you don't like:**
- *Easiest:* tell Claude "undo the change about …" and it will reverse it.
- *By yourself:* in GitHub Desktop open **History**, right-click the change → **Revert changes in
  commit**, then **Push origin**. For a merged pull request you can also click **Revert** on the
  pull request page on GitHub.

If a change breaks the website, the site simply stays on the last working version; the
**Actions** tab shows the error.

AI tools read `CLAUDE.md` in this folder for the rules they must follow.

---

## 4. Before going live: checklist

- [ ] All `[PRICE]`, `[HOURS]`, `[FACEBOOK PAGE URL]`, `[MAPS LINK]` filled in
- [ ] `hoursMachine` in `business.yml` filled in (e.g. `Mo-Fr 08:00-17:00`) for Google
- [ ] Chinese text checked by a fluent speaker; remove the `TODO` note in `src/components/ZhCheck.astro`
- [ ] Licence number and MOF notice scan added
- [ ] Company name updated if the change to "Co., Ltd" is approved
- [ ] `siteUrl` in `business.yml` changed to your real domain
- [ ] `testSite` in `business.yml` changed to `false`, so Google can list the site

---

## For technical help

- Built with [Astro](https://astro.build). Pages are in `src/pages/[lang]/`, the shared frame (header,
  footer, Google/Facebook tags) is `src/layouts/Base.astro`, colours are at the top of `src/styles/global.css`.
- `npm run build` creates the finished website in `dist/`. Publishing is done by
  `.github/workflows/deploy.yml`.
- To regenerate the logo, browser icon and Facebook share image from `../company data/logo.png`
  (the private folder next to this one): `node scripts/make-images.mjs`
