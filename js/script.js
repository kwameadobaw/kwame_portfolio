// Theme initialization is now handled by inline script in the head
// to prevent flash of unstyled content

// Additional theme setup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Theme is already applied, just ensure UI elements match the current theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Update toggle position to match current theme
        if (isDarkMode) {
            themeToggle.classList.add('active');
        }
    }
    
    // Initialize the enhanced skills section
    setupSkillsSection();
    
    // Call animateSkills once on page load
    animateSkills();
});

// Add scroll event listener for skill animations
window.addEventListener('scroll', animateSkills);

// Enhanced custom cursor with developer-style effects
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Create cursor trail elements
let trail = [];
const trailLength = 8; // Increased trail length for better effect

function createTrailElement() {
    const element = document.createElement('div');
    element.className = 'cursor-trail';
    document.body.appendChild(element);
    return element;
}

// Initialize trail elements
for (let i = 0; i < trailLength; i++) {
    trail.push({
        element: createTrailElement(),
        x: 0,
        y: 0,
        delay: i * 40 // Staggered delay for smoother trail
    });
}

// Mouse movement handler with physics-based smoothing and position persistence
let mouseX = parseInt(localStorage.getItem('cursorX')) || window.innerWidth / 2;
let mouseY = parseInt(localStorage.getItem('cursorY')) || window.innerHeight / 2;
let cursorX = mouseX, cursorY = mouseY;

window.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Store cursor position in localStorage
    localStorage.setItem('cursorX', mouseX);
    localStorage.setItem('cursorY', mouseY);
});

// Initialize cursor position on page load
document.addEventListener('DOMContentLoaded', function() {
    cursorX = mouseX;
    cursorY = mouseY;
    cursorDot.style.left = `${cursorX}px`;
    cursorDot.style.top = `${cursorY}px`;
    cursorOutline.style.left = `${cursorX}px`;
    cursorOutline.style.top = `${cursorY}px`;
});

// Animation loop for smoother cursor movement
function animateCursor() {
    // Apply easing for smoother movement
    const easing = 0.2;
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    // Update main cursor elements
    cursorDot.style.left = `${cursorX}px`;
    cursorDot.style.top = `${cursorY}px`;
    cursorOutline.style.left = `${cursorX}px`;
    cursorOutline.style.top = `${cursorY}px`;
    
    // Update trail elements with staggered delay
    trail.forEach((point, index) => {
        setTimeout(() => {
            const scale = 1 - (index / trail.length) * 0.7;
            const opacity = 1 - (index / trail.length) * 0.9;
            const hue = (index * 10) % 360; // Color variation in the trail
            
            point.x = cursorX;
            point.y = cursorY;
            
            point.element.style.left = `${point.x}px`;
            point.element.style.top = `${point.y}px`;
            point.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
            point.element.style.opacity = opacity;
            point.element.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.5)`;
        }, point.delay);
    });
    
    requestAnimationFrame(animateCursor);
}

// Start the animation loop
animateCursor();

// Enhanced cursor effects on hover with more interactive feedback
const hoverElements = document.querySelectorAll('a, button, .theme-toggle, .service-card, .portfolio-item, .form-control, .skill-bar, .submit-btn');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Expand cursor and change appearance
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursorOutline.style.borderColor = '#6c63ff';
        cursorOutline.style.borderWidth = '1px';
        cursorOutline.style.opacity = '0.7';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorDot.style.opacity = '0.8';
        cursorDot.style.mixBlendMode = 'difference';
        
        // Add subtle pulse animation
        cursorOutline.style.animation = 'pulse 1.5s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        // Reset cursor appearance
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = '';
        cursorOutline.style.borderWidth = '2px';
        cursorOutline.style.opacity = '1';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.opacity = '1';
        cursorDot.style.mixBlendMode = 'normal';
        
        // Remove pulse animation
        cursorOutline.style.animation = '';
    });
});

// Add pulse animation keyframes to the document
if (!document.getElementById('cursor-animations')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'cursor-animations';
    styleElement.textContent = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1.5); }
            50% { transform: translate(-50%, -50%) scale(1.8); }
            100% { transform: translate(-50%, -50%) scale(1.5); }
        }
    `;
    document.head.appendChild(styleElement);
}


// Theme toggle functionality
// Define the toggle function globally so it can be called from anywhere
function toggleTheme() {
    // Toggle dark mode class on both body and documentElement for consistency
    document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
    
    // Update toggle button visual state
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.classList.toggle('active');
    }
    
    // Save theme preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        // Apply dark mode styles immediately to prevent flash
        document.head.querySelector('#theme-initializer') || document.head.insertAdjacentHTML('afterbegin', 
            '<style id="theme-initializer">:root{--primary-color:#8c83ff;--secondary-color:#6d64f9;--text-color:#f0f0f0;--bg-color:#121212;--card-bg:#1e1e1e;--border-color:#333;--shadow-color:rgba(0,0,0,0.3);--header-bg:rgba(18,18,18,0.95);--footer-bg:#1a1a1a;}body{background-color:#121212;color:#f0f0f0;}</style>');
    } else {
        localStorage.setItem('theme', 'light');
        // Remove dark mode styles if present
        const initializer = document.head.querySelector('#theme-initializer');
        if (initializer) initializer.remove();
    }
}

// Add click event listeners to all theme toggles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
});


// Enhanced skills section with code editor styling
function setupSkillsSection() {
    const skillsContainer = document.querySelector('.skills-container');
    
    if (skillsContainer) {
        // Add file name element to the skills container
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = 'skills.js';
        skillsContainer.appendChild(fileName);
        
        // Add a comment header to the skills container
        const commentHeader = document.createElement('div');
        commentHeader.className = 'code-comment-header';
        // commentHeader.innerHTML = '/**<br> * Developer skills<br> * Proficiency levels<br> */';
        skillsContainer.insertBefore(commentHeader, skillsContainer.firstChild.nextSibling);
        
        // Add syntax highlighting classes to skill names
        const skillNames = document.querySelectorAll('.skill-name');
        skillNames.forEach((name, index) => {
            // Add typing animation delay based on index
            name.style.setProperty('--index', index);
            
            // Add code comment to each skill
            const comment = document.createElement('span');
            comment.className = 'code-comment';
            comment.textContent = ` // ${name.textContent} proficiency`;
            name.parentNode.appendChild(comment);
        });
    }
}

// Animate skill bars on scroll with enhanced effects
function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const skillBars = document.querySelectorAll('.skill-per');
        const skillNames = document.querySelectorAll('.skill-name');
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            // Animate skill bars with sequential timing
            skillBars.forEach((skill, index) => {
                setTimeout(() => {
                    const per = skill.getAttribute('per');
                    skill.style.width = per;
                    skill.classList.add('animate');
                }, index * 150); // Staggered animation
            });
            
            // Add typing animation to skill names
            skillNames.forEach((name, index) => {
                setTimeout(() => {
                    name.classList.add('typing-animation');
                }, index * 200);
            });
        }
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation for contact form with enhanced terminal effects
const contactForm = document.querySelector('.contact-form form');

// Add terminal-like typing effects to form inputs
const formInputs = document.querySelectorAll('.form-control');
if (formInputs) {
    formInputs.forEach(input => {
        // Add typing sound effect simulation
        input.addEventListener('input', function() {
            // Add a subtle visual feedback when typing
            this.style.backgroundColor = 'rgba(108, 99, 255, 0.08)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        });
        
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('active-input');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('active-input');
        });
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Client-side validation before FormSubmit handles the submission
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (!name.value.trim()) {
            e.preventDefault();
            valid = false;
            showError(name, 'Name is required');
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            e.preventDefault();
            valid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            e.preventDefault();
            valid = false;
            showError(email, 'Please enter a valid email');
        } else {
            removeError(email);
        }
        
        if (!message.value.trim()) {
            e.preventDefault();
            valid = false;
            showError(message, 'Message is required');
        } else {
            removeError(message);
        }
        
        // If valid, FormSubmit will handle the form submission
        // No need to prevent default or manually submit
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.style.borderColor = 'red';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '';
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Set home as active if we're at the root
    if (currentPage === '' || currentPage === 'index.html') {
        navLinks[0].classList.add('active');
    }
}

// Initialize functions on page load
window.addEventListener('load', () => {
    setActiveNavLink();
});

// Run animations on scroll
window.addEventListener('scroll', () => {
    animateSkills();
});

// Run once on initial load
animateSkills();