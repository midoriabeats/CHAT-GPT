import TelegramBot from 'node-telegram-bot-api'
import OpenAI from 'openai';

const bot = new TelegramBot('TELEGRAM_TOKEN', { polling: true })

const chatGpt = new OpenAI.Chat('OPENAI_KEY')

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Приветствую! Я мудрец, готов общаться с тобой.');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const input = msg.text;

    try {
        const response = await chatGpt.complete(input);
        const answer = response.choices[0].text.trim();
        bot.sendMessage(chatId, answer);
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, 'Произошла ошибка при обработке запроса. Попробуйте позже.');
    }
});

export const openai = chatGpt