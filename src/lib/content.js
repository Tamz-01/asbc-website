// Reads the text files in /content so pages can use them.
// You should not need to edit this file: change the .yml files instead.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';

const read = (name) => load(readFileSync(join(process.cwd(), 'content', name), 'utf8'));

export const business = read('business.yml');

export const LANGS = ['lo', 'en', 'zh'];
export const DEFAULT_LANG = 'lo';

// HTML lang attribute, hreflang and Open Graph locale for each language
export const LOCALE = {
  lo: { html: 'lo', hreflang: 'lo', og: 'lo_LA', intl: 'lo-LA' },
  en: { html: 'en', hreflang: 'en', og: 'en_US', intl: 'en-GB' },
  zh: { html: 'zh-Hans', hreflang: 'zh-Hans', og: 'zh_CN', intl: 'zh-CN' },
};

const texts = Object.fromEntries(LANGS.map((l) => [l, read(`${l}.yml`)]));
export const t = (lang) => texts[lang];

export const PAGES = ['', 'services', 'about', 'library', 'contact'];

// The part of siteUrl after the domain: "/asbc-website" on GitHub Pages, "" on a plain domain.
const basePath = new URL(business.siteUrl).pathname.replace(/\/$/, '');
export const siteOrigin = new URL(business.siteUrl).origin;
export const pageUrl = (lang, page = '') => `${basePath}/${lang}/${page ? page + '/' : ''}`;
// Address of a file in the public folder, e.g. asset('/images/logo.png')
export const asset = (path) => basePath + path;

export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));

// A value still in [SQUARE BRACKETS] has not been filled in yet
export const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim());

export const whatsappLink = (text) =>
  `https://wa.me/${business.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;

export const telLink = () => `tel:+${business.whatsapp}`;

export function formatDate(date, lang) {
  if (!date) return '';
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return String(date);
  return new Intl.DateTimeFormat(LOCALE[lang].intl, { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}
