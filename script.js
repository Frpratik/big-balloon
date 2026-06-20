const SITE_CONFIG = {
    whatsapp: '919876543210',
    email: 'bigballoon.mumbai@gmail.com',
    phone: '+91 98765 43210',
    instagram: 'https://www.instagram.com/bigballoon_mumbai/',
    businessName: 'Big Baloon Events',
};

const GALLERY_IMAGES = [
    { src: 'images/Happy anniversary celebration setup.png', alt: 'Anniversary balloon and neon decor setup' },
    { src: 'images/IMG20260123175553~2.jpg.jpeg', alt: 'Floral photo booth backdrop with flowers' },
    { src: 'images/IMG20251104152450_1.jpg.jpeg', alt: 'Celebration backdrop with sunflowers' },
    { src: 'images/IMG20250615174344_1.jpg.jpeg', alt: 'Ceremony stage with floral wreath' },
    { src: 'images/IMG20260123181302~3 (1).jpg.jpeg', alt: 'Wedding mandap floral decoration' },
    { src: 'images/IMG-20250817-WA0040.jpg.jpeg', alt: 'Outdoor reception with lighting' },
    { src: 'images/IMG-20260413-WA0041.jpg.jpeg', alt: 'Corporate event stage setup' },
    { src: 'images/IMG-20260312-WA0004.jpg.jpeg', alt: 'Table styling with floral centerpieces' },
    { src: 'images/IMG20260123180041-1.jpg.jpeg', alt: 'Ring ceremony decor' },
    { src: 'images/IMG-20250524-WA0020.jpg.jpeg', alt: 'Birthday balloon arch decoration' },
    { src: 'images/IMG20260112165342.jpg.jpeg', alt: 'Haldi ceremony floral setup' },
    { src: 'images/IMG_20260522_103928.png', alt: 'Premium balloon garland installation' },
    { src: 'images/IMG_20260523_151050.png', alt: 'Theme party decoration setup' },
    { src: 'images/IMG_20260524_195220.png', alt: 'Indoor event decor' },
    { src: 'images/IMG_20260524_195306.png', alt: 'Festive celebration backdrop' },
    { src: 'images/IMG20260123170552-1.jpg.jpeg', alt: 'Mehendi ceremony decoration' },
    { src: 'images/IMG-20250715-WA0002.jpg.jpeg', alt: 'Naming ceremony floral decor' },
    { src: 'images/IMG20260301132840.jpg.jpeg', alt: 'Surprise proposal setup' },
    { src: 'images/1000306938.jpg.jpeg', alt: 'Premium event decoration showcase' },
    { src: 'images/20260218_133843.jpg.jpeg', alt: 'Custom event styling and balloons' },
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

document.addEventListener('DOMContentLoaded', () => {
    if (isTouchDevice) document.body.classList.add('is-touch');
    if (prefersReducedMotion) document.body.classList.add('prefers-reduced-motion');

    initPreloader();
    applySiteConfig();
    initNavbar();
    initMobileMenu();
    initScrollProgress();
    initNavActive();
    initScrollReveal();
    initSmoothScroll();
    initTestimonialsMarquee();
    initGallery();
    initContactForm();

    if (!prefersReducedMotion && !isTouchDevice) {
        initMagneticButtons();
    }

    if (isTouchDevice) {
        document.querySelectorAll('.magnetic').forEach(el => el.classList.remove('magnetic'));
    }
});

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hide = () => {
        preloader.classList.add('done');
        setTimeout(() => preloader.remove(), 1000);
    };

    if (prefersReducedMotion) {
        hide();
        return;
    }

    window.addEventListener('load', () => setTimeout(hide, 800));
    setTimeout(hide, 2000);
}

function applySiteConfig() {
    const waMessage = encodeURIComponent(
        `Hi ${SITE_CONFIG.businessName}! I'd like a quote for an event.\n\nEvent type: \nDate: \nLocation: `
    );
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${waMessage}`;

    document.querySelectorAll('.whatsapp-cta-hero, .whatsapp-float, .whatsapp-link, .whatsapp-cta-nav').forEach(el => {
        el.href = waUrl;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
    });

    document.querySelectorAll('[data-contact-phone]').forEach(el => {
        el.textContent = SITE_CONFIG.phone;
    });

    document.querySelectorAll('[data-contact-phone-link]').forEach(el => {
        el.href = `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`;
    });

    document.querySelectorAll('[data-contact-email]').forEach(el => {
        el.textContent = SITE_CONFIG.email;
        if (el.tagName === 'A') el.href = `mailto:${SITE_CONFIG.email}`;
    });

    document.querySelectorAll('[data-contact-instagram]').forEach(el => {
        if (el.tagName === 'A') el.href = SITE_CONFIG.instagram;
    });
}

function initMagneticButtons() {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    let animId;

    const resize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
        particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3 - 0.2,
            alpha: Math.random() * 0.5 + 0.1,
        }));
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
            ctx.fill();
        });
        animId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else draw();
    });
}

function initHeroParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    }, { passive: true });
}

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    }, { passive: true });
}

function initNavActive() {
    const sections = document.querySelectorAll('main section[id], main section[id="faq"]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(item => item.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale'
    );

    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initTestimonialsMarquee() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack || prefersReducedMotion) {
        if (marqueeTrack) marqueeTrack.style.animation = 'none';
        return;
    }

    Array.from(marqueeTrack.children).forEach(slide => {
        marqueeTrack.appendChild(slide.cloneNode(true));
    });

    const pause = () => { marqueeTrack.style.animationPlayState = 'paused'; };
    const play = () => { marqueeTrack.style.animationPlayState = 'running'; };

    marqueeTrack.addEventListener('touchstart', pause, { passive: true });
    marqueeTrack.addEventListener('touchend', play, { passive: true });
    marqueeTrack.addEventListener('mouseenter', pause);
    marqueeTrack.addEventListener('mouseleave', play);
}

function initGallery() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const openGalleryBtn = document.getElementById('open-gallery');
    let currentIndex = 0;
    let lastFocus = null;

    if (!lightbox || !lightboxImg) return;

    const openLightbox = (index) => {
        currentIndex = index;
        lastFocus = document.activeElement;
        updateLightboxImage(true);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
        lightbox.querySelector('.lightbox-close')?.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        lastFocus?.focus();
    };

    const updateLightboxImage = (animate = false) => {
        const item = GALLERY_IMAGES[currentIndex];
        if (animate) {
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.96)';
            setTimeout(() => {
                lightboxImg.src = item.src;
                lightboxImg.alt = item.alt;
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 150);
        } else {
            lightboxImg.src = item.src;
            lightboxImg.alt = item.alt;
        }
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
        }
    };

    lightboxImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

    const showNext = () => { currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length; updateLightboxImage(true); };
    const showPrev = () => { currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; updateLightboxImage(true); };

    openGalleryBtn?.addEventListener('click', (e) => { e.preventDefault(); openLightbox(0); });

    document.querySelectorAll('[data-gallery-index]').forEach(item => {
        item.addEventListener('click', () => openLightbox(Number(item.dataset.galleryIndex)));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(Number(item.dataset.galleryIndex));
            }
        });
    });

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', showPrev);
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', showNext);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const statusEl = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !phone || !message) {
            showFormStatus(statusEl, 'Please add your name, WhatsApp number, and event details.', 'error');
            return;
        }

        const subject = encodeURIComponent(`Event Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nWhatsApp: ${phone}${email ? `\nEmail: ${email}` : ''}\n\nEvent Details:\n${message}`
        );

        showFormStatus(statusEl, 'Opening your email app…', 'success');
        window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;

        setTimeout(() => {
            showFormStatus(statusEl, 'Didn\'t work? Tap WhatsApp above — we reply faster there!', 'success');
            form.reset();
        }, 1500);
    });
}

function showFormStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `form-status ${type}`;
    el.setAttribute('role', 'alert');
}
