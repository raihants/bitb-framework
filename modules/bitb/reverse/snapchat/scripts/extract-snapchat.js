/* eslint-disable */
/* eslint-disable */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_KEY = 'accounts-snapchat-com-2f8a4c91';
const PAGE_KEY = 'v2-login-3d7f2b1e';
const APP_ROOT = 'D:\\snapchat';

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

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://accounts.snapchat.com/v2/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: path.join(screenshotDir, 'desktop-1440.png'), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, 'mobile-390.png'), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const getStyles = (el) => {
      if (!el) return {};
      const cs = window.getComputedStyle(el);
      const props = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
        'backgroundColor','background','padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
        'margin','marginTop','marginBottom','width','height','maxWidth','minHeight','display','flexDirection',
        'justifyContent','alignItems','gap','borderRadius','border','borderColor','borderWidth','boxShadow',
        'position','zIndex','opacity','transition','cursor','textTransform','textDecoration','textAlign'];
      const styles = {};
      props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'auto' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
      return styles;
    };

    const bodyFont = getComputedStyle(document.body).fontFamily;
    const bodyBg = getComputedStyle(document.body).backgroundColor;

    const headings = [...document.querySelectorAll('h1,h2,h3,h4')].map(h => ({
      tag: h.tagName,
      text: h.textContent.trim().slice(0, 200),
      styles: getStyles(h)
    }));

    const allText = [...document.querySelectorAll('body *')]
      .filter(el => el.children.length === 0 && el.textContent.trim().length > 0 && el.textContent.trim().length < 300)
      .map(el => ({ tag: el.tagName, text: el.textContent.trim(), className: el.className?.toString()?.slice(0, 80) }))
      .filter((v, i, a) => a.findIndex(x => x.text === v.text) === i)
      .slice(0, 100);

    const images = [...document.querySelectorAll('img,svg')].map(img => ({
      src: img.src || img.getAttribute('src') || '',
      alt: img.alt || img.getAttribute('alt') || '',
      outerHTML: img.outerHTML?.slice(0, 2000),
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height
    }));

    const bgImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none' && bg.includes('url');
    }).map(el => ({
      url: getComputedStyle(el).backgroundImage,
      element: el.tagName + (el.className ? '.' + el.className.toString().split(' ')[0] : ''),
      styles: getStyles(el)
    })).slice(0, 20);

    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }));
    const fontLinks = [...document.querySelectorAll('link[href*="font"]')].map(l => l.href);
    const styleLinks = [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href).slice(0, 10);

    const inputs = [...document.querySelectorAll('input,textarea,select')].map(inp => ({
      type: inp.type,
      name: inp.name,
      id: inp.id,
      placeholder: inp.placeholder,
      className: inp.className.toString().slice(0, 200),
      styles: getStyles(inp),
      labelText: inp.labels?.[0]?.textContent?.trim() || ''
    }));

    const buttons = [...document.querySelectorAll('button,[role=button],a[class*="btn"],a[class*="button"]')].map(btn => ({
      text: btn.textContent?.trim()?.slice(0, 200),
      className: btn.className?.toString()?.slice(0, 200),
      type: btn.getAttribute('type') || '',
      href: btn.href || '',
      styles: getStyles(btn),
      innerHTML: btn.innerHTML?.slice(0, 1000)
    })).filter(b => b.text).slice(0, 30);

    const links = [...document.querySelectorAll('a')].map(a => ({
      text: a.textContent?.trim()?.slice(0, 100),
      href: a.href,
      styles: getStyles(a)
    })).filter(l => l.text).slice(0, 30);

    const colors = [...new Set([...document.querySelectorAll('*')]
      .flatMap(el => {
        const cs = window.getComputedStyle(el);
        return [cs.backgroundColor, cs.color, cs.borderColor];
      })
      .filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent')
    )].slice(0, 40);

    const form = document.querySelector('form');
    const formHTML = form ? form.outerHTML.slice(0, 8000) : null;

    return {
      title: document.title,
      url: location.href,
      bodyFont,
      bodyBg,
      fontLinks,
      styleLinks,
      headings,
      allText,
      images,
      bgImages,
      favicons,
      colors,
      inputs,
      buttons,
      links,
      formHTML,
      pageHTML: document.body.innerHTML.slice(0, 30000)
    };
  });

  fs.writeFileSync(path.join(researchDir, 'EXTRACTION.json'), JSON.stringify(data, null, 2));
  console.log('Title:', data.title);
  console.log('Body font:', data.bodyFont);
  console.log('Body bg:', data.bodyBg);
  console.log('Texts:', data.allText.length);
  console.log('Inputs:', data.inputs.length);
  console.log('Buttons:', data.buttons.length);
  console.log('Images:', data.images.length);
  console.log('Favicons:', data.favicons.map(f => f.href).join(', '));

  const toDownload = [];
  for (const fav of data.favicons.slice(0, 3)) {
    if (fav.href) {
      const ext = fav.href.split('.').pop().split('?')[0] || 'ico';
      toDownload.push({ url: fav.href, dest: path.join(assetDir, `favicon.${ext}`) });
    }
  }
  for (let i = 0; i < Math.min(data.images.length, 10); i++) {
    const img = data.images[i];
    if (img.src && img.src.startsWith('http')) {
      const ext = img.src.split('.').pop().split('?')[0].slice(0, 5) || 'png';
      toDownload.push({ url: img.src, dest: path.join(assetDir, `img-${i}.${ext}`) });
    }
  }

  for (let i = 0; i < toDownload.length; i += 4) {
    const batch = toDownload.slice(i, i + 4);
    await Promise.all(batch.map(({ url, dest }) =>
      downloadFile(url, dest).then(() => console.log('Downloaded:', dest)).catch(() => {})
    ));
  }

  await browser.close();
  console.log('\nEkstraksi selesai:', researchDir);
})();


