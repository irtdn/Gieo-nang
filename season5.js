// ==========================================
// FILE: season5.js
// Kịch bản JS dành riêng cho Gieo Nắng V - Sắc Ban Mai
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // ====================================================
    // 1. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
    // ====================================================
    // Ngày khởi hành chiến dịch: 20/09/2026
    const thoiDiemKhoiHanh = new Date("2026-09-20T00:00:00").getTime();

    const boDemThoiGian = setInterval(() => {
        const thoiGianHienTai = new Date().getTime();
        const khoangCach = thoiDiemKhoiHanh - thoiGianHienTai;

        // Bắt ID theo đúng file season5.html đã tạo
        const bangDemNguoc = document.getElementById("gn5-timer");
        const theNgay = document.getElementById("days");
        const theGio = document.getElementById("hours");
        const thePhut = document.getElementById("minutes");
        const theGiay = document.getElementById("seconds");

        // Nếu đã qua ngày 20/09/2026
        if (khoangCach < 0) {
            clearInterval(boDemThoiGian);
            if (bangDemNguoc) {
                bangDemNguoc.innerHTML = "<h3 style='color: var(--navy-blue); font-family: Quicksand;'>Chuyến tàu Gieo Nắng V đã chính thức khởi hành!</h3>";
            }
            return;
        }

        // Tính toán thời gian
        const soNgay = Math.floor(khoangCach / (1000 * 60 * 60 * 24));
        const soGio = Math.floor((khoangCach % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const soPhut = Math.floor((khoangCach % (1000 * 60 * 60)) / (1000 * 60));
        const soGiay = Math.floor((khoangCach % (1000 * 60)) / 1000);

        // Xuất ra HTML (Thêm số 0 phía trước nếu bé hơn 10)
        if (theNgay && theGio && thePhut && theGiay) {
            theNgay.innerText = soNgay < 10 ? "0" + soNgay : soNgay;
            theGio.innerText = soGio < 10 ? "0" + soGio : soGio;
            thePhut.innerText = soPhut < 10 ? "0" + soPhut : soPhut;
            theGiay.innerText = soGiay < 10 ? "0" + soGiay : soGiay;
        }
    }, 1000);


    // ====================================================
    // 2. HIỆU ỨNG PARALLAX KHI CUỘN CHUỘT DÀNH CHO HERO SECTION
    // ====================================================
    const tieuDeLayer = document.querySelector(".p-layer-title");
    const nenMayLayer = document.querySelector(".p-layer-bg img");
    const haiBeLayer = document.querySelector(".p-layer-characters");

    window.addEventListener("scroll", () => {
        const viTriCuon = window.scrollY;
        
        // Giới hạn chỉ chạy hiệu ứng khi ở trong khu vực Hero (tối ưu hiệu năng)
        if (viTriCuon <= window.innerHeight) {
            
            // 1. Tiêu đề "Sắc ban mai" bay lên trên chậm rãi
            if (tieuDeLayer) {
                tieuDeLayer.style.transform = `translateY(${viTriCuon * 0.4}px)`;
            }

            // 2. Nền mây bị kéo xuống dưới tạo chiều sâu (Depth of field)
            if (nenMayLayer) {
                nenMayLayer.style.transform = `translateY(${viTriCuon * 0.2}px)`;
            }

            // 3. Hai bé đạp xe trôi xuống nhẹ nhàng
            if (haiBeLayer) {
                haiBeLayer.style.transform = `translateY(${viTriCuon * 0.1}px)`;
            }
        }
    });


    // ====================================================
    // 3. CÁC CHỨC NĂNG UI CƠ BẢN (KHÔNG THỂ THIẾU CỦA TRANG)
    // ====================================================
    
    // A. Thay đổi màu Navbar khi cuộn
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // B. Menu Mobile Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // C. Hiệu ứng xuất hiện mượt mà của các section (Scroll Reveal)
    // (Giúp Bản đồ hành trình và Thẻ thành viên bật lên khi cuộn tới)
    const cacPhanTuCanHienThi = document.querySelectorAll('.reveal-up, .reveal-slide-left, .reveal-slide-right');
    const tuyChonHienThi = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const xuLyHienThi = (danhSachPhanTu, quanSatVien) => {
        danhSachPhanTu.forEach(phanTu => {
            if (phanTu.isIntersecting) {
                phanTu.target.classList.add('active');
                quanSatVien.unobserve(phanTu.target); // Chỉ chạy 1 lần
            }
        });
    };

    const quanSatVien = new IntersectionObserver(xuLyHienThi, tuyChonHienThi);
    cacPhanTuCanHienThi.forEach(el => quanSatVien.observe(el));

});

// ====================================================
    // 4. LOGIC MODAL THƯ NGỎ GÂY QUỸ
    // ====================================================
    const modal = document.getElementById('letterModal');
    const openBtn = document.getElementById('openLetterBtn');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && openBtn && closeBtn) {
        // Mở Modal
        openBtn.addEventListener('click', () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Khóa cuộn trang nền
        });

        // Đóng Modal bằng nút X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Mở lại cuộn trang
        });

        // Đóng Modal khi bấm ra ngoài ảnh
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ====================================================
    // 5. LOGIC ACCORDION (ĐÓNG MỞ NỘI DUNG HOẠT ĐỘNG)
    // ====================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Lấy thẻ cha (accordion-item) và thẻ chứa nội dung (accordion-content)
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');

            // Nếu đang mở thì đóng lại
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } 
            // Nếu đang đóng thì mở ra
            else {
                // (Tùy chọn) Bỏ comment đoạn dưới nếu muốn khi mở tab này thì tự động đóng tab kia
                /*
                const parentSection = item.closest('.accordion-container');
                const allItems = parentSection.querySelectorAll('.accordion-item');
                allItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                });
                */

                item.classList.add('active');
                // ScrollHeight lấy chiều cao thực tế của nội dung bên trong
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });