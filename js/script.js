document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#site-header') && !e.target.closest('.mobile-menu')) {
            mobileMenu.classList.remove('open');
        }
    });

    // Sign Up Modal
    const signUpModal = document.getElementById('signUpModal');
    const navSignUp = document.getElementById('nav-signup');
    const closeBtn = document.querySelector('.close');
    const signUpForm = document.getElementById('signUpForm');

    navSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        signUpModal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        signUpModal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === signUpModal) {
            signUpModal.classList.remove('show');
        }
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const email = signUpForm.querySelector('input[type="email"]').value;
        const originalHTML = signUpForm.innerHTML;
        signUpForm.innerHTML = `<div style="text-align: center; color: #38C4DC;"><h3>✓ Success!</h3><p>Check your inbox at <strong>${email}</strong></p></div>`;
        
        setTimeout(() => {
            signUpForm.innerHTML = originalHTML;
            signUpModal.classList.remove('show');
            signUpForm.reset();
        }, 2000);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Scroll animation for hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });

    // Add active state to nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
