import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.send("<h1>Bot is running...🤖</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
});

const bot = new TelegramBot(process.env.BOT_API_TOKEN, { polling: true });

if (bot) {
    console.log("Bot is running...🤖");
}

const waitingForSecretMessage = {};

bot.on("text", (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case "/start":
            waitingForSecretMessage[chatId] = false;
            bot.sendMessage(chatId, "Hello! ... I'm Subhranil's Bot!");
            break;
        case "/secretMessage":
            bot.sendMessage(
                chatId,
                `Please send me a secret message for Master ... 😋
Or if you want to cancel sending message please click - /cancel`
            );
            waitingForSecretMessage[chatId] = true;
            break;
        case "/cancel":
            if (waitingForSecretMessage[chatId]) {
                waitingForSecretMessage[chatId] = false;
                bot.sendMessage(
                    chatId,
                    `I cancelled sending message to Master ... 😔`
                );
            } else {
                bot.sendMessage(
                    chatId,
                    `I don't understand that... 😔 ... But, Master surely does 🙃 ... Try sending a secret message to Master (Subhranil) 😋 
Use - /secretMessage
Or - /help`
                );
            }
            break;
        case "/contact":
            waitingForSecretMessage[chatId] = false;
            bot.sendMessage(
                chatId,
                `
            Linkedin - https://www.linkedin.com/in/subhranilchakraborty/
GitHub - https://github.com/subhranil002
Facebook - https://www.facebook.com/TheSubhranilChakraborty/

I Hope This Helps :)
            `
            );
            break;
        case "/help":
            waitingForSecretMessage[chatId] = false;
            bot.sendMessage(
                chatId,
                `
            Hi there! Here are some activities we can do :)
    
Please follow the commands -

/start - to start conversation
/secretMessage - to send a secret message to Subhranil
/contact - contact details of Subhranil
/help - to get this menu

I Hope This Helps :)
            `
            );
            break;
        default:
            if (waitingForSecretMessage[chatId]) {
                bot.sendMessage(
                    process.env.ADMIN_CHAT_ID,
                    `New Secret Message: 
${msg.text}`
                )
                    .then(() => {
                        bot.sendMessage(chatId, "Sent to Master! 🎉");
                        waitingForSecretMessage[chatId] = false;
                    })
                    .catch((error) => {
                        console.error("Error sending message to admin:", error);
                        bot.sendMessage(
                            chatId,
                            "There was an error while sending your message. Please try again later."
                        );
                        waitingForSecretMessage[chatId] = false;
                    });
            } else {
                bot.sendMessage(
                    chatId,
                    `I don't understand that... 😔 ... But, Master surely does 🙃 ... Try sending a secret message to Master (Subhranil) 😋 
Use - /secretMessage
Or - /help`
                );
            }
            break;
    }
});

export default app;
