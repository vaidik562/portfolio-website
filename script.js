/**
 * Vaidik Ramani - Portfolio Website
 * Interactive JavaScript functionality
 */

// ===== DOM Elements =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const typingText = document.getElementById('typing-text');
const projectsSlider = document.getElementById('projects-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const sliderDots = document.getElementById('slider-dots');

// ===== Navigation Menu Toggle =====
function toggleMenu() {
    navMenu.classList.toggle('show');
    document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
}

if (navClose) {
    navClose.addEventListener('click', toggleMenu);
}

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        toggleMenu();
    }
});

// ===== Header Scroll Effect =====
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ===== Active Navigation Link =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Back to Top Button =====
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

window.addEventListener('scroll', handleBackToTop);

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Typing Animation =====
const roles = [
    'React Native Developer',
    'Mobile App Developer',
    'Frontend Developer',
    'JavaScript Enthusiast',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next role
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
if (typingText) {
    setTimeout(typeRole, 1000);
}

// ===== Skills Progress Animation =====
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const progress = item.dataset.progress;
        const progressBar = item.querySelector('.skill-progress');

        if (progressBar) {
            progressBar.style.setProperty('--progress', `${progress}%`);
        }
    });
}

// Intersection Observer for skills animation
const skillsSection = document.querySelector('.skills');

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                        const progress = item.dataset.progress;
                        const progressBar = item.querySelector('.skill-progress');
                        if (progressBar) {
                            progressBar.style.width = `${progress}%`;
                        }
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
}

// ===== Projects Slider =====
let currentSlide = 0;
const projectCards = document.querySelectorAll('.project-card');
const totalSlides = projectCards.length;

// Create dots
function createSliderDots() {
    if (!sliderDots) return;

    sliderDots.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider__dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        sliderDots.appendChild(dot);
    }
}

function updateSlider() {
    if (!projectsSlider) return;

    const slideWidth = projectsSlider.parentElement.offsetWidth;
    const gap = 32; // var(--spacing-xl) = 2rem = 32px

    projectsSlider.style.transform = `translateX(-${currentSlide * (slideWidth + gap)}px)`;

    // Update dots
    const dots = document.querySelectorAll('.slider__dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Initialize slider
createSliderDots();

// Auto-slide every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
if (projectsSlider) {
    projectsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    projectsSlider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// ===== Contact Form Validation =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);

    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);

    if (errorElement) {
        errorElement.textContent = '';
    }
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

function validateForm() {
    let isValid = true;

    // Clear all previous errors
    ['name', 'email', 'subject', 'message'].forEach(clearError);

    // Validate name
    const name = document.getElementById('name');
    if (name && name.value.trim() === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    } else if (name && name.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    if (email && email.value.trim() === '') {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (email && !validateEmail(email.value.trim())) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message');
    if (message && message.value.trim() === '') {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (message && message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Real-time validation on blur
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        const inputId = this.id;
        clearError(inputId);

        if (this.value.trim() === '' && this.required) {
            showError(inputId, `Please enter your ${inputId}`);
        } else if (inputId === 'email' && this.value.trim() && !validateEmail(this.value.trim())) {
            showError(inputId, 'Please enter a valid email address');
        } else if (inputId === 'name' && this.value.trim().length > 0 && this.value.trim().length < 2) {
            showError(inputId, 'Name must be at least 2 characters');
        } else if (inputId === 'message' && this.value.trim().length > 0 && this.value.trim().length < 10) {
            showError(inputId, 'Message must be at least 10 characters');
        }
    });

    // Clear error on focus
    input.addEventListener('focus', function () {
        clearError(this.id);
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            // Show success message
            const successMessage = document.getElementById('form-success');
            if (successMessage) {
                successMessage.classList.add('show');

                // Reset form
                this.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        }
    });
}

// ===== Scroll Animations (Fade In) =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about__content, .skills__category, .timeline__item, .project-card, .education-card, .contact__info, .contact__form-wrapper'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ===== Particle Animation (Background) =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translate(50px, -100px) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translate(-30px, -200px) scale(0.8);
            opacity: 0.3;
        }
        75% {
            transform: translate(40px, -150px) scale(1.1);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Accordion Functionality =====
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Close all other accordion items
            accordionItems.forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    createParticles();
    handleHeaderScroll();
    handleBackToTop();
    updateActiveLink();
    initAccordion();
});

// ===== Window Resize Handler =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateSlider();
    }, 250);
});

// ===== Console Easter Egg =====
console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cThis portfolio was built with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #94a3b8;');
console.log('%c📧 Contact: ramanivaidik11@gmail.com', 'font-size: 12px; color: #22d3ee;');
