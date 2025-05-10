// Particle animation for homepage background
// Only initialize if we're on the homepage
if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

// Set canvas size to match window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas size
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    }

    // Update particle position
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    // Draw particle
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particle array
let particles = [];
function initParticles() {
    const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 9000), 150);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Connect particles with lines if they're close enough
function connectParticles() {
    const maxDistance = 150;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                // Set opacity based on distance
                const opacity = 1 - (distance / maxDistance);
                ctx.strokeStyle = `${particles[i].color.trim()}${Math.floor(opacity * 50)}`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    connectParticles();
    requestAnimationFrame(animate);
}

// Initialize particles and start animation
initParticles();
animate();

// Reinitialize particles when theme changes
document.addEventListener('themeChanged', () => {
    // Update particle colors
    particles.forEach(particle => {
        particle.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    });
});

} // Close the homepage conditional check