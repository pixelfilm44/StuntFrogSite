/* ============================================================
   STUNT FROG SUPERSTAR - Website Scripts
   ============================================================ */

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            navLinks.classList.remove('mobile-open');
            mobileBtn.classList.remove('active');
        }
    });
});

// --- Mobile menu ---
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        mobileBtn.classList.toggle('active');
    });
}

// --- Nav background on scroll ---
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.style.background = 'rgba(15, 43, 29, 0.95)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.padding = '12px 40px';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.padding = '20px 40px';
    }
}, { passive: true });

// --- Scroll reveal animations ---
const revealElements = document.querySelectorAll(
    '.feature-card, .weather-card, .ei-row, .upgrade-pill, .video-showcase, .shop-split, .download-split'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});


// --- Mobile nav styles ---
const style = document.createElement('style');
style.textContent = `
    .nav-links.mobile-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(15, 43, 29, 0.97);
        padding: 20px;
        gap: 16px;
        backdrop-filter: blur(12px);
        border-radius: 0 0 16px 16px;
        animation: slideDown 0.3s ease-out;
    }

    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
