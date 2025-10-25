import axios from "axios";

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_IDS = import.meta.env.VITE_TELEGRAM_CHAT_ID.split(","); // 🧩 array id

export async function sendTelegramNotification(message: string) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    // kirim ke semua chat_id
    await Promise.all(
      CHAT_IDS.map((id: string) =>
        axios.post(url, {
          chat_id: id.trim(),
          text: message,
          parse_mode: "HTML",
        })
      )
    );

    console.log("✅ Pesan terkirim ke semua ID Telegram");
  } catch (error) {
    console.error("❌ Gagal mengirim pesan ke Telegram:", error);
  }
}
