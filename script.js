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



window.Telegram.WebApp.ready(); // Đảm bảo WebApp đã sẵn sàng

// Danh sách ảnh đại diện hoạt họa ngẫu nhiên
const avatars = [
    'avatars/avatar1.png',
    'avatars/avatar2.png',
    'avatars/avatar3.png',
    'avatars/avatar4.png',
    'avatars/avatar5.png'
];

// Hàm lấy ảnh ngẫu nhiên
function getRandomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
}

// Lấy thông tin người dùng nếu có sẵn
if (Telegram.WebApp.initDataUnsafe) {
    let user = Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let userName = user.first_name + " " + (user.last_name || "");
        let avatarUrl = user.photo_url || getRandomAvatar(); // Sử dụng ảnh ngẫu nhiên nếu không có avatar

        // Cập nhật vào phần HTML
        document.getElementById('user-name').textContent = userName;
        document.getElementById('user-avatar').src = avatarUrl;
    } else {
        // Trường hợp không có thông tin người dùng
        document.getElementById('user-name').textContent = "Loading...";
        document.getElementById('user-avatar').src = getRandomAvatar();
    }
} else {
    console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
}

// Xử lý khi người dùng tải lên ảnh đại diện
document.getElementById('avatar-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Hiển thị ảnh đại diện đã được tải lên
            document.getElementById('user-avatar').src = e.target.result;

            // Lưu ảnh đại diện vào localStorage (nếu muốn giữ lại sau khi reload)
            localStorage.setItem('customAvatar', e.target.result);
        };

        reader.readAsDataURL(file); // Đọc file ảnh dưới dạng URL
    }
});

// Kiểm tra xem có ảnh đại diện đã lưu trong localStorage hay không
window.onload = function() {
    const savedAvatar = localStorage.getItem('customAvatar');
    if (savedAvatar) {
        document.getElementById('user-avatar').src = savedAvatar;
    }
};
