/* ============================================
   NAVTHERA — Navbar Component JavaScript
   Handles scroll detection, mobile menu toggle
   ============================================ */

(function() {
    'use strict';

    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // ---- MOBILE MENU TOGGLE ----
    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        if (navbar) {
            navbar.classList.remove('menu-open');
            navbar.style.removeProperty('--menu-open-top');
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'navLinks');

        menuToggle.addEventListener('click', () => {
            const isOpen = !navLinks.classList.contains('active');
            menuToggle.classList.toggle('active', isOpen);
            navLinks.classList.toggle('active', isOpen);
            navLinks.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            if (navbar) {
                navbar.classList.toggle('menu-open', isOpen);
                navbar.classList.remove('nav-hidden');
                if (isOpen) navbar.style.setProperty('--menu-open-top', `${window.scrollY}px`);
                else navbar.style.removeProperty('--menu-open-top');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // The Services link is a disclosure control, not a navigation link.
                if (!link.classList.contains('nav-services-trigger')) closeMenu();
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && navbar && !navbar.contains(e.target)) {
                closeMenu();
            }
        });

    }

    // ---- SMART STICKY HEADER ----
    if (navbar) {
        let previousScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const menuIsOpen = navLinks && navLinks.classList.contains('active');

            if (menuIsOpen || currentScrollY < 80 || currentScrollY < previousScrollY) {
                navbar.classList.remove('nav-hidden');
            } else if (currentScrollY > previousScrollY) {
                navbar.classList.add('nav-hidden');
            }

            previousScrollY = currentScrollY;
        }, { passive: true });
    }

    // ---- DESKTOP CURSOR SPOTLIGHT ----
    if (navbar && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        navbar.addEventListener('pointermove', (e) => {
            const bounds = navbar.getBoundingClientRect();
            navbar.style.setProperty('--cursor-x', `${e.clientX - bounds.left}px`);
            navbar.style.setProperty('--cursor-y', `${e.clientY - bounds.top}px`);
            navbar.classList.add('cursor-spotlight');
        });

        navbar.addEventListener('pointerleave', () => {
            navbar.classList.remove('cursor-spotlight');
        });
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
                    closeMenu();
                }
            }
        });
    });

    // ---- PUBLISH NAVBAR HEIGHT ----
    // The navbar is position:fixed, so pages that start content at the top of the
    // document need to know how tall it actually is. Its height changes when the
    // links wrap, so measure rather than hard-code. CSS carries a fallback for the
    // moment before this runs.
    if (navbar) {
        const publishNavHeight = () => {
            const h = Math.ceil(navbar.getBoundingClientRect().height);
            if (h > 0) document.documentElement.style.setProperty('--nav-h', h + 'px');
        };
        publishNavHeight();
        window.addEventListener('resize', publishNavHeight);
        window.addEventListener('orientationchange', publishNavHeight);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(publishNavHeight);
    }

    // ---- ACTIVE LINK HIGHLIGHTING ----
    if (navLinks) {
        // Normalise both sides to a clean path so this works with Vercel's
        // cleanUrls (/about) as well as legacy hrefs (about.html).
        const normalise = (p) => {
            if (!p) return '';
            p = p.split('#')[0].split('?')[0];
            if (/^https?:/i.test(p)) return '';
            p = p.replace(/^\.?\//, '/').replace(/\.html$/, '').replace(/\/index$/, '');
            if (p && !p.startsWith('/')) p = '/' + p;
            return p === '/index' || p === '' ? '/' : p.replace(/\/$/, '') || '/';
        };
        const currentPage = normalise(window.location.pathname);
        navLinks.querySelectorAll('a').forEach(link => {
            if (normalise(link.getAttribute('href')) === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // ---- SERVICES DROPDOWN ----
    // This only changes the navbar interaction. Existing service-page and
    // services.html content is intentionally left untouched.
    if (navLinks) {
        const servicesItem = Array.from(navLinks.children).find(li => {
            const link = li.querySelector(':scope > a');
            return link && link.textContent.trim().toLowerCase() === 'services';
        });

        if (servicesItem) {
            const servicesLink = servicesItem.querySelector(':scope > a');
            // Each department links to its own dedicated page, not a fragment of
            // the Services page. The dedicated pages are the ones that can rank.
            const services = [
                ['Neuro Rehab', '/neuro-rehabilitation'],
                ['Orthopaedic', '/orthopaedic-rehabilitation'],
                ['Aquatherapy', '/aquatherapy'],
                ['Sports Rehab', '/sports-rehabilitation'],
                ['Pelvic Health', '/pelvic-health-physiotherapy'],
                ['Geriatric', '/geriatric-physiotherapy'],
                ['Oncology', '/oncology-rehabilitation'],
                ['Balance & Vestibular', '/balance-and-vestibular-rehabilitation'],
                ['Cardio & Respiratory', '/cardio-respiratory-rehabilitation'],
                ["Women's Health", '/womens-health-physiotherapy']
            ];

            servicesItem.classList.add('nav-services-dropdown');
            servicesLink.classList.add('nav-services-trigger');
            servicesLink.setAttribute('aria-haspopup', 'true');
            servicesLink.setAttribute('aria-expanded', 'false');

            const dropdown = document.createElement('div');
            dropdown.className = 'services-dropdown-menu';
            dropdown.setAttribute('role', 'menu');
            dropdown.setAttribute('aria-label', 'Services');

            services.forEach(([name, path]) => {
                const item = document.createElement('a');
                item.className = 'services-dropdown-item';
                item.href = path;
                item.setAttribute('role', 'menuitem');
                item.textContent = name;
                dropdown.appendChild(item);
            });

            servicesItem.appendChild(dropdown);

            const setOpen = (open) => {
                servicesItem.classList.toggle('dropdown-open', open);
                servicesLink.setAttribute('aria-expanded', String(open));
            };

            servicesLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(!servicesItem.classList.contains('dropdown-open'));
            });

            dropdown.querySelectorAll('.services-dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const hash = item.hash;
                    // On services.html, use the site's existing tab/panel system
                    // so the original boxes, diagrams, text and sizing remain intact.
                    if ((window.location.pathname.split('/').pop() || 'index.html') === 'services.html') {
                        const dept = hash.replace('#panel-', '');
                        const tab = document.querySelector(`.dept-tab[data-dept="${dept}"]`);
                        if (tab) {
                            e.preventDefault();
                            tab.click();
                            setOpen(false);
                            if (menuToggle && navLinks) closeMenu();
                            const layout = document.querySelector('.services-layout');
                            if (layout) layout.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    } else {
                        setOpen(false);
                    }
                });
            });

            document.addEventListener('click', (e) => {
                if (!servicesItem.contains(e.target)) setOpen(false);
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') setOpen(false);
            });
        }
    }

})();
