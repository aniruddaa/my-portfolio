// ===== SMOOTH SCROLLING & ACTIVE NAV =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
            updateActiveNav();
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);

    function updateActiveNav() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const currentSection = document.querySelector('section:in-viewport');
        if (currentSection) {
            const id = currentSection.getAttribute('id');
            const activeLink = document.querySelector(`nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
});

// ===== SKILLS PROGRESS BAR ANIMATION =====
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const percentage = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = percentage;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();

            // Store message in localStorage for admin panel
            const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
            messages.push({
                id: Date.now(),
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-in-out';
    revealObserver.observe(element);
});

// ===== NAVBAR BLUR EFFECT ON SCROLL =====
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// ===== TYPED TEXT EFFECT =====
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const heroBg = document.querySelector('.hero::before');
    if (heroBg) {
        const scrolled = window.pageYOffset;
        document.documentElement.style.setProperty('--scroll', scrolled + 'px');
    }
});

// ===== PROJECT FILTER =====
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
            }, 10);
        } else {
            project.style.opacity = '0';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== DARK MODE TOGGLE =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// ===== LOAD DARK MODE PREFERENCE =====
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===== DOWNLOAD CV =====
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/CV_Aniruddha_Jadhav.pdf';
    link.download = 'CV_Aniruddha_Jadhav.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== COPY EMAIL TO CLIPBOARD =====
function copyEmail(email = 'jadhavaniruddha11@gmail.com') {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
}

// ===== PRINT PAGE =====
function printPage() {
    window.print();
}
