# LoginCard Specification

## Overview
- **Target file:** `src/components/sites/login.yahoo.com/root/LoginCard.tsx`
- **Screenshot:** `docs/design-references/login.yahoo.com/root/yahoo-login-desktop-1440.png`
- **Interaction model:** click-driven / static

## DOM Structure
A centered or right-aligned white card container containing:
- Title (`h1`)
- Form with username input
- "Stay signed in" checkbox and "Forgot username" link
- "Next" submit button
- Divider ("or")
- "Sign in with Google" button
- "Create account" link

## Computed Styles (exact values from getComputedStyle)

### Container
- display: block
- padding: 32px
- maxWidth: 360px
- backgroundColor: #ffffff
- borderRadius: 8px
- boxShadow: 0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 12px 0 rgba(0,0,0,0.08)

### Title
- fontSize: 20px
- color: #26282a
- fontWeight: bold

### Input Field
- border: 1px solid #e0e4e9
- padding: 12px 16px
- borderRadius: 4px
- focus-within border color: #0f69ff

### Checkbox (Custom)
- border: 1px solid #0f69ff
- backgroundColor: #0f69ff
- borderRadius: 4px

### Next Button
- backgroundColor: #7e1fff
- color: #ffffff
- borderRadius: 20px
- padding: 14px
- fontWeight: 600

## States & Behaviors

### Hover states
- **Next Button:** backgroundColor: #7e1fff → #6001d2, transition: background-color 200ms
- **Google Button:** backgroundColor: #ffffff → #f0f3f5

## Assets
- Logo Desktop: `https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_w_bestfit_frontpage_2x.png`
- Logo Mobile: `https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png`
- GoogleIcon
- CheckIcon

## Text Content (verbatim)
- Sign in to Yahoo
- Username, email or phone number
- Stay signed in
- Forgot username
- Next
- or
- Sign in with Google
- Create account

## Responsive Behavior
- **Desktop (1440px):** Card is right-aligned (`justify-end` in flex container).
- **Mobile (390px):** Card takes full width, background becomes white, header logos swap.
