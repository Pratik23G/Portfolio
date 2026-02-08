// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initSkillBars();
});

function initCursor() {
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  if (!cursorDot || !cursorOutline) return;

  let x = 0, y = 0;
  let rafPending = false;

  const render = () => {
    rafPending = false;
    cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    cursorOutline.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  window.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(render);
    }
  });

  const interactiveElements = document.querySelectorAll('a, button, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.opacity = '0.6';
      cursorOutline.style.scale = '1.15';
      cursorDot.style.scale = '1.15';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.opacity = '0.5';
      cursorOutline.style.scale = '1';
      cursorDot.style.scale = '1';
    });
  });
}



// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    let lastScrollTop = 0;

    // Hide/show nav on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .contact-method');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                fill.style.width = '0%';
                
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
                
                observer.unobserve(fill);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }
});

// Console Message
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLove what you see? Let\'s build something together!', 'font-size: 14px; color: #a1a1aa;');
console.log('%c- Pratik Gurung', 'font-size: 14px; font-style: italic; color: #e4e4e7;');