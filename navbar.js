/* ============================================
   NAVTHERA — Navbar Component JavaScript
   Handles scroll detection, mobile menu toggle
   ============================================ */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

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
            link.addEventListener('click', closeMenu);
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
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
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
            const services = [
                ['Neuro Rehab', 'neuro'],
                ['Orthopaedic', 'ortho'],
                ['Aquatherapy', 'aqua'],
                ['Sports Rehab', 'sports'],
                ['Pelvic Health', 'pelvic'],
                ['Geriatric', 'geriatric'],
                ['Oncology', 'oncology'],
                ['Balance & Vestibular', 'vestibular'],
                ['Cardio & Respiratory', 'cardio'],
                ["Women's Health", 'gynaec']
            ];

            servicesItem.classList.add('nav-services-dropdown');
            servicesLink.classList.add('nav-services-trigger');
            servicesLink.setAttribute('aria-haspopup', 'true');
            servicesLink.setAttribute('aria-expanded', 'false');

            const dropdown = document.createElement('div');
            dropdown.className = 'services-dropdown-menu';
            dropdown.setAttribute('role', 'menu');
            dropdown.setAttribute('aria-label', 'Services');

            services.forEach(([name, dept]) => {
                const item = document.createElement('a');
                item.className = 'services-dropdown-item';
                item.href = `services.html#panel-${dept}`;
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
