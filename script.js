// script.js

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a, .mobile-menu a');

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    mobileMenu.classList.toggle('hidden');
    
    // Toggle body scroll when menu is open
    if (mobileMenu.classList.contains('hidden')) {
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = 'auto';
        }
    });
});

// Sticky header and active section highlighting
window.onscroll = () => {
    // Sticky header
    const header = document.querySelector('header');
    header.classList.toggle('bg-black/80', window.scrollY > 100);
    
    // Active section highlighting
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}], .mobile-menu a[href*=${id}]`).classList.add('active');
            });
        }
    });
};

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuIcon.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('bx-x');
        document.body.style.overflow = 'auto';
    }
});

// Typing animation - Fixed version
function initTypingAnimation() {
    const textElement = document.querySelector('.text-animation');
    if (!textElement) return;
    
    const words = ["Frontend Developer", "UI Designer", "Web Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Set initial static text
    textElement.innerHTML = "I'm a <span class='typing-container'><span class='typing-text'></span><span class='cursor'></span></span>";
    
    const typingText = textElement.querySelector('.typing-text');
    const cursor = textElement.querySelector('.cursor');
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting
            charIndex--;
            typingText.textContent = currentWord.substring(0, charIndex);
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 50);
            }
        } else {
            // Typing
            charIndex++;
            typingText.textContent = currentWord.substring(0, charIndex);
            
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else {
                setTimeout(type, 100);
            }
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(type, 1000);
    
    // Cursor blink animation
    setInterval(() => {
        cursor.classList.toggle('opacity-0');
    }, 500);
}

// Responsive adjustments
function handleResponsive() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    if (window.innerWidth < 768) {
        homeSection.classList.remove('gap-36');
        homeSection.classList.add('flex-col', 'text-center', 'items-center', 'gap-8', 'pt-40');
        
        // Center content on mobile
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
            homeContent.classList.add('items-center', 'text-center');
        }
        
        // Adjust image size on mobile
        const homeImg = document.querySelector('.home-img img');
        if (homeImg) {
            homeImg.classList.remove('w-[32vw]');
            homeImg.classList.add('w-64', 'h-64');
        }
        
        // Adjust button group on mobile
        const btnGroup = document.querySelector('.btn-group');
        if (btnGroup) {
            btnGroup.classList.remove('flex-row');
            btnGroup.classList.add('flex-col', 'gap-4');
        }
    } else {
        homeSection.classList.remove('flex-col', 'text-center', 'items-center', 'gap-8', 'pt-40');
        homeSection.classList.add('gap-36');
        
        // Reset home content alignment
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
            homeContent.classList.remove('items-center', 'text-center');
        }
        
        // Reset image size
        const homeImg = document.querySelector('.home-img img');
        if (homeImg) {
            homeImg.classList.add('w-[32vw]');
            homeImg.classList.remove('w-64', 'h-64');
        }
        
        // Reset button group
        const btnGroup = document.querySelector('.btn-group');
        if (btnGroup) {
            btnGroup.classList.add('flex-row');
            btnGroup.classList.remove('flex-col', 'gap-4');
        }
    }
}

// Scroll reveal animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.portfolio-item, .timeline-item');
    
    function reveal() {
        reveals.forEach(item => {
            const windowHeight = window.innerHeight;
            const revealTop = item.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
}

// Smooth scrolling for all links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    handleResponsive();
    initScrollReveal();
    initSmoothScrolling();
    
    // Add resize listener for responsive adjustments
    window.addEventListener('resize', handleResponsive);
});

// Tailwind config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#080808',
                secondary: '#131313',
                accent: '#00ffee',
            },
            animation: {
                'cursor': 'cursor 0.6s linear infinite',
            },
            keyframes: {
                cursor: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 }
                }
            }
        }
    }
}