# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/sony-com-abcdef12/root-1234abcd/HeroSection.tsx`
- **Screenshot:** `docs/design-references/sony-com-abcdef12/root-1234abcd/hero-section.png`
- **Interaction model:** scroll-driven

## DOM Structure
```html
<section class="hero">
  <div class="content">
    <h1>...</h1>
    <p>...</p>
    <button>...</button>
  </div>
  <img src="..." alt="..." />
</section>
```

## Computed Styles (exact values)
### Container
- display: flex
- flex-direction: column
- align-items: center
- padding: 64px 16px
- background-color: #f5f5f5

### Heading
- font-size: 48px
- font-weight: 700
- color: #111111

### Button
- background-color: #0066ff
- color: #ffffff
- border-radius: 8px
- padding: 12px 24px
- transition: background-color 0.3s ease

## States & Behaviors
### Scroll-triggered fade-in
- **Trigger:** scroll position > 100px
- **State A (before):** opacity: 0, transform: translateY(20px)
- **State B (after):** opacity: 1, transform: translateY(0)
- **Transition:** opacity 0.5s ease, transform 0.5s ease

## Assets
- Background image: `public/sites/sony-com-abcdef12/root-1234abcd/images/hero-bg.webp`
- Icon: `SearchIcon` from shared icons module

## Text Content (verbatim)
"Welcome to Sony Account"
"Sign in to access your personalized services."

## Responsive Behavior
- **Desktop (1440px):** two‑column layout, image right of text
- **Tablet (768px):** image below text, reduced padding 32px
- **Mobile (390px):** stacked, full‑width image, heading font-size 32px
- **Breakpoint:** layout switches at ~1024px
