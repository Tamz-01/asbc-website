import { business } from '../lib/content.js';

export function GET() {
  const site = business.siteUrl.replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
