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
    const androidCheckInput = document.getElementById('android-beta-check-input')
    const androidChip = document.getElementById('android-beta-chip')
    const iosCheckInput = document.getElementById('ios-beta-check-input')
    const iosChip = document.getElementById('ios-beta-chip')
    const betaHint = document.getElementById('beta-hint')
    const betaHintText = document.getElementById('beta-hint-text')

    const BETA_HINTS = {
        android: 'Please sign up with your Google account email to access the omachrome Android beta.',
        ios: 'Please sign up with your Apple ID email to access the omachrome iOS TestFlight beta.',
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    emailInput.addEventListener('input', function() {
        validationEl.hidden = true
    })

    function selectBetaPlatform(platform) {
        const isAndroid = platform === 'android'
        const isIos = platform === 'ios'

        androidCheckInput.checked = isAndroid
        androidChip.classList.toggle('is-checked', isAndroid)
        iosCheckInput.checked = isIos
        iosChip.classList.toggle('is-checked', isIos)

        if (betaHint && betaHintText) {
            if (platform) {
                betaHintText.textContent = BETA_HINTS[platform]
                betaHint.hidden = false
            } else {
                betaHint.hidden = true
            }
        }
    }

    if (androidCheckInput && androidChip) {
        androidCheckInput.addEventListener('change', function() {
            selectBetaPlatform(this.checked ? 'android' : null)
        })
    }

    if (iosCheckInput && iosChip) {
        iosCheckInput.addEventListener('change', function() {
            selectBetaPlatform(this.checked ? 'ios' : null)
        })
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault()

        const email = emailInput.value.trim()
        const androidBeta = androidCheckInput ? androidCheckInput.checked : false
        const iosBeta = iosCheckInput ? iosCheckInput.checked : false

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

        const payload = { email, source: 'website-newsletter' }
        if (androidBeta) payload.campaign = 'android-beta'
        else if (iosBeta) payload.campaign = 'ios-beta'

        try {
            const res = await fetch(NEWSLETTER_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (res.ok || res.status === 409) {
                form.hidden = true
                const successText = document.getElementById('newsletter-success-text')
                if (successText && payload.campaign) {
                    const betaLabel = androidBeta ? 'Android beta' : 'iOS beta'
                    successText.textContent = `You're on the list for ${betaLabel}. We'll be in touch.`
                }
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
