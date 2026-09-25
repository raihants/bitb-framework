import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Desktop
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to PayPal Sign In (Desktop)...');
    await page.goto('https://www.paypal.com/id/signin', { waitUntil: 'networkidle2', timeout: 30000 });

    // Tunggu sesaat tambahan agar render sempurna
    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.screenshot({ path: 'docs/design-references/paypal-05303377/signin-a924339f/desktop.png', fullPage: true });

    // Mobile
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    console.log('Navigating to PayPal Sign In (Mobile)...');
    await mobilePage.goto('https://www.paypal.com/id/signin', { waitUntil: 'networkidle2', timeout: 30000 });

    await new Promise(resolve => setTimeout(resolve, 3000));
    await mobilePage.screenshot({ path: 'docs/design-references/paypal-05303377/signin-a924339f/mobile.png', fullPage: true });

    // Ekstraksi Gaya (Styles)
    const extractedData = await page.evaluate(() => {
      const fonts = new Set();
      const bgColors = new Set();
      const textColors = new Set();

      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.fontFamily) fonts.add(style.fontFamily);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
          bgColors.add(style.backgroundColor);
        }
        if (style.color) textColors.add(style.color);
      });

      return {
        fonts: Array.from(fonts),
        bgColors: Array.from(bgColors),
        textColors: Array.from(textColors)
      };
    });

    fs.writeFileSync('docs/research/paypal-05303377/signin-a924339f/extracted-styles.json', JSON.stringify(extractedData, null, 2));

    const domStructure = await page.evaluate(() => {
      return document.body.innerHTML;
    });
    fs.writeFileSync('docs/research/paypal-05303377/signin-a924339f/dom-sample.html', domStructure);

    console.log('Ekstraksi selesai.');
    await browser.close();
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    process.exit(1);
  }
})();
