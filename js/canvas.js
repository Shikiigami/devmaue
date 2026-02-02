const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('view-work-btn');

let stars = [];
let ships = [];
let ufos = []; // New array for UFOs
let isHovering = false;
let mouseX = 0;
let mouseY = 0;

// 1. Load Images
const shipImg = new Image();
shipImg.src = './images/spaceship.png'; 

const ufoImg = new Image();
ufoImg.src = './images/ufo.png'; 

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
});

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
    }
    update() {
        let speed = isHovering ? 8 : 1; 
        this.x += this.baseSpeedX * speed;
        this.y += this.baseSpeedY * speed;

        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? '#22d3ee' : 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
    }
}

class Spaceship {
    constructor() {
        this.reset();
        this.pulse = 0; 
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.scale = Math.random() * 0.4 + 0.2; 
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.angle = Math.atan2(this.vy, this.vx);
    }
    update() {
        let speedMultiplier = isHovering ? 15 : 1;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        this.pulse += 0.05;

        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
    }
    draw() {
        if (isHovering) {
            ctx.save();
            ctx.beginPath();
            let trailLen = 30;
            let grad = ctx.createLinearGradient(this.x, this.y, this.x - this.vx * trailLen, this.y - this.vy * trailLen);
            grad.addColorStop(0, 'rgba(34, 211, 238, 0.6)');
            grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 4 * this.scale;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.vx * trailLen, this.y - this.vy * trailLen);
            ctx.stroke();
            ctx.restore();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        
        if (isHovering) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 + Math.sin(this.pulse) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, 60 * this.scale + Math.sin(this.pulse) * 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.rotate(this.angle + Math.PI / 2); 
        ctx.scale(this.scale, this.scale);

        if (isHovering) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#0ea5e9';
        }

        const size = 80;
        ctx.drawImage(shipImg, -size / 2, -size / 2, size, size);
        ctx.restore();
    }
}

// --- NEW UFO CLASS ---
class UFO {
    constructor() {
        this.reset();
        this.time = Math.random() * 100;
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.scale = Math.random() * 0.3 + 0.2;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }
    update() {
        let speed = isHovering ? 10 : 1;
        this.time += 0.05;
        
        // UFOs move with a slight wobble (sine wave)
        this.x += (this.vx + Math.sin(this.time) * 0.5) * speed;
        this.y += (this.vy + Math.cos(this.time) * 0.5) * speed;

        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // UFO specific glow
        if (isHovering) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#f472b6'; // Pinkish glow for UFOs
            
            // Abduction beam effect (faint)
            ctx.fillStyle = 'rgba(34, 211, 238, 0.1)';
            ctx.beginPath();
            ctx.moveTo(-10, 10);
            ctx.lineTo(10, 10);
            ctx.lineTo(25, 60);
            ctx.lineTo(-25, 60);
            ctx.fill();
        }

        ctx.scale(this.scale, this.scale);
        const size = 90;
        ctx.drawImage(ufoImg, -size / 2, -size / 2, size, size);
        ctx.restore();
    }
}

function drawConstellations() {
    const maxDistance = 120;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                ctx.strokeStyle = isHovering 
                    ? `rgba(34, 211, 238, ${1 - dist / maxDistance})` 
                    : `rgba(255, 255, 255, ${(1 - dist / maxDistance) * 0.2})`;
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
            }
        }
    }
}

function drawVignette() {
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.1,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.9
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setup() {
    initCanvas();
    stars = [];
    for (let i = 0; i < 80; i++) stars.push(new Star());
    
    ships = [];
    for (let i = 0; i < 3; i++) ships.push(new Spaceship());
    
    ufos = [];
    for (let i = 0; i < 2; i++) ufos.push(new UFO());
}

btn.addEventListener('mouseenter', () => { isHovering = true; });
btn.addEventListener('mouseleave', () => { isHovering = false; });

function animate() {
    ctx.fillStyle = isHovering ? 'rgba(5, 10, 20, 0.4)' : 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(-mouseX, -mouseY);

    drawConstellations();

    stars.forEach(s => {
        s.update();
        s.draw();
    });

    if (shipImg.complete) {
        ships.forEach(ship => {
            ship.update();
            ship.draw();
        });
    }

    if (ufoImg.complete) {
        ufos.forEach(ufo => {
            ufo.update();
            ufo.draw();
        });
    }

    ctx.restore();
    drawVignette();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', setup);
// Wait for both images to load
Promise.all([
    new Promise(r => shipImg.onload = r),
    new Promise(r => ufoImg.onload = r)
]).then(setup);

animate();