# LoginCard + SiteFooter Spec

## Target files
- `src/components/sites/facebook-com-d98cded6/root-8a5edab2/LoginCard.tsx`
- `src/components/sites/facebook-com-d98cded6/root-8a5edab2/SiteFooter.tsx`
- `src/components/sites/facebook-com-d98cded6/root-8a5edab2/DisclaimerBanner.tsx`
- Screenshot: `docs/design-references/facebook-com-d98cded6/root-8a5edab2/fb-login-desktop-1440.png`
- Interaction model: **static** (hover + focus only).

## Exact computed values
- Page bg: `#ffffff`.
- FB logo: blue circle `#0866ff`/`#1877f2`, white "f" glyph. Render as inline SVG. ~size 48px.
- Heading "Log in to Facebook": 17px, weight 600, color `rgb(17,17,18)` (#111112), lineHeight 22px.
- Input pill box: border `1px solid rgb(102,106,114)` (#666a72), radius **16px**, height **60px**, padding `10px 16px`, width ~396px (card max-width). Placeholder text ~16px, color muted gray `#606770`.
- Blue "Log in" button: bg `rgb(0,100,224)` (#0064e0), radius **22px**, height **44px**, text 15px weight 500 color `#f2f4f6` (near-white), full width 396px. Hover bg ~`#0058c9`.
- "Forgotten password?" link: color `rgb(56,88,152)` (#385898), 12–14px, weight bold, centered.
- "Create new account" button: outlined, blue text `#385898`/`#0064e0`, border ~1px blue, radius 22px, transparent bg, centered.
- Meta wordmark: small "∞ Meta" grayscale, centered under create button.
- Gap between fields ~12px; card vertical rhythm ~12–16px.

## SiteFooter (verbatim text)
- Language row (active first): `English (UK)`, `Bahasa Indonesia`, `Basa Jawa`, `Bahasa Melayu`, `日本語`, `العربية`, `Français (France)`, `More languages…`
- Link grid: `Sign up`, `Log in`, `Messenger`, `Facebook Lite`, `Video`, `Meta Pay`, `Meta Store`, `Meta Quest`, `Ray-Ban Meta`, `Meta AI`, `Instagram`, `Threads`, `Privacy Policy`, `Privacy Centre`, `Meta in Indonesia`, `About`, `Create ad`, `Create Page`, `Developers`, `Careers`, `Cookies`, `AdChoices`, `Terms`, `Help`, `Contact uploading and non-users`
- Copyright: `Meta © 2025`
- Footer link color muted gray `#737373`/`#8a8d91`, 12px, hover underline. All `href="#"` (NON-navigasi — tidak ke domain FB, guardrail).
- Separator line above footer: 1px `#dadde1`.

## Font stack
FB proprietary "Optimistic" unavailable → CSS var `--fb-font: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`. (ponytail: proprietary font approximated, no upgrade needed for UI study.)

## Responsive
Same centered column desktop & mobile. Card `max-width: 396px`, `width: 100%`, horizontal padding on mobile. Footer flex-wrap.

## Guardrail
- `<form>` NO action, `onSubmit` preventDefault no-op.
- "Log in" `type="button"`, onClick → show local inline notice "Demo — tidak ada data yang dikirim." NO fetch/network.
- Password never read/stored.
