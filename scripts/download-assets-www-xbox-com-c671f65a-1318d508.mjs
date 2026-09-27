import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  "https://logincdn.msauth.net/shared/5/images/fluent_web_dark_2_bf5f23287bc9f60c9be2.svg",
  "https://logincdn.msauth.net/shared/5/images/xbox_logo_white_cde084563e169a9848af.svg"
];

const outDir = path.join(process.cwd(), 'public/sites/www-xbox-com-c671f65a/en-us-auth-msa-1318d508/images');

async function download(url) {
  return new Promise((resolve, reject) => {
    const filename = url.split('/').pop().split('?')[0];
    const dest = path.join(outDir, filename);
    if (fs.existsSync(dest)) return resolve();

    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  for (const url of assets) {
    try {
      await download(url);
      console.log(`Downloaded ${url}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}

main();