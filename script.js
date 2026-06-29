// Chờ cho toàn bộ DOM (giao diện) tải xong mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    initDynamicWelcome();
    initTileNavigation();
});

/**
 * 1. Chức năng cập nhật lời chào theo thời gian thực (Dynamic Welcome)
 */
function initDynamicWelcome() {
    const welcomeTitle = document.querySelector(".welcome-content h2");
    if (!welcomeTitle) return;

    const updateGreeting = () => {
        const hour = new Date().getHours();
        let greeting = "Welcome to Study Hub";

        if (hour >= 5 && hour < 12) {
            greeting = "☀️ Good Morning, Friend!";
        } else if (hour >= 12 && hour < 18) {
            greeting = "🌤️ Good Afternoon!";
        } else {
            greeting = "🌙 Good Evening, Ráp Đọc Sách!";
        }

        welcomeTitle.textContent = greeting;
    };

    // Chạy ngay khi load trang
    updateGreeting();
    // Cập nhật lại mỗi phút (đề phòng người dùng treo máy qua buổi khác)
    setInterval(updateGreeting, 60000);
}

// Chờ giao diện HTML tải xong hoàn toàn mới chạy code
document.addEventListener("DOMContentLoaded", () => {
    initTileNavigation();
});

/**
 * Hàm xử lý tự động điều hướng khi click vào các ô (Tiles)
 */
function initTileNavigation() {
    // Chọn tất cả các ô có class là .tile trên màn hình
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            // Kiểm tra xem ô này có chứa tiêu đề không
            const titleElement = tile.querySelector(".tile-title");
            
            // Nếu là ô đặc biệt (như ô Welcome lớn không có .tile-title), chúng ta bỏ qua không chuyển trang
            if (!titleElement) return;

            // Lấy chữ bên trong tiêu đề, ví dụ: "Class Schedule"
            // Chuyển thành chữ thường ("class schedule") và thay khoảng trắng bằng dấu gạch ngang ("class-schedule")
            const tileName = titleElement.textContent
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') // Xóa ký tự đặc biệt nếu có
                .replace(/\s+/g, '-');       // Đổi khoảng trắng thành dấu -

            // Tạo đường dẫn trỏ vào thư mục pages/
            const targetPage = `pages/${tileName}.html`;

            console.log(`Đang chuyển hướng tới: ${targetPage}`);
            
            // Lệnh chính thức để trình duyệt nhảy sang trang mới
            window.location.href = targetPage;
        });
    });
}
/* ================= RESPONSIVE FOR MOBILE ================= */
@media (max-width: 768px) {
    /* Chuyển Grid từ 4 cột của PC thành 2 cột hoặc 1 cột trên điện thoại */
    .dashboard {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 12px !important;
        padding: 12px !important;
    }

    /* Ô Welcome lớn thay vì chiếm 2 cột x 2 hàng, giờ cho chiếm hết chiều rộng */
    .tile.welcome {
        grid-column: span 2 !important;
        grid-row: span 1 !important; /* Thu nhỏ bớt hàng để đỡ chiếm chỗ */
        padding: 16px !important;
    }

    /* Tiêu đề ô Welcome nhỏ lại cho vừa màn hình */
    .welcome-content h2 {
        font-size: 20px !important;
    }

    /* Các liên kết bên dưới ô Welcome xếp dọc lại cho đỡ chật */
    .welcome-links {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    /* Thu nhỏ các icon và chữ của các ô vuông (Tiles) */
    .tile {
        padding: 16px !important;
        min-height: 110px !important; /* Giảm chiều cao tối thiểu */
    }

    .tile-icon {
        font-size: 28px !important; /* Icon nhỏ lại một chút */
    }

    .tile-title {
        font-size: 14px !important; /* Chữ nhỏ lại để không bị xuống hàng lỗi */
    }
}

@media (max-width: 480px) {
    /* Trên điện thoại siêu nhỏ (iPhone SE, dòng máy nhỏ), chuyển tất cả thành 1 cột */
    .dashboard {
        grid-template-columns: 1fr !important;
    }
    
    .tile.welcome {
        grid-column: span 1 !important;
    }
}
