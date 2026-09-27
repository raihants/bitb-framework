// Asset download script for Sony sign‑in page
// Runs in Node (ESM). Downloads favicons and external images to the namespaced public folder.
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

const assetRoot = 'public/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images';
fs.mkdirSync(assetRoot, { recursive: true });

const assets = [
  // Favicons
  { url: 'https://my.account.sony.com/sonyacct/signin/dsb_signin_27478/assets/icons/appleicon.png', filename: 'appleicon.png' },
  { url: 'https://my.account.sony.com/sonyacct/signin/dsb_signin_27478/assets/icons/sony_small.ico', filename: 'sony_small.ico' },
  // Images
  { url: 'https://my.account.sony.com/sonyacct/signin/dsb_signin_27478/assets/images/background_dark.jpg', filename: 'background_dark.jpg' },
  { url: 'https://my.account.sony.com/sonyacct/signin/dsb_signin_27478/assets/images/playstationfamilymark_dark.svg', filename: 'playstationfamilymark_dark.svg' }
];

function download({url, filename}) {
  return new Promise((resolve, reject) => {
    const dest = `${assetRoot}/${filename}`;
    const client = url.startsWith('https') ? https : http;
    client.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', err => reject(err));
  });
}

(async () => {
  console.log('Downloading assets...');
  for (const a of assets) {
    try {
      const path = await download(a);
      console.log(`Saved ${a.filename} → ${path}`);
    } catch (e) {
      console.error('Error downloading', a.url, e.message);
    }
  }
  console.log('Done');
})();
