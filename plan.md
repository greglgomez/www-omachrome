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
