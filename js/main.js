/* ===================================
   OMACHROME WEBSITE - MAIN SCRIPT
   Minimal JavaScript for interactions
   ================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Handle external link icons
    handleExternalLinks();
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

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Press 'h' to go home (optional enhancement)
    if (event.key === 'h' && event.ctrlKey) {
        window.location.href = '/';
    }
});
