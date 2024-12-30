// Fireworks simulation
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        for (let i = 0; i < 80; i++) { // Increase the number of particles
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    update() {
        this.particles.forEach((particle) => particle.update());
    }

    draw() {
        this.particles.forEach((particle) => particle.draw());
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 2;
        this.speedX = Math.random() * 8 - 4; // Increase speed for a more dynamic effect
        this.speedY = Math.random() * 8 - 4;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.015; // Slower fading for better coverage
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const colors = ["red", "blue", "gold", "green", "purple"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push(new Firework(x, y, color));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles[0].alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// Increase the firework creation rate
setInterval(createFirework, 200); // More frequent fireworks
animate();
