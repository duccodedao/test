<?php
// Token Telegram bot
$botToken = "7216136246:AAH_uaUahmiqaxpihIPiE6fgBUkwNR7y03A";

// Lấy dữ liệu từ webhook
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Kiểm tra nếu người dùng gửi /start
if (isset($update["message"]["text"]) && $update["message"]["text"] == "/start") {
    $chatId = $update["message"]["chat"]["id"];

    // Chuẩn bị nút bấm (Inline Keyboard)
    $keyboard = [
        "inline_keyboard" => [
            [
                ["text" => "Start App", "url" => "https://t.me/bmassk3_bot/BmassK3"]
            ],
            [
                ["text" => "Nạp Crypto", "url" => "https://t.me/buycoinvn_bmasshd_bot/app"]
            ],
            [
                ["text" => "Channel", "url" => "https://t.me/bmassk3_channel"]
            ]
        ]
    ];

    // Chuẩn bị dữ liệu để gửi lại
    $data = [
        "chat_id" => $chatId,
        "photo" => "https://bmasshd.click/logo/bm.png",  // URL hình ảnh
        "caption" => "Chào mừng bạn đến với bot của chúng tôi! Hãy chọn một trong các lựa chọn dưới đây.",
        "reply_markup" => json_encode($keyboard)
    ];

    // Gửi ảnh kèm nút bằng API Telegram
    $url = "https://api.telegram.org/bot$botToken/sendPhoto";
    file_get_contents($url . "?" . http_build_query($data));
}
?>
