/* ================================================================
   ANIRUDDHA JADHAV — 3D AI-POWERED DATA ANALYST PORTFOLIO
   Interactive JavaScript
   ================================================================ */

(function () {
    'use strict';

    /* ===== HELPERS ===== */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isMobile = window.innerWidth < 768;

    /* ================================================================
       THREE.JS PARTICLE NETWORK BACKGROUND
       Lightweight canvas-based particle network with mouse interaction.
       Falls back to CSS gradient if anything fails.
       ================================================================ */
    function initParticleBackground() {
        const canvas = document.getElementById('three-bg');
        if (!canvas) return;

        // Respect reduced motion — keep gradient fallback only
        if (prefersReducedMotion) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) { canvas.style.display = 'none'; return; }

        let width, height, particles, mouseX, mouseY, animationId;

        // Particle count scales with screen size and device capability
        const PARTICLE_COUNT = isMobile ? 30 : Math.min(80, Math.floor(window.innerWidth / 18));
        const CONNECT_DIST = isMobile ? 90 : 130;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.5 + 0.5
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // Update + draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction — gentle attraction
                if (mouseX !== undefined) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        p.x += dx * 0.004;
                        p.y += dy * 0.004;
                    }
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 184, 255, 0.55)';
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        const opacity = (1 - dist / CONNECT_DIST) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(0, 184, 255, ' + opacity + ')';
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(draw);
        }

        function onMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        // Pause when tab is hidden — saves CPU/GPU
        function onVisibility() {
            if (document.hidden) {
                if (animationId) cancelAnimationFrame(animationId);
            } else {
                draw();
            }
        }

        try {
            resize();
            createParticles();
            draw();

            window.addEventListener('resize', function () {
                cancelAnimationFrame(animationId);
                resize();
                createParticles();
                draw();
            });
            window.addEventListener('mousemove', onMouseMove, { passive: true });
            document.addEventListener('visibilitychange', onVisibility);
        } catch (err) {
            // Fallback — hide canvas, gradient shows through
            console.warn('Particle background disabled, using gradient fallback.');
            canvas.style.display = 'none';
        }
    }

    /* ================================================================
       SCROLL PROGRESS BAR
       ================================================================ */
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar || prefersReducedMotion) return;

        function update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ================================================================
       NAVBAR — scroll solidify + mobile toggle + active section
       ================================================================ */
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        const links = document.querySelectorAll('.nav-links a');

        // Solidify on scroll
        if (navbar) {
            const onScroll = function () {
                if (window.scrollY > 40) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        // Mobile hamburger toggle
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function () {
                const active = navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', active ? 'true' : 'false');
            });

            // Close menu when a link is clicked
            links.forEach(function (link) {
                link.addEventListener('click', function () {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (e) {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Active section highlighting via IntersectionObserver
        const sections = document.querySelectorAll('section[id]');
        if (sections.length && 'IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        links.forEach(function (link) {
                            link.classList.toggle('active',
                                link.getAttribute('href') === '#' + id);
                        });
                    }
                });
            }, { rootMargin: '-45% 0px -50% 0px' });

            sections.forEach(function (s) { sectionObserver.observe(s); });
        }
    }

    /* ================================================================
       SCROLL REVEAL — fade-up animation on [data-reveal]
       ================================================================ */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('[data-reveal]');
        if (!reveals.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            reveals.forEach(function (el) { el.classList.add('revealed'); });
            return;
        }

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Stagger slightly for grouped elements
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(function () {
                        entry.target.classList.add('revealed');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function (el, i) {
            // Add a tiny stagger for items inside the same parent
            const siblings = el.parentElement ?
                el.parentElement.querySelectorAll('[data-reveal]') : [];
            if (siblings.length > 1) {
                const idx = Array.prototype.indexOf.call(siblings, el);
                el.dataset.delay = Math.min(idx * 60, 240);
            }
            revealObserver.observe(el);
        });
    }

    /* ================================================================
       TYPED ROLE ANIMATION
       Cycles: Data Analyst | Data Scientist | BI Developer
       ================================================================ */
    function initTypedRoles() {
        const el = document.getElementById('typed-role');
        if (!el) return;

        const roles = ['Data Analyst', 'Data Scientist', 'BI Developer'];

        if (prefersReducedMotion) {
            el.textContent = roles.join(' | ');
            return;
        }

        let roleIdx = 0;
        let charIdx = 0;
        let deleting = false;

        function tick() {
            const current = roles[roleIdx];

            if (deleting) {
                el.textContent = current.substring(0, charIdx - 1);
                charIdx--;
            } else {
                el.textContent = current.substring(0, charIdx + 1);
                charIdx++;
            }

            let delay = deleting ? 50 : 90;

            if (!deleting && charIdx === current.length) {
                delay = 1800; // pause at full word
                deleting = true;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                delay = 400;
            }

            setTimeout(tick, delay);
        }
        tick();
    }

    /* ================================================================
       AVATAR VIDEO — autoplay, fallback, voice toggle
       ================================================================ */
    function initAvatarVideo() {
        const video = document.getElementById('avatarVideo');
        const fallback = document.getElementById('avatarFallback');
        const voiceBtn = document.getElementById('voiceBtn');

        if (!video) return;

        // Muted autoplay attempt
        video.muted = true;

        const tryPlay = function () {
            const p = video.play();
            if (p && typeof p.catch === 'function') {
                p.catch(function () {
                    // Autoplay blocked or file missing — show poster
                    video.classList.add('failed');
                    if (fallback) fallback.style.display = 'block';
                });
            }
        };

        // Error → fallback image
        video.addEventListener('error', function () {
            video.classList.add('failed');
            if (fallback) fallback.style.display = 'block';
        });

        tryPlay();

        // Voice toggle — unmute/mute (user gesture)
        if (voiceBtn) {
            voiceBtn.addEventListener('click', function () {
                if (video.classList.contains('failed')) return;
                const isMuted = video.muted;
                video.muted = !isMuted;
                voiceBtn.classList.toggle('active', isMuted);
                voiceBtn.setAttribute('aria-label',
                    isMuted ? 'Mute avatar voice' : 'Enable avatar voice');
                if (isMuted) {
                    video.volume = 0;
                    // Fade in volume
                    let v = 0;
                    const fade = setInterval(function () {
                        v = Math.min(v + 0.1, 1);
                        video.volume = v;
                        if (v >= 1) clearInterval(fade);
                    }, 60);
                }
            });
        }
    }

    /* ================================================================
       CUSTOM CURSOR (desktop, non-touch only)
       ================================================================ */
    function initCustomCursor() {
        if (isTouch || isMobile || prefersReducedMotion) return;

        const dot = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Grow on interactive elements
        const interactive = 'a, button, input, textarea, .project-card, .skill-group, .cert-card';
        document.querySelectorAll(interactive).forEach(function (el) {
            el.addEventListener('mouseenter', function () { ring.classList.add('grow'); });
            el.addEventListener('mouseleave', function () { ring.classList.remove('grow'); });
        });
    }

    /* ================================================================
       CONTACT FORM (preserve existing localStorage behavior)
       ================================================================ */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                // Store message in localStorage for admin panel (existing behaviour)
                try {
                    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
                    messages.push({
                        id: Date.now(),
                        name: name,
                        email: email,
                        message: message,
                        date: new Date().toLocaleString()
                    });
                    localStorage.setItem('portfolioMessages', JSON.stringify(messages));
                } catch (e) { /* storage may be unavailable */ }

                // Inline success feedback instead of jarring alert
                const btn = form.querySelector('button[type="submit"]');
                if (btn) {
                    const original = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    btn.style.background = 'linear-gradient(135deg, #06d6a0, #00B8FF)';
                    btn.disabled = true;
                    setTimeout(function () {
                        btn.innerHTML = original;
                        btn.style.background = '';
                        btn.disabled = false;
                        form.reset();
                    }, 2500);
                }
            }
        });
    }

    /* ================================================================
       FOOTER YEAR
       ================================================================ */
    function initYear() {
        const y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();
    }

    /* ================================================================
       INIT ALL
       ================================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        initParticleBackground();
        initScrollProgress();
        initNavbar();
        initScrollReveal();
        initTypedRoles();
        initAvatarVideo();
        initCustomCursor();
        initContactForm();
        initYear();
    });

    /* ================================================================
       GLOBAL FUNCTIONS (called from inline onclick — preserve API)
       ================================================================ */

    // Download CV / Resume
    window.downloadCV = function () {
        var link = document.createElement('a');
        link.href = 'assets/CV_Aniruddha_Jadhav.pdf';
        link.download = 'CV_Aniruddha_Jadhav.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Copy email to clipboard
    window.copyEmail = function (email) {
        email = email || 'jadhavaniruddha11@gmail.com';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(function () {
                showToast('Email copied to clipboard!');
            }).catch(function () {
                fallbackCopy(email);
            });
        } else {
            fallbackCopy(email);
        }
    };

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast('Email copied to clipboard!'); }
        catch (e) { showToast('Could not copy — please copy manually.'); }
        document.body.removeChild(ta);
    }

    // Lightweight toast (replaces jarring alert)
    function showToast(msg) {
        var existing = document.getElementById('portfolio-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'portfolio-toast';
        toast.textContent = msg;
        toast.setAttribute('role', 'status');
        toast.style.cssText = [
            'position:fixed', 'bottom:30px', 'left:50%',
            'transform:translateX(-50%)',
            'background:rgba(7,17,31,0.95)',
            'color:#00B8FF', 'padding:14px 28px',
            'border-radius:50px', 'border:1px solid rgba(0,184,255,0.3)',
            'font-family:Inter,sans-serif', 'font-size:0.9rem', 'font-weight:600',
            'z-index:9999', 'box-shadow:0 8px 30px rgba(0,0,0,0.4)',
            'backdrop-filter:blur(10px)',
            'animation:toastIn 0.3s ease'
        ].join(';');
        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.transition = 'opacity 0.4s, transform 0.4s';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(function () { toast.remove(); }, 400);
        }, 2200);
    }

    // Inject toast keyframe once
    (function () {
        var style = document.createElement('style');
        style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
        document.head.appendChild(style);
    })();

})();
