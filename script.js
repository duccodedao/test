// Import SDK TON Connect
const tonConnect = new TonConnect();

// Gán sự kiện cho nút kết nối ví
document.getElementById("connect-btn").addEventListener("click", async function() {
    try {
        // Hiển thị danh sách ví có sẵn để kết nối
        const wallets = await tonConnect.getWallets();

        // Render các lựa chọn ví trong modal
        const walletOptionsContainer = document.getElementById('wallet-options');
        walletOptionsContainer.innerHTML = ''; // Xóa các ví đã render trước đó
        wallets.forEach(wallet => {
            const walletIcon = document.createElement('img');
            walletIcon.src = wallet.image;
            walletIcon.alt = wallet.name;
            walletIcon.addEventListener('click', () => connectWallet(wallet));
            walletOptionsContainer.appendChild(walletIcon);
        });

        // Hiển thị modal
        document.getElementById("wallet-modal").classList.remove("hidden");
    } catch (error) {
        console.error("Lỗi khi lấy danh sách ví:", error);
    }
});

// Kết nối với ví được chọn
async function connectWallet(wallet) {
    try {
        await tonConnect.connect(wallet);

        // Lấy địa chỉ ví và số dư
        const address = tonConnect.account.address;
        const balance = await tonConnect.getBalance();

        // Hiển thị thông tin ví
        document.getElementById('wallet-address').innerText = address;
        document.getElementById('wallet-balance').innerText = `${balance / 1e9} TON`;

        // Ẩn modal sau khi kết nối thành công
        document.getElementById("wallet-modal").classList.add("hidden");
        document.getElementById("wallet-info").classList.remove("hidden");
        document.getElementById("connect-btn").classList.add("hidden");  // Ẩn nút connect khi đã kết nối
    } catch (error) {
        console.error("Lỗi khi kết nối ví:", error);
    }
}

// Đóng modal khi nhấn nút đóng
document.getElementById("close-modal").addEventListener("click", function() {
    document.getElementById("wallet-modal").classList.add("hidden");
});

// Hủy kết nối ví
document.getElementById("disconnect-btn").addEventListener("click", async function() {
    try {
        await tonConnect.disconnect(); // Hủy kết nối

        // Ẩn thông tin ví và hiện nút kết nối lại
        document.getElementById("wallet-info").classList.add("hidden");
        document.getElementById("connect-btn").classList.remove("hidden");
    } catch (error) {
        console.error("Lỗi khi hủy kết nối:", error);
    }
});
