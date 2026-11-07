// Makes the small website images from the original logo.
// The original is in "company data", which sits NEXT TO this website folder
// (kept outside on purpose so it is never uploaded to GitHub).
// Run from inside the website folder with:  node scripts/make-images.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const src = '../company data/logo.png';
mkdirSync('public/images', { recursive: true });

// Header logo (small, sharp on phones)
await sharp(src).resize({ width: 240 }).png({ compressionLevel: 9, palette: true }).toFile('public/images/logo.png');

// Square icons: logo centred on white
const square = async (size, file) => {
  const logo = await sharp(src).resize({ width: Math.round(size * 0.9) }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: logo, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toFile(file);
};
await square(64, 'public/favicon.png');
await square(180, 'public/apple-touch-icon.png');

// Facebook / social share image, 1200 x 630
const logo = await sharp(src).resize({ width: 420 }).toBuffer();
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#faf8f3"/>
  <rect width="1200" height="14" fill="#0e5132"/>
  <rect y="616" width="1200" height="14" fill="#b8862b"/>
  <text x="600" y="400" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="700" fill="#0e5132">Audit · Accounting · Tax</text>
  <text x="600" y="462" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#4d5a52">Vientiane, Lao PDR · since 2009</text>
  <rect x="270" y="505" width="660" height="62" rx="10" fill="#f3e9d2"/>
  <text x="600" y="546" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#6b4e12">Approved by the Ministry of Finance · List No. 89</text>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 70, left: 390 }])
  .png({ compressionLevel: 9 })
  .toFile('public/images/og-image.png');

console.log('Images created in public/');
