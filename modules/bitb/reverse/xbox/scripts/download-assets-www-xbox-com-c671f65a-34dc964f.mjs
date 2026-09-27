import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
  "https://uhf.microsoft.com/images/xbox/RW4ESm.png",
  "https://assets.xboxservices.com/assets/62/17/6217d767-2812-4f94-bcd0-9e3ccd977f45.jpg?n=XBOX-Live_Content-Placement-0_Connect_788x444.jpg",
  "https://cms-assets.xboxservices.com/assets/b2/0a/b20a4749-3552-483c-8aeb-b2cd16108fbb.jpg?n=XBOX-Live_Content-Placement-0_Manage-Profile_788x444.jpg",
  "https://assets.xboxservices.com/assets/75/f4/75f4db50-4fad-4eba-b346-a01d0ab53788.jpg?n=XBOX-Live_Content-Placement-0_Engage_788x444.jpg",
  "https://assets.xboxservices.com/assets/5e/4a/5e4acecc-b3e1-4124-9c93-3ab82b3150b4.jpg?n=XBOX-Live_Content-Placement-0_XBOX-Family-Settings_788x444.jpg",
  "https://cms-assets.xboxservices.com/assets/c2/bd/c2bdc214-7b42-4e24-82e6-7f027c220931.jpg?n=XBOX-Account_Super-Hero-1400_XGP_1920x1080.jpg",
  "https://cms-assets.xboxservices.com/assets/17/a9/17a9e373-43e8-4f4d-adc8-c34322a695bd.svg?n=XBOX-Account_Super-Hero-logo_XGP_390x48.svg",
  "https://cms-assets.xboxservices.com/assets/52/69/5269a1cc-8ca2-4fa5-939f-f34e127e9537.jpg?n=XBOX-Account_Image_768_1920x650.jpg",
  "https://cms-assets.xboxservices.com/assets/0a/ce/0ace56e1-1a0c-4ca7-91f3-f475d6eb12ac.jpg?n=XBOX-Account_Content-Placement-0_games_788x444.jpg",
  "https://assets.xboxservices.com/assets/b5/05/b5058ccd-7e0c-49b1-9e9f-fbce0ec8446c.jpg?n=XBOX-Live_Content-Placement-0_Earn-Rewards_788x444_02.jpg",
  "https://assets.xboxservices.com/assets/f8/67/f86740d7-eedd-4d9c-a963-76af7e36c4b2.svg?n=Xbox-Follow-Footer_Image-0_Mail_32x32_02.svg",
  "https://assets.xboxservices.com/assets/45/e3/45e3942b-7e08-4f7a-9e78-7b073d07118f.svg?n=Xbox-Follow-Footer_Image-0_Facebook_32x32_02.svg",
  "https://assets.xboxservices.com/assets/c9/71/c971845d-5e9d-4f26-8426-b71b9910b183.svg?n=Xbox-Follow-Footer_Image-0_X_32x32_02.svg",
  "https://assets.xboxservices.com/assets/21/a4/21a47e36-c00c-4fb0-bd18-bc72cfc41e5d.svg?n=Xbox-Follow-Footer_Image-0_Instagram_32x32_02.svg",
  "https://assets.xboxservices.com/assets/94/ca/94ca9c9a-22cf-4d0f-b76d-60cefb1f76b4.svg?n=Xbox-Follow-Footer_Image-0_Whatsapp_32x32_02.svg",
  "https://assets.xboxservices.com/assets/e9/38/e9389fa4-7e2f-4f25-860d-3ada8618dbda.svg?n=Xbox-Follow-Footer_Image-0_TikTok_32x32_02.svg",
  "https://assets.xboxservices.com/assets/48/8d/488d5ad9-d9fa-48dc-a0c8-020a35333edb.svg?n=Xbox-Follow-Footer_Image-0_YouTube_32x32_01.svg",
  "https://cms-assets.xboxservices.com/assets/67/27/67276182-bc71-4ac8-b4d4-17eaa2d6950e.svg?n=MWF-Xbox-Template-2025_LinkedIn-Dark.svg"
];

const outDir = path.join(process.cwd(), 'public/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images');

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