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

### Status (2026-11-09)
Backend `omachrome-api` B1–B4 are built (see `omachrome-api/docs/client-integration.md`). Nothing on this site is needed for the backend to work, but the apps and the link pages point here.

**Done, committed locally, NOT yet pushed (needs the owner's review first; GitHub Pages deploys on push):**
- [x] `guidelines.html` — Community Guidelines (hero + three principle cards + the rules the server enforces). Linked from the footer on every page
- [x] `terms.html` — Terms of Use (new): app licence (Apple standard EULA applies), camera risk, Pro and Lab, the gallery (licence to display, no tolerance for objectionable content), liability (UK), governing law (England and Wales). **A plain-English draft: have it reviewed before publishing**
- [x] `privacy.html` — gallery section (browsing, publishing, reports and moderation, retention, analytics), Apple and Cloudflare as providers, retention and rights notes; date set to November 2026
- [x] `privacy-policy.html` — redirect to `/privacy.html`. **The shipped iOS app links to `https://omachrome.com/privacy-policy` (More screen and the Lab paywall), which returned 404 until this alias**
- [x] Footer on every page: Privacy Policy · Terms of Use · Community Guidelines · Contact (`hello@omachrome.com`)
- [x] `sitemap.xml` lists the new pages; `img/omachrome-icon-96.png` (small icon used by the recipe link pages on `r.omachrome.com`)

**Still to do:**
- [ ] Owner review of the Terms, the Guidelines wording and the Privacy additions (decide the response-time promise for reports, if any: the Guidelines deliberately don't give one), then push
- [ ] Confirm the new page URLs with the iOS agent: `https://omachrome.com/guidelines.html`, `/terms.html`, `/privacy.html` (the extensionless forms also work on GitHub Pages)
- [ ] Marketing copy and a changelog entry: only when the gallery ships in a released app; do not announce before then
- [ ] Rewrite the FAQ / how-it-works copy that sends people to om-recipes.com for sample JPEGs, when the gallery ships (the JSON-LD FAQ in `index.html` too)

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
