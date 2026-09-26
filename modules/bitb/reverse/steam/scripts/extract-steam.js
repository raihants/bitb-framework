/* eslint-disable */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Route ke Steam login
  await page.goto('https://store.steampowered.com/login', { waitUntil: 'networkidle' });

  // Tunggu UI form login React muncul
  try {
    await page.waitForSelector('form, .newlogindialog_Panel_1W3R3', { timeout: 10000 });
  } catch (e) {
    console.log('Login form tidak muncul otomatis, pakai yang ada.');
  }

  // Ambil screenshot
  const outDir = path.join(__dirname, 'docs/design-references/store-steampowered-com-58735114/login-7e93fba0');
  fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, 'desktop.png'), fullPage: true });

  const result = await page.evaluate(() => {
    const images = [...document.querySelectorAll('img')].map(img => img.src);
    const fonts = [...new Set([...document.querySelectorAll('*')].map(el => getComputedStyle(el).fontFamily))];
    const colors = [...new Set([...document.querySelectorAll('*')].map(el => getComputedStyle(el).backgroundColor).filter(c => c !== 'rgba(0, 0, 0, 0)'))];

    return {
      html: document.body.innerHTML,
      fonts,
      colors,
      images: [...new Set(images)]
    };
  });

  const resDir = path.join(__dirname, 'docs/research/store-steampowered-com-58735114/login-7e93fba0');
  fs.mkdirSync(resDir, { recursive: true });
  fs.writeFileSync(path.join(resDir, 'EXTRACTION.json'), JSON.stringify(result, null, 2));

  await browser.close();
})();

