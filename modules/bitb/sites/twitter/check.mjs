import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('./style.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('./script.js', import.meta.url), 'utf8');

for (const text of ["See what's happening", 'Continue with phone', 'Continue with Google', 'Continue with Apple', 'Email or username']) {
  assert.ok(html.includes(text), `Missing: ${text}`);
}
assert.match(html, /id="continue"[^>]*disabled/);
assert.match(html, /class="logo phone-logo"/);
assert.match(html, /id="country-picker"[^>]*aria-haspopup="listbox"/);
assert.match(html, /id="country-search"[^>]*placeholder="Search"/);
assert.match(html, /<option value="\+62">🇮🇩 \+62 Indonesia<\/option>/);
assert.match(html, /Connect with friends you know/);
assert.match(html, /Let people find your account by your phone number or email/);
assert.match(js, /countrySearch\.addEventListener\('input'/);
assert.match(js, /privacyTrigger\.addEventListener\('click'/);
assert.match(css, /@media\(max-width:700px\)/);
assert.match(js, /event\.preventDefault\(\)/);
assert.match(js, /requires the original service/);
console.log('Static login checks passed');
