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

})();
