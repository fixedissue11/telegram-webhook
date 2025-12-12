const axios = require("axios");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { chat_id, text } = JSON.parse(event.body);

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    await axios.post(telegramUrl, {
      chat_id: chat_id,
      text: text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Ошибка в функции:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};