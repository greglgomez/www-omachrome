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
    initAndroidBetaButton();
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
    const androidCheckBox = document.getElementById('android-checkbox-box')

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    emailInput.addEventListener('input', function() {
        validationEl.hidden = true
    })

    if (androidCheckInput && androidCheckBox) {
        androidCheckInput.addEventListener('change', function() {
            if (this.checked) {
                androidCheckBox.classList.add('is-checked')
            } else {
                androidCheckBox.classList.remove('is-checked')
            }
        })
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault()

        const email = emailInput.value.trim()
        const androidBeta = androidCheckInput ? androidCheckInput.checked : false

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

        try {
            const res = await fetch(NEWSLETTER_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (res.ok || res.status === 409) {
                form.hidden = true
                const successText = document.getElementById('newsletter-success-text')
                if (successText && androidBeta) {
                    successText.textContent = "You're on the list for Android beta. We'll be in touch."
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

function initAndroidBetaButton() {
    const btn = document.getElementById('android-beta-btn')
    if (!btn) return

    btn.addEventListener('click', function() {
        const newsletter = document.getElementById('newsletter')
        if (!newsletter) return

        newsletter.scrollIntoView({ behavior: 'smooth' })

        setTimeout(function() {
            const checkInput = document.getElementById('android-beta-check-input')
            const checkBox = document.getElementById('android-checkbox-box')
            if (!checkInput || !checkBox || checkInput.checked) return

            checkInput.checked = true
            checkBox.classList.add('is-checked')
            checkBox.classList.add('is-bouncing')
            checkBox.addEventListener('animationend', function() {
                checkBox.classList.remove('is-bouncing')
            }, { once: true })
        }, 750)
    })
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Press 'h' to go home (optional enhancement)
    if (event.key === 'h' && event.ctrlKey) {
        window.location.href = '/';
    }
});
