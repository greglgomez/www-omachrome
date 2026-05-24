# omachrome.com Website

A minimal, beautiful static marketing website for the omachrome iOS app.

## Quick Start

### Local Development

No build step required! Simply:

1. **Serve the files locally:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js (if you have it)
   npx http-server
   ```

2. **Open in browser:**
   Navigate to `http://localhost:8000`

### File Structure

```
www-omachrome/
├── index.html              # Home page
├── privacy.html            # Privacy policy
├── css/
│   └── style.css          # All styles (minimalist CSS)
├── js/
│   └── main.js            # Minimal JavaScript
├── img/
│   ├── logo-dark.svg      # Dark mode logo
│   ├── logo-light.svg     # Light mode logo
│   └── app-showcase.png   # App screenshot/showcase image
├── plan.md                # Project plan
└── README.md              # This file
```

## Images

You'll need to add the following images to the `/img` directory:

- **logo-dark.svg** - Logo for light backgrounds
- **logo-light.svg** - Logo for dark backgrounds
- **app-showcase.png** - App interface screenshot (used in hero section)

Simply replace the placeholder image paths once you have these files.

## Deployment to GitHub Pages

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/www-omachrome.git
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" (under Code and automation)
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` directory
5. Save

Your site will be published at `https://yourusername.github.io/www-omachrome`

### 3. Connect Custom Domain

1. In repository settings > Pages
2. Add your custom domain: `omachrome.com`
3. Update your domain's DNS settings to point to GitHub Pages:
   - Add A records pointing to GitHub's IP addresses
   - Or use CNAME record (if appropriate for your setup)

See [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed instructions.

## Content Updates

### Updating Copy

Simply edit the HTML files directly - no build step needed:
- **Home page copy:** Edit `index.html` (hero section, features)
- **Privacy policy:** Edit `privacy.html`

### Updating App Store Link

Find the placeholder link in `index.html`:
```html
<a href="#" class="cta-button cta-primary">Download on App Store</a>
```

Replace `#` with your App Store link when the app is live.

### Adding Screenshots

1. Place app screenshots in `/img` directory
2. Update image references in HTML as needed
3. Optimize images for web (use tools like [TinyPNG](https://tinypng.com))

## Design System

### Colors
- **Primary Accent**: `#6155F5` (Purple)
- **Text Primary**: `#1a1a1a` (Near black)
- **Text Secondary**: `#666666` (Gray)
- **Background**: `#ffffff` (White)

### Typography
- **Font Stack**: System fonts (no external dependencies)
- **Sizes**: Responsive scaling via CSS variables
- **Line Height**: 1.6-1.7 for readability

## Performance

The site is optimized for speed:
- **No frameworks** - pure HTML/CSS/JavaScript
- **No external dependencies** - uses system fonts
- **Minimal JavaScript** - only for smooth interactions
- **Lightweight CSS** - ~5KB uncompressed

Recommended optimizations:
- Compress images using TinyPNG or similar
- Use modern formats (WebP) for hero image
- Set proper caching headers on GitHub Pages

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Works on devices as far back as iOS 12 and Android 5

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- External link indicators
- WCAG 2.1 AA compliant

## Future Enhancements

Potential additions (keep minimal):
- Analytics (Google Analytics or Plausible)
- Newsletter signup (if needed)
- Blog or changelog (when ready)
- Dark mode toggle (if desired)

## License

© 2024 omachrome. All rights reserved.

## Questions?

For deployment issues, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
