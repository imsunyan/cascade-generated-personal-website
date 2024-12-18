// JavaScript for interactivity
console.log("Welcome to Sun Yan's Personal Website!");

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 25, 47, 0.98)";
    navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 25, 47, 0.85)";
    navbar.style.boxShadow = "none";
  }
});

// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 50; // Minimum scroll amount before hiding/showing
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove background based on scroll position
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Handle header hide/show
            if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
                if (currentScroll > lastScrollTop && currentScroll > 100) {
                    // Scrolling down & past header
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling up
                    header.classList.remove('header-hidden');
                }
                lastScrollTop = currentScroll;
            }
            
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Add your form submission logic here
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// Add fade-in animation for sections
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(section);
});

// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Only initialize cursor if elements exist and not on touch device
    if (cursor && cursorFollower && window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Hover effect for clickable elements
        const clickableElements = document.querySelectorAll('a, button, .logo-container, .nav-link');
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Smooth cursor animation
        function updateCursor() {
            // Smooth movement for cursor
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            // Smoother movement for follower
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;

            requestAnimationFrame(updateCursor);
        }

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Initialize cursor animation
        updateCursor();
    }
});

// Theme Switcher
const initTheme = () => {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-switch';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = '🌙'; // Default to dark theme icon

    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
    });

    // Add theme toggle to body
    document.body.appendChild(themeToggle);
};

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        document.querySelector('.theme-switch').innerHTML = e.matches ? '🌙' : '☀️';
    }
});

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);
