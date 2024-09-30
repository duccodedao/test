// Khởi tạo TON Connect SDK
const tonConnect = new TonConnect();

document.getElementById("connect-btn").addEventListener("click", async () => {
    try {
        // Mở hộp thoại kết nối ví
        await tonConnect.connect();

        // Lấy địa chỉ ví và hiển thị thông tin
        const account = tonConnect.wallet;
        const walletAddress = account.address;
        document.getElementById("wallet-address").innerText = walletAddress;

        // Lấy số dư
        const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC');
        const ton = new TonWeb(provider);
        const balance = await ton.getBalance(walletAddress);

        // Hiển thị số dư
        document.getElementById("balance").innerText = balance / Math.pow(10, 9); // Chuyển từ nanoTON sang TON
        document.getElementById("wallet-info").classList.remove("hidden");
    } catch (error) {
        console.error("Lỗi khi kết nối ví:", error);
    }
});
