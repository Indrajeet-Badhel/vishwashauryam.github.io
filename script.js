// Mobile Device Detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Apply mobile-specific fixes
function applyMobileFixes() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        
        // Fix gallery images on mobile
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.style.width = '90vw';
            img.style.maxWidth = '400px';
            img.style.height = '200px';
        });
        
        // Fix executive board images on mobile
        const execImages = document.querySelectorAll('.exec-image');
        execImages.forEach(img => {
            img.style.width = '140px';
            img.style.height = '160px';
            img.style.objectFit = 'cover';
        });
        
        // Fix exec members container
        const execMembers = document.querySelectorAll('.exec-member');
        execMembers.forEach(member => {
            member.style.width = '140px';
            member.style.minWidth = '140px';
        });
    }
}

// Create desktop mode popup
function createDesktopModePopup() {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        text-align: center;
        max-width: 90%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    popup.innerHTML = `
        <p style="margin: 0 0 10px 0;">For the best experience, view in landscape mode or use desktop.</p>
        <button style="
            background: white;
            color: black;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        ">Got it!</button>
    `;
    
    document.body.appendChild(popup);
    
    const button = popup.querySelector('button');
    button.addEventListener('click', () => {
        popup.remove();
        localStorage.setItem('mobile-popup-dismissed', 'true');
    });
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 10000);
}

// Show popup on mobile (only once per session)
if (isMobileDevice() && !localStorage.getItem('mobile-popup-dismissed')) {
    window.addEventListener('load', () => {
        setTimeout(createDesktopModePopup, 1000);
        applyMobileFixes();
    });
} else if (isMobileDevice()) {
    window.addEventListener('load', applyMobileFixes);
}

// Reapply fixes on window resize
window.addEventListener('resize', () => {
    if (isMobileDevice()) {
        applyMobileFixes();
    }
});

// Responsive Nav Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
});

// Carousel initializer: auto-advance slides and wire up dots
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let timer = null;

    function showSlide(index) {
        if (!slides.length || !dots.length) return;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        current = index;
    }

    function nextSlide() {
        const next = (current + 1) % slides.length;
        showSlide(next);
    }

    function startCarousel() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 4000);
    }

    if (slides.length && dots.length) {
        showSlide(0);
        startCarousel();

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                startCarousel();
            });
        });
    }
});
