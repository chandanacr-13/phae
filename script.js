
// Mouse Parallax Effect
const floatingCircle = document.querySelector('.floating-circle');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 50 - 25;
    const y = (e.clientY / window.innerHeight) * 50 - 25;

    floatingCircle.style.transform = `translate(${x}px, ${y}px)`;
});

// Particle Animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        this.draw();
    }
}

// Create Particles
for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 4 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;
    particles.push(new Particle(x, y, size, speedX, speedY));
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => particle.update());
    requestAnimationFrame(animateParticles);
}

animateParticles();
