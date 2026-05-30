/* ===================================
   OMACHROME WEBSITE - MAIN SCRIPT
   Minimal JavaScript for interactions
   ================================== */

// Update this after deploying your Cloudflare Worker
const NEWSLETTER_WORKER_URL = 'https://api.omachrome.com'

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    handleExternalLinks();
    initNewsletterForm();
});

/**
 * Initialize smooth scroll behavior for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Add visual feedback for external links
 */
function handleExternalLinks() {
    document.querySelectorAll('a.external').forEach(link => {
        // Links already have external-icon SVG in HTML
        // This is here for any dynamic external link handling
    });
}

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form')
    if (!form) return

    const emailInput = document.getElementById('newsletter-email')
    const submitBtn = document.getElementById('newsletter-submit')
    const successEl = document.getElementById('newsletter-success')
    const errorEl = document.getElementById('newsletter-error')
    const validationEl = document.getElementById('newsletter-validation')

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    emailInput.addEventListener('input', function() {
        validationEl.hidden = true
    })

    form.addEventListener('submit', async function(e) {
        e.preventDefault()

        const email = emailInput.value.trim()

        if (!email) {
            validationEl.textContent = 'Please enter your email address.'
            validationEl.hidden = false
            return
        }

        if (!emailRe.test(email)) {
            validationEl.textContent = 'That doesn\'t look like a valid email address.'
            validationEl.hidden = false
            return
        }

        validationEl.hidden = true
        submitBtn.disabled = true
        submitBtn.textContent = 'Sending…'
        successEl.hidden = true
        errorEl.hidden = true

        try {
            const res = await fetch(NEWSLETTER_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'website-newsletter', campaign: 'launch-promo' }),
            })

            if (res.ok || res.status === 409) {
                form.hidden = true
                successEl.hidden = false
            } else {
                throw new Error(`status ${res.status}`)
            }
        } catch {
            errorEl.hidden = false
            submitBtn.disabled = false
            submitBtn.textContent = 'Sign up'
        }
    })
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Press 'h' to go home (optional enhancement)
    if (event.key === 'h' && event.ctrlKey) {
        window.location.href = '/';
    }
});
