// 1. Thay đổi background Navbar khi cuộn trang
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Xử lý mở/đóng Menu trên giao diện Điện thoại
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 3. Hiệu ứng Scroll Reveal (Trượt phần tử lên khi cuộn chuột tới)
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

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

// =========================================
// 4. HIỆU ỨNG HẠT NẮNG LƠ LỬNG (FLOATING PARTICLES)
// =========================================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1; 
            this.speedX = Math.random() * 1 - 0.5; 
            this.speedY = Math.random() * -1 - 0.5; 
            this.color = 'rgba(255, 255, 255, 0.8)'; 
            this.shadowBlur = Math.random() * 15 + 5; 
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowColor = '#FFD700'; 
            ctx.fill();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y + this.size < 0) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = 80; 
        if (window.innerWidth < 768) numberOfParticles = 40; 
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}