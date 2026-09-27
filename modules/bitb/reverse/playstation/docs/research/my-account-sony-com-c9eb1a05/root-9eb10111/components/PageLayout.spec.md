# PageLayout Specification

## Overview
- **Target file:** `src/app/page.tsx`
- **Screenshot:** `docs/design-references/my-account-sony-com-c9eb1a05/root-9eb10111/login-full-desktop.png`
- **Interaction model:** static layout

## DOM Structure
A full-screen layout containing:
- A fixed background image (`background_dark.jpg`)
- A header bar at the top (black, height 36px) containing a "Sony" logo on the right.
- A main content area centered horizontally and vertically.
- Inside the main content:
  - A PlayStation logo (`playstationfamilymark_dark.svg`) positioned above the login form.
  - The `LoginForm` component.
  - A footer link "Help/Site Map" at the bottom.

## Computed Styles

### Layout Wrapper
- backgroundColor: rgb(9, 10, 10)
- minHeight: 100vh
- display: flex
- flexDirection: column
- position: relative
- overflow: hidden

### Background Image
- position: absolute
- top: 0, left: 0, right: 0, bottom: 0
- objectFit: cover
- zIndex: 0
- filter: there is a radial gradient overlay `radial-gradient(at 70vw 0%, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0) 70vw)`

### Header
- backgroundColor: rgb(0, 0, 0)
- height: 36px
- display: flex
- justifyContent: flex-end
- alignItems: center
- zIndex: 10
- position: relative

### Main Content Area
- display: flex
- flexDirection: column
- alignItems: center
- flex: 1
- zIndex: 10
- position: relative
- marginTop: 80px (approximate, to center the form)

### PlayStation Logo Area
- width: 160px
- height: 160px
- marginBottom: 24px

### Footer Link ("Help/Site Map")
- color: rgb(36, 156, 255)
- fontSize: 16px
- marginTop: 40px
- marginBottom: 12px

## Assets
- Background: `public/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/background_dark.jpg`
- PlayStation Logo: `public/sites/my-account-sony-com-c9eb1a05/root-9eb10111/images/playstationfamilymark_dark.svg`
- Sony Logo (Header): We can use an SVG or text, but the original uses an SVG. We will build a simple SVG or text placeholder if we don't have it.

## Responsive Behavior
- Background covers the whole screen.
- Form and logo stay centered.