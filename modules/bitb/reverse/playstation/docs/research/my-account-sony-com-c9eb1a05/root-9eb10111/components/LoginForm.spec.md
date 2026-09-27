# LoginForm Specification

## Overview
- **Target file:** `src/components/sites/my-account-sony-com-c9eb1a05/root-9eb10111/LoginForm.tsx`
- **Screenshot:** `docs/design-references/my-account-sony-com-c9eb1a05/root-9eb10111/login-full-desktop.png`
- **Interaction model:** click-driven (form submission)

## DOM Structure
A login container with a dark semi-transparent background containing:
- `h1`: "Sign in to PlayStation"
- A form with:
  - `label`: "Sign-In ID (Email Address)"
  - `input`: type email
  - `button`: "Next" (primary)
- Two links: "About Sony Account" and "Trouble Signing In?"
- A bottom button: "Create an Account" (secondary)

## Computed Styles (exact values from getComputedStyle)

### Container (the dark box)
- backgroundColor: rgba(0, 0, 0, 0.9)
- width: 100% (max-width 488px on desktop)
- padding: 40px (implied by spacing, let's use appropriate spacing)
- display: flex
- flexDirection: column

### h1
- color: rgb(255, 255, 255)
- fontSize: 26px
- fontWeight: 300
- fontFamily: sst, helvetica, arial, sans-serif
- margin: 0px 0px 24px
- lineHeight: 32.5px

### label
- color: rgb(255, 255, 255)
- fontSize: 16px
- fontWeight: 400
- fontFamily: sst, helvetica, arial, sans-serif
- padding: 0px 0px 4px
- height: 24px
- lineHeight: 20px

### inputBox (wrapper around input)
- border: 1px solid rgb(178, 178, 178)
- borderRadius: 6px
- height: 50px
- backgroundColor: transparent

### input (type email)
- color: rgb(255, 255, 255)
- backgroundColor: transparent
- fontSize: 16px
- padding: 12px 8px 12px 16px
- height: 48px
- width: 100%
- outline: none

### primaryBtn ("Next")
- color: rgb(0, 0, 0)
- backgroundColor: rgb(117, 117, 117) (Note: disabled state. Active state would be different, but match this for now)
- fontSize: 16px
- fontWeight: 700
- border: 0px solid rgb(0, 0, 0)
- borderRadius: 999px
- padding: 0px 12px
- margin: 16px 0px 0px
- height: 40px
- lineHeight: 20px
- width: 100%

### secondaryBtn ("Create an Account")
- color: rgb(255, 255, 255)
- backgroundColor: rgba(255, 255, 255, 0.14)
- fontSize: 16px
- fontWeight: 700
- border: 1px solid rgba(255, 255, 255, 0.8)
- borderRadius: 999px
- padding: 0px 12px
- height: 40px
- width: 100%

### link
- color: rgb(36, 156, 255)
- fontSize: 16px
- textDecoration: none
- hover textDecoration: underline

## States & Behaviors
- **Hover on link:** text-decoration changes to underline.
- **Input Focus:** border color changes to focus color (typical blue/white).

## Assets
- No external images for the form itself.

## Text Content (verbatim)
"Sign in to PlayStation"
"Sign-In ID (Email Address)"
"Next"
"About Sony Account"
"Trouble Signing In?"
"Create an Account"

## Responsive Behavior
- **Desktop (1440px):** Form container is 488px wide.
- **Mobile (390px):** Form container takes 100% width.