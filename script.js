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
        // Tạo thẻ chứa logo và tên của ứng dụng yêu thích
        favoriteAppsContainer.innerHTML += `
            <div class="app">
                <img src="https://bmasshd.click/logo/${app}.png" alt="${app}" class="app-logo">
                <span>${app}</span>
            </div>`;
    });
}

// Xử lý khi bấm vào icon trái tim
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart')) {
        let app = event.target.getAttribute('data-app');
        let favorites = loadFavorites();

        if (favorites.includes(app)) {
            // Nếu app đã có trong yêu thích, thì bỏ đi
            favorites = favorites.filter(fav => fav !== app);
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
        let app = heart.getAttribute('data-app');
        if (favorites.includes(app)) {
            heart.textContent = '♥';
        }
    });
};
