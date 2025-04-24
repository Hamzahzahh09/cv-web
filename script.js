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

// Initialize Tailwind config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#080808',
                secondary: '#131313',
                accent: '#00ffee',
            },
            animation: {
                'cursor': 'cursor 0.6s infinite',
                'typing': 'typing 20s steps(14) infinite',
                'words': 'words 20s infinite',
            },
            keyframes: {
                cursor: {
                    'to': { 'border-left-color': '#00ffee' }
                },
                typing: {
                    '10%, 15%, 30%, 35%, 50%, 55%, 70%, 75%, 90%, 95%': { width: '0' },
                    '5%, 20%, 25%, 40%, 45%, 60%, 65%, 80%, 85%': { width: 'calc(100% + 8px)' }
                },
                words: {
                    '0%, 20%': { content: '"Web Developer"' },
                    '21%, 40%': { content: '"Web Designer"' },
                    '41%, 60%': { content: '"UI/UX Designer"' },
                    '61%, 80%': { content: '"Frontend Developer"' },
                    '81%, 100%': { content: '"Web Developer"' }
                }
            }
        }
    }
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    window.addEventListener('scroll', reveal);

    function reveal() {
        const reveals = document.querySelectorAll('.timeline-item, .portfolio-item');

        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }
    
    // Initial check
    reveal();
});