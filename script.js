// script.js - Main JavaScript for NexaSite Template

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Testimonial Slider
let currentSlide = 0;

function showSlide(n) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Update current slide
    currentSlide = (n + testimonials.length) % testimonials.length;
    
    // Show current slide
    testimonials[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Dot click event
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Previous button
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Next button
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Auto slide testimonials every 5 seconds
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter Form Submission
if(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if(email) {
            // In a real application, you would send this to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for subscribing with: ${email}\nYou'll receive updates shortly.`);
            emailInput.value = '';
        }
    });
}

// CTA Button Interactions
document.querySelectorAll('.cta-button').forEach((button, index) => {
    if(index === 0) return; // Skip the first button (Get Started in hero)
    
    button.addEventListener('click', function() {
        alert('Thank you for your interest! In a real implementation, this would download the template or redirect to a purchase page.');
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show first testimonial
    showSlide(0);
    
    // Add current year to copyright
    const yearSpan = document.querySelector('#current-year') || document.createElement('span');
    yearSpan.id = 'current-year';
    yearSpan.textContent = new Date().getFullYear();
    
    const copyrightText = document.querySelector('.copyright p');
    if(copyrightText && !copyrightText.querySelector('#current-year')) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2023', '<span id="current-year">2023</span>');
    }
    
    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.feature-card, .section-title');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    setTimeout(animateOnScroll, 100);
});