import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

// The website address comes from content/business.yml (siteUrl)
const { siteUrl } = load(readFileSync(new URL('./content/business.yml', import.meta.url), 'utf8'));

// During preview (npm run dev): when a file in /content changes, reload the page
// so text and price edits show up straight away.
const reloadOnContentChange = {
  name: 'reload-on-content-change',
  configureServer(server) {
    const isContent = (file) => /[\\/]content[\\/][^\\/]+\.ya?ml$/.test(file);
    const reload = (file) => {
      if (!isContent(file)) return;
      for (const env of Object.values(server.environments ?? {})) env.moduleGraph?.invalidateAll?.();
      server.moduleGraph?.invalidateAll?.();
      server.ws.send({ type: 'full-reload' });
    };
    server.watcher.add(new URL('./content', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
    server.watcher.on('change', reload);
    server.watcher.on('add', reload);
  },
};

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  vite: { plugins: [reloadOnContentChange] },
  integrations: [
    sitemap({
      filter: (page) => /\/(lo|en|zh)\//.test(page),
      i18n: {
        defaultLocale: 'lo',
        locales: { lo: 'lo', en: 'en', zh: 'zh-Hans' },
      },
    }),
  ],
});
