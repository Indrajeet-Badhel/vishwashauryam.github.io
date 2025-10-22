// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        // animate bars (optional)
        navToggle.classList.toggle('open');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    // keep the scroll color behavior only when navbar is NOT in 'transparent' state
    window.addEventListener('scroll', () => {
        if (navbar.classList.contains('transparent')) return;
        navbar.style.background = window.scrollY > 100
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)';
    });
}

// make navbar transparent once the hero section is scrolled past
const hero = document.querySelector('.hero');
if (hero && navbar) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // hero visible -> remove transparent (show normal navbar)
                navbar.classList.remove('transparent');
                // restore background immediately (optional)
                navbar.style.background = window.scrollY > 100
                    ? 'rgba(255, 255, 255, 0.98)'
                    : 'rgba(255, 255, 255, 0.95)';
            } else {
                // hero not visible -> make navbar transparent
                navbar.classList.add('transparent');
                // ensure inline background cleared so CSS .transparent takes effect
                navbar.style.background = '';
            }
        });
    }, {
        root: null,
        threshold: 0,
        // adjust if you want the toggle earlier/later (height of navbar ~ 70px)
        rootMargin: '0px 0px -1px 0px'
    });

    heroObserver.observe(hero);
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]')?.value.trim();
        const email = this.querySelector('input[type="email"]')?.value.trim();
        const subject = this.querySelector('input[placeholder="Subject"]')?.value.trim();
        const message = this.querySelector('textarea')?.value.trim();

        if (name && email && subject && message) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Gallery Image Click Handler
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function () {
        console.log('Gallery image clicked:', this.alt);
        // Future: Add lightbox functionality here
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Carousel Functionality
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer = null;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    current = index;
}

function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
}

function startCarousel() {
    timer = setInterval(nextSlide, 4000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        clearInterval(timer);
        showSlide(i);
        startCarousel();
    });
});

if (slides.length && dots.length) {
    showSlide(0);
    startCarousel();
}

// Mobile nav toggle - add if not already present
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    // animate bars (optional)
    toggle.classList.toggle('open');
  });

  // close nav when a link is clicked (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
        toggle.classList.remove('open');
      }
    });
  });
})();
