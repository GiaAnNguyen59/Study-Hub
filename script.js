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
