import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
  "https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298dca608632101-70x70.jpeg",
  "https://static-cdn.jtvnw.net/jtv_user_pictures/ef28ba12-c8ed-46d4-838b-a4c95ef5b469-profile_image-70x70.png",
  "https://static-cdn.jtvnw.net/twilight-static-assets/avatar-dark-mode-hype-train-icon.svg",
  "https://static-cdn.jtvnw.net/jtv_user_pictures/7b533122-5bf3-4360-b98a-39fa8d2ed1ac-profile_image-70x70.png",
  "https://static-cdn.jtvnw.net/jtv_user_pictures/d86f9f1f-e346-47b9-8290-a2d980daf7e5-profile_image-70x70.png",
  "https://static-cdn.jtvnw.net/previews-ttv/live_user_caseoh_-640x360.jpg",
  "https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
  "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg",
  "https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg"
];

const dir = 'public/sites/twitch-7b268867/root-8a5edab2/images';

urls.forEach((url, i) => {
  const ext = path.extname(new URL(url).pathname) || '.png';
  const file = fs.createWriteStream(path.join(dir, `img_${i}${ext}`));
  https.get(url, response => {
    response.pipe(file);
  });
});
