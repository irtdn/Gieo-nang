// 1. Thay đổi nền Navbar
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Menu Mobile
document.getElementById('mobile-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// 3. Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// =========================================
// 4. MOUSE PARALLAX TẠI HERO SECTION
// (Các layer di chuyển nhẹ ngược hướng chuột)
// =========================================
const heroSection = document.getElementById('hero-magic');
const parallaxLayers = document.querySelectorAll('.parallax-layer');

if(heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        // Lấy tọa độ chuột
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const xPos = x * speed * 100;
            const yPos = y * speed * 100;
            
            // Di chuyển mượt mà bằng translate
            layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });

    // Reset vị trí khi chuột rời đi
    heroSection.addEventListener('mouseleave', () => {
        parallaxLayers.forEach(layer => {
            layer.style.transform = `translate(0px, 0px)`;
        });
    });
}

// =========================================
// 5. LIGHTBOX CHO HOẠT ĐỘNG 2 (MASONRY GRID)
// =========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const masonryItems = document.querySelectorAll('.lightbox-trigger');

if(lightbox) {
    // Mở ảnh to khi click
    masonryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = item.src; 
            document.body.style.overflow = 'hidden'; // Khóa cuộn
        });
    });

    // Đóng lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target !== lightboxImg) {
            closeLightbox();
        }
    });
}