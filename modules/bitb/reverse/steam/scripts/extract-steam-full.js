/* eslint-disable */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_KEY = 'store-steampowered-com-58735114';
const PAGE_KEY = 'login-7e93fba0';
const APP_ROOT = 'D:\\sites';

const screenshotDir = path.join(APP_ROOT, 'docs/design-references', SITE_KEY, PAGE_KEY);
const researchDir = path.join(APP_ROOT, 'docs/research', SITE_KEY, PAGE_KEY);
const assetDir = path.join(APP_ROOT, 'public/sites', SITE_KEY, PAGE_KEY, 'images');

for (const d of [screenshotDir, researchDir, assetDir]) {
  fs.mkdirSync(d, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) return resolve(null);
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', e => { fs.unlink(dest, () => {}); resolve(null); });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Desktop 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://store.steampowered.com/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: path.join(screenshotDir, 'desktop-1440.png'), fullPage: true });

  // Mobile 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, 'mobile-390.png'), fullPage: true });

  // Kembali ke desktop untuk ekstrak
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  // Ekstrak data komprehensif
  const data = await page.evaluate(() => {
    const getStyles = (el) => {
      if (!el) return {};
      const cs = window.getComputedStyle(el);
      const props = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
        'backgroundColor','background','padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
        'margin','width','height','maxWidth','display','flexDirection','justifyContent','alignItems','gap',
        'borderRadius','border','boxShadow','position','zIndex','opacity','transition','cursor',
        'textTransform','textDecoration'];
      const styles = {};
      props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'auto' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
      return styles;
    };

    // Temukan semua link rel=stylesheet
    const styleLinks = [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href);
    const fontLinks = [...document.querySelectorAll('link[href*="fonts"]')].map(l => l.href);

    // Ambil font dari computed
    const bodyFont = getComputedStyle(document.body).fontFamily;
    const headings = [...document.querySelectorAll('h1,h2,h3')].map(h => ({
      tag: h.tagName,
      text: h.textContent.trim().slice(0, 100),
      styles: getStyles(h)
    }));

    // Semua teks terlihat
    const allText = [...document.querySelectorAll('body *')]
      .filter(el => el.children.length === 0 && el.textContent.trim().length > 0 && el.textContent.trim().length < 300)
      .map(el => ({ tag: el.tagName, text: el.textContent.trim(), selector: el.className?.toString()?.split(' ')[0] || el.id }))
      .filter((v, i, a) => a.findIndex(x => x.text === v.text) === i)
      .slice(0, 80);

    // Aset gambar
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight
    }));

    // Background images
    const bgImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none' && bg.includes('url');
    }).map(el => ({
      url: getComputedStyle(el).backgroundImage,
      element: el.tagName + (el.className ? '.' + el.className.toString().split(' ')[0] : '')
    })).slice(0, 20);

    // Favicons
    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }));

    // Warna utama
    const colors = [...new Set([...document.querySelectorAll('*')]
      .flatMap(el => {
        const cs = window.getComputedStyle(el);
        return [cs.backgroundColor, cs.color, cs.borderColor];
      })
      .filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'rgb(0, 0, 0)' && c !== 'rgb(255, 255, 255)' && c !== 'transparent')
    )].slice(0, 30);

    // Struktur halaman: cari header, form, dll.
    const globalHeader = document.querySelector('#global_header') || document.querySelector('header') || document.querySelector('[class*="header"]');
    const subNav = document.querySelector('#store_nav') || document.querySelector('[class*="store_nav"]') || document.querySelector('[class*="subnav"]');
    const loginBox = document.querySelector('.newlogindialog') || document.querySelector('#login_twofactor_form') || document.querySelector('[class*="login"]') || document.querySelector('form');
    const footer = document.querySelector('#footer') || document.querySelector('footer') || document.querySelector('[class*="footer"]');

    // Input fields
    const inputs = [...document.querySelectorAll('input,textarea,select')].map(inp => ({
      type: inp.type,
      name: inp.name,
      id: inp.id,
      placeholder: inp.placeholder,
      className: inp.className.toString().slice(0, 100),
      styles: getStyles(inp)
    }));

    // Buttons
    const buttons = [...document.querySelectorAll('button,input[type=submit],[class*="btn"],[class*="button"]')].map(btn => ({
      text: btn.textContent?.trim()?.slice(0, 100),
      className: btn.className?.toString()?.slice(0, 100),
      styles: getStyles(btn)
    })).filter(b => b.text).slice(0, 20);

    return {
      title: document.title,
      url: location.href,
      bodyFont,
      fontLinks,
      styleLinks: styleLinks.slice(0, 5),
      headings,
      allText,
      images,
      bgImages,
      favicons,
      colors,
      inputs,
      buttons,
      headerHTML: globalHeader ? globalHeader.innerHTML.slice(0, 5000) : null,
      subNavHTML: subNav ? subNav.innerHTML.slice(0, 3000) : null,
      loginHTML: loginBox ? loginBox.innerHTML.slice(0, 5000) : null,
      footerHTML: footer ? footer.innerHTML.slice(0, 3000) : null,
      pageHTML: document.body.innerHTML.slice(0, 20000)
    };
  });

  fs.writeFileSync(path.join(researchDir, 'EXTRACTION.json'), JSON.stringify(data, null, 2));
  console.log('Judul halaman:', data.title);
  console.log('Font:', data.bodyFont);
  console.log('Jumlah teks:', data.allText.length);
  console.log('Jumlah input:', data.inputs.length);
  console.log('Jumlah button:', data.buttons.length);
  console.log('Jumlah gambar:', data.images.length);
  console.log('Background images:', data.bgImages.length);
  console.log('Favicon:', data.favicons.map(f => f.href).join(', '));

  // Download aset
  const toDownload = [];

  // Favicon
  for (const fav of data.favicons.slice(0, 3)) {
    if (fav.href) {
      const ext = fav.href.split('.').pop().split('?')[0] || 'ico';
      toDownload.push({ url: fav.href, dest: path.join(assetDir, `favicon.${ext}`) });
    }
  }

  // Gambar dari src
  for (let i = 0; i < Math.min(data.images.length, 8); i++) {
    const img = data.images[i];
    if (img.src && img.src.startsWith('http')) {
      const ext = img.src.split('.').pop().split('?')[0].slice(0, 5) || 'png';
      toDownload.push({ url: img.src, dest: path.join(assetDir, `img-${i}.${ext}`) });
    }
  }

  // Jalankan download paralel 4 sekaligus
  for (let i = 0; i < toDownload.length; i += 4) {
    const batch = toDownload.slice(i, i + 4);
    await Promise.all(batch.map(({ url, dest }) =>
      downloadFile(url, dest).then(() => console.log('Downloaded:', dest)).catch(() => {})
    ));
  }

  await browser.close();
  console.log('\nEkstraksi selesai. Lihat:', researchDir);
})();

