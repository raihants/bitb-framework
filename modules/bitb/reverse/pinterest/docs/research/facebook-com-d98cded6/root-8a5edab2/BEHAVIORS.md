# BEHAVIORS — Facebook Login

Interaction model: **STATIC page**. No scroll triggers, no JS-driven state changes, no tabs/carousels.

## Hover states
- Footer links: `text-decoration: underline` on hover, color stays.
- Language links: blue underline on hover.
- "Forgotten password?" / "Create new account": underline on hover.
- Blue "Log in" button: bg darkens (~rgb(0,90,200)) on hover.
- "Create new account" outlined button: light blue bg tint on hover.

## Focus states
- Inputs: border color darkens to near-black, box-shadow ring appears. Label (placeholder) floats up on filled/focus — FB uses floating label. Simplify: standard placeholder acceptable for UI study (ponytail: floating-label animation skipped, add when needed).

## Responsive
- Desktop 1440px & mobile 390px: **same centered single-column layout**. Card max-width ~396px. On mobile card spans width with padding. Footer link grid wraps naturally (flex-wrap). No layout switch — FB serves same responsive markup.

## Guardrail behaviors (added)
- "Log in" button: `type="button"`, no-op onClick showing local demo notice. NO network request.
- Form has NO action/method. Password value never read.
