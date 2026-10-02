// 1. Navbar đổi nền
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 3. Logic Tab Hoạt động 3
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        document.querySelector('.tab-panel.active').classList.remove('active');
        
        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

// 4. Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};
const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// 5. CANVAS BỤI TIÊN (FAIRY DUST)
const canvas = document.getElementById('fairyDustCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Sparkle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * -1 - 0.2;
            this.color = 'rgba(255, 215, 0, 0.8)';
            this.glow = Math.random() * 10 + 2;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.glow;
            ctx.shadowColor = '#FFB703';
            ctx.fill();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            this.draw();
        }
    }

    function initSparkles() {
        particlesArray = [];
        let num = window.innerWidth < 768 ? 40 : 100; 
        for (let i = 0; i < num; i++) {
            particlesArray.push(new Sparkle());
        }
    }

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => p.update());
        requestAnimationFrame(animateSparkles);
    }

    initSparkles();
    animateSparkles();
}