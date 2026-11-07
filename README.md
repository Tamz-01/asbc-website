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

Each language has the same five pages: home, `services/`, `about/`, `insights/`, `contact/`.
Example for Facebook posts: `https://YOUR-DOMAIN/en/services/`

---

## 1. Preview the website on your computer

1. Open this `website` folder in a terminal (or ask Claude to "start the preview").
2. Run:
   ```
   npm run dev
   ```
3. Open **http://localhost:4321** in your browser. Changes you save appear immediately.
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
| `content/videos.yml` | Insights videos |

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

## 3. Add a CFO Board Briefing video

1. Open `content/videos.yml`.
2. Copy the example block at the top, paste it **under** the line `videos:`, and remove the `#` at the start of each line.
3. Paste the Facebook or YouTube link after `url:`, fill in the date and the titles.
4. Put the newest video at the top.

```yaml
videos:
  - url: "https://www.youtube.com/watch?v=abc123XYZ"
    date: "2026-11-01"
    company: "EDL-Gen"
    title:
      lo: "ສະຫຼຸບບົດລາຍງານການເງິນ ປີ 2025"
      en: "2025 financial statements explained"
      zh: "2025年财务报表解读"
```

The video player appears automatically on the Insights page in all three languages, with the
"For education only, not investment advice" line.
For a Facebook video, the post must be **public** or it won't play on the website.

---

## 4. Put changes online (after the site is deployed)

Once the site is connected to GitHub and Cloudflare Pages, every change you save to GitHub goes
live automatically in about one minute:

1. Open **GitHub Desktop**. It lists the files you changed.
2. Type a short note (e.g. "Update prices") and click **Commit to main**.
3. Click **Push origin**.
4. Wait about one minute, then refresh the website.

If the website does not update, open the Cloudflare Pages dashboard → your project → **Deployments**
to see the error message (usually a missing quote or wrong spacing in a .yml file).

---

## 5. Before going live: checklist

- [ ] All `[PRICE]`, `[HOURS]`, `[FACEBOOK PAGE URL]`, `[MAPS LINK]` filled in
- [ ] `hoursMachine` in `business.yml` filled in (e.g. `Mo-Fr 08:00-17:00`) for Google
- [ ] Chinese text checked by a fluent speaker; remove the `TODO` note in `src/components/ZhCheck.astro`
- [ ] Licence number and MOF notice scan added
- [ ] Company name updated if the change to "Co., Ltd" is approved
- [ ] `siteUrl` in `business.yml` changed to your real domain

---

## For technical help

- Built with [Astro](https://astro.build). Pages are in `src/pages/[lang]/`, the shared frame (header,
  footer, Google/Facebook tags) is `src/layouts/Base.astro`, colours are at the top of `src/styles/global.css`.
- `npm run build` creates the finished website in `dist/`. Cloudflare Pages settings:
  build command `npm run build`, output folder `dist`.
- To regenerate the logo, browser icon and Facebook share image from `../company data/logo.png`
  (the private folder next to this one): `node scripts/make-images.mjs`
- When setting up Cloudflare Pages, the repository root is this `website` folder, so no
  "root directory" setting is needed.
