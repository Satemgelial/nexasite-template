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


// Newsletter Form - Universal Solution
(function() {
    // Function to handle form submission
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            // Success
            showNotification('✅ Successfully subscribed! Check your email.', 'success');
            emailInput.value = '';
            
            // Log for debugging
            console.log('Subscribed:', email);
        } else {
            // Error
            showNotification('❌ Please enter a valid email address.', 'error');
            emailInput.focus();
        }
    }
    
    // Email validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Show notification
    function showNotification(message, type) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = `newsletter-notification ${type}`;
        notification.textContent = message;
        
        // Style
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #4cc9f0, #4361ee)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #ff3860, #f72585)';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Attach event listeners on page load
    document.addEventListener('DOMContentLoaded', function() {
        const forms = document.querySelectorAll('.newsletter-form');
        console.log(`Found ${forms.length} newsletter form(s)`);
        
        forms.forEach(form => {
            form.addEventListener('submit', handleNewsletterSubmit);
        });
    });
    
    // Also try to attach immediately (in case DOM already loaded)
    const forms = document.querySelectorAll('.newsletter-form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', handleNewsletterSubmit);
        });
    }
})();

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

    
