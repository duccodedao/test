document.getElementById("connect-btn").addEventListener("click", () => {
    // Tạo URL kết nối với ví TON qua TON Connect
    const tonConnectUrl = `https://tonkeeper.app/ton-connect`;
    
    // Mở liên kết trong trình duyệt hoặc Telegram (nếu hỗ trợ)
    window.open(tonConnectUrl, "_blank");
});
