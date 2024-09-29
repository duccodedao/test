// Lấy danh sách yêu thích từ localStorage
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
}

// Lưu danh sách yêu thích vào localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Hiển thị danh sách yêu thích
function displayFavorites() {
    let favorites = loadFavorites();
    let favoriteAppsContainer = document.getElementById('favorite-apps');
    favoriteAppsContainer.innerHTML = '';

    favorites.forEach(app => {
        favoriteAppsContainer.innerHTML += `
            <div class="app">
                <a href="${app.href}" target="_blank">
                    <img src="${app.src}" alt="${app.name}">
                </a>
                <span>${app.name} <i class="heart" data-app="${app.name}">♥</i></span>
            </div>`;
    });
}

// Xử lý khi bấm vào icon trái tim
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart')) {
        let appElement = event.target.closest('.app');
        let app = {
            name: event.target.getAttribute('data-app'),
            src: appElement.querySelector('img').getAttribute('src'),
            href: appElement.querySelector('a').getAttribute('href')
        };
        let favorites = loadFavorites();

        // Kiểm tra nếu ứng dụng đã được yêu thích
        let existingAppIndex = favorites.findIndex(fav => fav.name === app.name);

        if (existingAppIndex !== -1) {
            // Nếu app đã có trong yêu thích, thì bỏ đi
            favorites.splice(existingAppIndex, 1);
            event.target.textContent = '♡'; // Thay đổi icon về chưa chọn
        } else {
            // Nếu chưa có thì thêm vào
            favorites.push(app);
            event.target.textContent = '♥'; // Thay đổi icon thành chọn
        }

        saveFavorites(favorites);
        displayFavorites(); // Cập nhật lại danh sách yêu thích
    }
});

// Hiển thị danh sách yêu thích khi load trang
window.onload = function() {
    displayFavorites();
    // Đặt trạng thái icon yêu thích khi trang được tải
    let favorites = loadFavorites();
    document.querySelectorAll('.heart').forEach(heart => {
        let appName = heart.getAttribute('data-app');
        if (favorites.some(app => app.name === appName)) {
            heart.textContent = '♥';
        }
    });
};



// Kiểm tra nếu Telegram Web App API có sẵn
if (window.Telegram.WebApp) {
    // Lấy dữ liệu từ initDataUnsafe
    let tgWebAppData = Telegram.WebApp.initDataUnsafe.user;

    // Nếu có dữ liệu người dùng
    if (tgWebAppData) {
        let userName = tgWebAppData.first_name + " " + (tgWebAppData.last_name || "");
        let avatarUrl = tgWebAppData.photo_url || 'default_avatar.png'; // Nếu không có avatar thì dùng ảnh mặc định

        // Hiển thị tên và avatar trong phần header
        document.getElementById('user-name').textContent = userName;
        document.getElementById('user-avatar').src = avatarUrl;
    } else {
        // Nếu không có dữ liệu người dùng, hiển thị thông báo hoặc dùng giá trị mặc định
        document.getElementById('user-name').textContent = "Guest";
        document.getElementById('user-avatar').src = 'default_avatar.png';
    }
} else {
    console.error("Telegram WebApp API không khả dụng.");
}
