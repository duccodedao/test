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

window.Telegram.WebApp.ready(); // Đảm bảo WebApp đã sẵn sàng

// Lấy thông tin người dùng nếu có sẵn
if (Telegram.WebApp.initDataUnsafe) {
    let user = Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let userName = user.username || "N/A"; // Lấy username, nếu không có thì hiển thị "N/A"
        let fullName = user.first_name + " " + (user.last_name || "");
        let avatarUrl = user.photo_url || 'logo-coin/bmlogo.jpg'; // Sử dụng ảnh mặc định nếu không có avatar

        // Cập nhật vào phần HTML
        document.getElementById('user-name').textContent = fullName;
        document.getElementById('user-username').textContent = `@${userName}`; // Hiển thị username
        document.getElementById('user-avatar').src = avatarUrl;
    } else {
        // Trường hợp không có thông tin người dùng
        document.getElementById('user-name').textContent = "Loading...";
        document.getElementById('user-username').textContent = ""; // Ẩn username
        document.getElementById('user-avatar').src = 'logo-coin/bmlogo.jpg';
    }
} else {
    console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
}

// Hiển thị nút thay đổi ảnh khi nhấn vào avatar
function showUploadButton() {
    document.getElementById('upload-button').style.display = 'inline-block'; // Hiện nút
}

// Thay đổi ảnh đại diện
function changeAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('user-avatar').src = e.target.result; // Cập nhật ảnh
            document.getElementById('upload-button').style.display = 'none'; // Ẩn nút sau khi thay đổi
        };
        reader.readAsDataURL(file);
    }
}
