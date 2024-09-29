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
    favoriteAppsContainer.innerHTML = ''; // Xóa nội dung cũ

    favorites.forEach(app => {
        // Tạo thẻ chứa logo, tên và link của ứng dụng yêu thích
        favoriteAppsContainer.innerHTML += `
            <div class="app">
                <a href="${app.link}" target="_blank">
                    <img src="${app.image}" alt="${app.name}" class="app-logo">
                </a>
                <span>${app.name}</span>
            </div>`;
    });
}

// Xử lý khi bấm vào icon trái tim
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart')) {
        let appContainer = event.target.closest('.app'); // Tìm thẻ .app gần nhất
        let appName = appContainer.querySelector('span').textContent.trim(); // Lấy tên app từ span
        let appImageSrc = appContainer.querySelector('img').src; // Lấy link ảnh từ src
        let appLink = appContainer.querySelector('a').href; // Lấy link từ href
        let favorites = loadFavorites();

        let favoriteIndex = favorites.findIndex(fav => fav.name === appName);

        if (favoriteIndex !== -1) {
            // Nếu app đã có trong yêu thích, thì bỏ đi
            favorites.splice(favoriteIndex, 1);
            event.target.textContent = '♡'; // Thay đổi icon về chưa chọn
        } else {
            // Nếu chưa có thì thêm vào danh sách yêu thích với tất cả dữ liệu
            favorites.push({ name: appName, image: appImageSrc, link: appLink });
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
        let appContainer = heart.closest('.app');
        let appName = appContainer.querySelector('span').textContent.trim();
        if (favorites.some(fav => fav.name === appName)) {
            heart.textContent = '♥';
        }
    });
};
