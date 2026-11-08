# omachrome.com Website Plan

## Project Overview
A minimal, beautiful static marketing website for the omachrome iOS app - a tool for storing and uploading color recipes to OM-3 cameras without a computer.

**Tech Stack**: Plain HTML/CSS/JavaScript (no build step)
**Hosting**: GitHub Pages
**Domain**: omachrome.com

---

## Design System

### Colors
- **Primary Accent**: #6155F5 (Purple - used for links, buttons, highlights)
- **Background**: White (light mode default)
- **Text**: Dark gray/black for readability
- **Logo**: Light and dark mode variants (provided)

### Typography
- Minimalist, beautiful typography emphasis
- Focus on clean, modern sans-serif (system fonts preferred for performance)
- Clear hierarchy with generous whitespace

### Logo
- Use provided logo (light version for dark backgrounds, dark version for light backgrounds)
- Toggle based on section/context

---

## Information Architecture

### Pages
1. **Home** (`index.html`)
   - Header with logo + nav
   - Hero section with tagline
   - Feature showcase (3-4 key features from app)
   - Primary CTA: "Download on App Store" (dummy link)
   - Secondary links: Roadmap, Changelog
   - Footer with privacy + contact

2. **Privacy Policy** (`privacy.html`)
   - Simple text page with boilerplate
   - To be replaced with proper policy mentioning third parties later

### Navigation
- **Header**: Logo (links to home) + "Support" nav link
- **Support link**: External link to https://omachrome.featurebase.app/help (with external link indicator)
- **Footer**: Privacy Policy link, contact email (hello@omachrome.com)

---

## Home Page Structure

### Sections
1. **Header**
   - Logo (clickable, goes to home)
   - "Support" link (external indicator icon)

2. **Hero**
   - Tagline: "Store recipes on your phone. Upload on the go."
   - Subtitle describing the core value prop
   - Primary CTA button: "Download on App Store"

3. **Features Section**
   - Showcase 3-4 main capabilities:
     - Save color recipes without a computer
     - Use your iOS device's camera
     - Adjust tone/saturation/contrast
     - Sync with OM-3
   - Use app screenshots where appropriate
   - Clean card or list layout

4. **Secondary CTAs**
   - Roadmap link (featurebase)
   - Changelog link (featurebase)

5. **Footer**
   - Copyright
   - Privacy Policy link
   - Contact: hello@omachrome.com (or mention support links to featurebase)

---

## Privacy Policy Page

- Simple boilerplate text
- Placeholder for specific third-party mentions (Featurebase, analytics if any, etc.)
- Link back to home
- Footer (consistent with home)

---

## File Structure

```
www-omachrome/
├── index.html           # Home page
├── privacy.html         # Privacy policy
├── css/
│   └── style.css       # All styles (minimal CSS)
├── js/
│   └── main.js         # Minimal JS (if needed)
├── img/
│   ├── logo-light.svg  # Logo light mode
│   ├── logo-dark.svg   # Logo dark mode
│   └── ...             # App screenshots/feature images
├── plan.md             # This file
└── README.md           # Setup/deployment instructions
```

---

## Development Approach

1. **HTML First**: Semantic, accessible HTML structure
2. **CSS Grid/Flexbox**: Modern layout without frameworks
3. **Mobile First**: Responsive design starting from mobile
4. **Minimal JS**: Only if needed (e.g., theme toggle, external link indicators)
5. **Performance**: Optimize images, no external dependencies

---

## Content Placeholder

### Home Copy (to be refined)
- **Hero**: "Store recipes on your phone. Upload on the go."
- **Subtitle**: "Simple iOS app for OM-3 recipe management"
- **Feature descriptions**:
  - "Import recipes from OM-3 jpegs"
  - "Store as many recipes as you want on your phone"
  - "Upload recipes to your OM-3 with just your phone and a USB-C cable"

### Privacy Policy
- Boilerplate template with placeholder for third-party details

---

## om-recipes Partnership Section — cancelled

Cancelled 2026-11-03. The planned om-recipes.com partnership was never announced and is no
longer planned, so do not add the "Now integrated with om-recipes.com" homepage section. The
existing FAQ and how-it-works copy that sends people to om-recipes.com for sample JPEGs is
unchanged for now and is rewritten when the gallery ships (see below).

Source: `planning/recipe-gallery/master-plan.md` §7.

## Recipe Gallery pages
- Link pages `r.omachrome.com/<id>` are served by the API Worker (backend B4), not by this site; no hosting change here
- Static pages: Community Guidelines (what can be published, how to report), contact / takedown address, Terms update, Privacy Policy update (gallery, pseudonymous publisher ID, no images)
- Marketing copy and a changelog entry once the gallery ships; do not claim it before then
- Cancel the planned "om-recipes Partnership Section" (never announced, no longer planned)
- When the gallery ships, rewrite the FAQ and how-it-works copy that sends people to om-recipes.com for sample JPEGs

### Backend status and what this site still owes (2026-11-08)
Backend `omachrome-api` B1–B4 are built (staging and production live; link pages built). Nothing on this site needs to change for the backend to work, but the apps and the link pages point people here, so these are the outstanding items. Facts below are what the backend actually does (see `omachrome-api/docs/client-integration.md` and `docs/decisions.md`), so the copy can be accurate.
- [ ] **Contact / takedown address:** `hello@omachrome.com` (already shown in the footer of every link page). Add a visible contact section or page, and make sure that mailbox exists and is monitored. Link pages and the app ask people to use it to report a problem or request a recipe's removal
- [ ] **Community Guidelines page** (the iOS app links to it from the report and block screens; agree the URL with the iOS agent before building, e.g. `/guidelines`). Content that matches the rules the server enforces: recipes are numbers plus a name and description, no images; names 1–40 and descriptions up to 280 characters; no links or web addresses, no emoji, a word filter applies; publishing is for omachrome Lab subscribers; a publisher's first three recipes are reviewed before they appear; three reports from different people hide a recipe pending review; the owner can remove anything and ban a publisher; takedown requests go to the contact address; people can delete their own recipes at any time; recipes already published stay up if a subscription lapses
- [ ] **Privacy Policy update** (gallery section), accurate to what is stored: a random pseudonymous publisher id and the display name the person chooses; a one-way hash of the App Store subscription id (the id itself isn't kept); no email address or other personal data; recipe contents (numbers, name, description, tags). Reports are stored with a one-way salted hash, not an IP address; rate-limit counters use a one-way hash of the IP and are deleted after about two days. Cloudflare, the host, processes requests under its own policy. Removed recipes are deleted after 30 days; moderation actions are logged. Browsing the gallery needs no account
- [ ] **Terms update:** community rules, moderation rights, Lab is billed and cancelled through the App Store (and Google Play for Android)
- [ ] **Lab and gallery marketing + changelog entry:** only when the gallery ships in a released app; do not announce before then
- [ ] **Rewrite FAQ / how-it-works copy** that sends people to om-recipes.com for sample JPEGs, when the gallery ships
- [ ] Decide and tell the iOS agent: the final URLs of the Guidelines, Privacy and Terms pages (the app's report/block screens and the Lab paywall link to them)

---

## Next Steps

1. Create folder structure and base files
2. Build HTML pages (home + privacy)
3. Write minimalist CSS (typography focus)
4. Add app screenshots/images
5. Refine copy in-situ
6. Test responsive design across devices
7. Deploy to GitHub Pages with custom domain setup

---

## Notes

- All links to featurebase should have external link indicator
- App Store link is dummy for now (can be updated when app launches)
- Copy is placeholder; refine directly in HTML as needed
- No complex interactions needed; keep it simple and fast
