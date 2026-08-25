/* ============================================
   NAVTHERA — Navbar Component JavaScript
   Handles scroll detection, mobile menu toggle
   ============================================ */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const assetPrefix = /\/blog\//.test(window.location.pathname) ? '../' : '';

    const serviceLinks = [
        ['Neuro Rehabilitation', '/neuro-rehabilitation/'],
        ['Orthopaedic Rehabilitation', '/orthopaedic-rehabilitation/'],
        ['Aquatherapy', '/aquatherapy.html'],
        ['Sports Rehabilitation', '/sports-rehabilitation/'],
        ['Pelvic Health Physiotherapy', '/pelvic-health-physiotherapy/'],
        ['Geriatric Physiotherapy', '/geriatric-physiotherapy/'],
        ['Oncology Rehabilitation', '/oncology-rehabilitation/'],
        ['Balance & Vestibular Rehabilitation', '/balance-and-vestibular-rehabilitation/'],
        ['Cardio & Respiratory Rehabilitation', '/cardio-respiratory-rehabilitation/'],
        ["Women's Health Physiotherapy", '/womens-health-physiotherapy/']
    ];

    const blogLink = ['/blog/', 'Blog'];
    const cleanPagePaths = {
        'index.html': '/',
        'about.html': '/about',
        'services.html': '/services',
        'contact.html': '/contact',
        'aquatherapy.html': '/aquatherapy',
        'aquafit.html': '/aquafit',
        'neuro-rehab.html': '/neuro-rehabilitation',
        'orthopaedic.html': '/orthopaedic-rehabilitation',
        'sports-rehab.html': '/sports-rehabilitation',
        'pelvic-health.html': '/pelvic-health-physiotherapy',
        'geriatric.html': '/geriatric-physiotherapy',
        'oncology.html': '/oncology-rehabilitation',
        'balance-vestibular.html': '/balance-and-vestibular-rehabilitation',
        'cardio-respiratory.html': '/cardio-respiratory-rehabilitation',
        'womens-health.html': '/womens-health-physiotherapy'
    };
    const localPageFiles = {
        '/': 'index.html',
        '/about': 'about.html',
        '/services': 'services.html',
        '/contact': 'contact.html',
        '/aquatherapy': 'aquatherapy.html',
        '/aquatherapy.html': 'aquatherapy.html',
        '/aquafit': 'aquafit.html',
        '/neuro-rehabilitation': 'neuro-rehab.html',
        '/neuro-rehabilitation/': 'neuro-rehab.html',
        '/orthopaedic-rehabilitation': 'orthopaedic.html',
        '/orthopaedic-rehabilitation/': 'orthopaedic.html',
        '/sports-rehabilitation': 'sports-rehab.html',
        '/sports-rehabilitation/': 'sports-rehab.html',
        '/pelvic-health-physiotherapy': 'pelvic-health.html',
        '/pelvic-health-physiotherapy/': 'pelvic-health.html',
        '/geriatric-physiotherapy': 'geriatric.html',
        '/geriatric-physiotherapy/': 'geriatric.html',
        '/oncology-rehabilitation': 'oncology.html',
        '/oncology-rehabilitation/': 'oncology.html',
        '/balance-and-vestibular-rehabilitation': 'balance-vestibular.html',
        '/balance-and-vestibular-rehabilitation/': 'balance-vestibular.html',
        '/cardio-respiratory-rehabilitation': 'cardio-respiratory-rehabilitation/index.html',
        '/cardio-respiratory-rehabilitation/': 'cardio-respiratory-rehabilitation/index.html',
        '/womens-health-physiotherapy': 'womens-health.html',
        '/womens-health-physiotherapy/': 'womens-health.html',
        '/blog/': 'blog/index.html'
    };

    function normalizeInternalLinks() {
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('/') || href.startsWith('#') || href.includes('://') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
            const [page, hash] = href.split('#');
            if (!cleanPagePaths[page]) return;
            link.setAttribute('href', cleanPagePaths[page] + (hash ? `#${hash}` : ''));
        });

        if (window.location.protocol === 'file:') {
            document.querySelectorAll('a[href^="/"]').forEach(link => {
                const href = link.getAttribute('href');
                const [page, hash] = href.split('#');
                if (!localPageFiles[page]) return;
                link.setAttribute('href', localPageFiles[page] + (hash ? `#${hash}` : ''));
            });
        }
    }

    function addServiceMenu() {
        if (!navLinks) return;
        const servicesLink = Array.from(navLinks.querySelectorAll('a')).find(link => link.textContent.trim() === 'Services');
        const parent = servicesLink && servicesLink.parentElement;
        if (!parent || parent.querySelector('.service-submenu')) return;

        parent.classList.add('service-menu');
        servicesLink.setAttribute('aria-haspopup', 'true');
        servicesLink.setAttribute('aria-expanded', 'false');
        servicesLink.addEventListener('click', event => {
            event.preventDefault();
            const isOpen = parent.classList.toggle('open');
            servicesLink.setAttribute('aria-expanded', String(isOpen));
        });
        const submenu = document.createElement('ul');
        submenu.className = 'service-submenu';
        submenu.setAttribute('aria-label', 'Rehabilitation services');
        serviceLinks.forEach(([label, href]) => {
            const item = document.createElement('li');
            item.innerHTML = `<a href="${href}">${label}</a>`;
            submenu.appendChild(item);
        });
        parent.appendChild(submenu);

        if (!Array.from(navLinks.querySelectorAll('a')).some(link => link.textContent.trim() === blogLink[1])) {
            const blogItem = document.createElement('li');
            blogItem.innerHTML = `<a href="${blogLink[0]}">${blogLink[1]}</a>`;
            const aboutItem = Array.from(navLinks.children).find(item => item.querySelector('a')?.textContent.trim() === 'About Us');
            if (aboutItem) aboutItem.after(blogItem);
            else navLinks.appendChild(blogItem);
        }
    }

    function mountFooter() {
        const footer = document.querySelector('footer');
        if (!footer || footer.dataset.navtheraFooter === 'true') return;

        footer.dataset.navtheraFooter = 'true';
        footer.className = 'navthera-site-footer';
        footer.innerHTML = `
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="/" class="footer-logo">
                        <img src="${assetPrefix}assets/Navthera_logo_symbol_jpg.png" alt="Navthera logo">
                        <span>Navthera<small>Advanced Physio &amp; Rehab Centre</small></span>
                    </a>
                    <p>Advanced physiotherapy and rehabilitation care in Jaipur, bringing expert clinicians and thoughtful technology together.</p>
                    <div class="footer-socials" aria-label="Navthera social media">
                        <a href="https://www.facebook.com/navthera" target="_blank" rel="noopener noreferrer" aria-label="Navthera on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg></a>
                        <a href="https://www.instagram.com/navthera" target="_blank" rel="noopener noreferrer" aria-label="Navthera on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
                    </div>
                </div>
                <div class="footer-col"><h3>Explore</h3><a href="/">Home</a><a href="/about">About Navthera</a><a href="/services">All Services</a><a href="/blog/">Blog</a><a href="/contact">Contact</a></div>
                <div class="footer-col"><h3>Practice Areas</h3>${serviceLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>
                <div class="footer-col"><h3>Connect</h3><a href="tel:+919784532400">+91 97845 32400</a><a href="mailto:contact@navthera.in">contact@navthera.in</a><a href="https://maps.app.goo.gl/icwewDzpBcDJYhY98" target="_blank" rel="noopener noreferrer">68, Shri Gopal Nagar, Jaipur</a><a class="footer-appointment" href="/contact">Book an Appointment</a><a href="https://wa.me/919116032400" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div>
            </div>
            <div class="footer-bottom"><span>&copy; 2026 Navthera Advanced Physio and Rehab Centre. All rights reserved.</span><span>Care with precision. Recovery with purpose.</span></div>`;
    }

    function ensureWhatsApp() {
        if (document.querySelector('script[src*="whatsapp-chat.js"]')) return;
        const script = document.createElement('script');
        script.src = assetPrefix + 'assets/whatsapp-chat.js';
        script.defer = true;
        document.head.appendChild(script);
    }

    addServiceMenu();
    mountFooter();
    normalizeInternalLinks();
    ensureWhatsApp();

    function closeServiceMenu() {
        const serviceMenu = navLinks && navLinks.querySelector('.service-menu');
        if (!serviceMenu) return;
        serviceMenu.classList.remove('open');
        const link = serviceMenu.querySelector(':scope > a');
        if (link) link.setAttribute('aria-expanded', 'false');
    }

    // ---- MOBILE MENU TOGGLE ----
    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('open');
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            if (!link.closest('.service-menu') || link.closest('.service-submenu')) {
                link.addEventListener('click', () => {
                    closeMenu();
                    if (link.closest('.service-submenu')) closeServiceMenu();
                });
            }
        });

        document.addEventListener('click', event => {
            const serviceMenu = navLinks.querySelector('.service-menu');
            if (serviceMenu && !serviceMenu.contains(event.target)) closeServiceMenu();
        });

        // Close menu when user starts scrolling
        let menuScrollStart = 0;
        window.addEventListener('scroll', () => {
            if (navLinks.classList.contains('active') || navLinks.classList.contains('open')) {
                if (menuScrollStart === 0) menuScrollStart = window.scrollY;
                if (Math.abs(window.scrollY - menuScrollStart) > 40) {
                    closeMenu();
                    menuScrollStart = 0;
                }
            } else {
                menuScrollStart = 0;
            }
        }, { passive: true });
    }

    // ---- SCROLL DETECTION (for dynamic theme) ----
    if (navbar && !navbar.hasAttribute('data-theme')) {
        // Only apply scroll detection for dark theme navbars (no data-theme attribute)
        let lastScrollY = 0;

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;

            if (lastScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (menuToggle && navLinks) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // ---- ACTIVE LINK HIGHLIGHTING ----
    if (navLinks) {
        const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
        const servicePaths = serviceLinks.map(([, href]) => href.replace(/\/$/, ''));
        navLinks.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (href === '/' && currentPath === '/') || (href === '/services' && servicePaths.includes(currentPath))) {
                link.classList.add('active');
            }
        });
    }

})();
