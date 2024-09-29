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



// Kiểm tra Telegram WebApp đã sẵn sàng
window.Telegram.WebApp.ready();

// Kiểm tra initDataUnsafe có dữ liệu không
let initData = Telegram.WebApp.initDataUnsafe;
console.log(initData); // In ra console để kiểm tra dữ liệu trả về

// Kiểm tra user và photo_url có tồn tại không
if (initData && initData.user) {
    let user = initData.user;

    // Kiểm tra và lấy ảnh đại diện từ photo_url (nếu có)
    let avatarUrl = user.photo_url ? user.photo_url : 'default_avatar.png'; // Nếu không có avatar thì sử dụng ảnh mặc định
    let userName = user.first_name || 'Guest';

    // Cập nhật giao diện người dùng
    document.getElementById('user-avatar').src = avatarUrl;
    document.getElementById('user-name').textContent = userName;

    // In ra console thông tin người dùng để kiểm tra
    console.log("User name:", userName);
    console.log("Avatar URL:", avatarUrl);
} else {
    console.error("Không tìm thấy thông tin người dùng từ Telegram WebApp API.");
}
