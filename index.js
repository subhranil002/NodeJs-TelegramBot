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

bot.on("text", (msg) => {
    switch (msg.text) {
        case "/start":
            bot.sendMessage(msg.chat.id, "Hello! ... I'm Subhranil's Bot!");
            break;
        case "/secretMessage":
            bot.sendMessage(
                msg.chat.id,
                `
            To send a secret message to Subhranil
Use - 
                `
            );
            bot.sendMessage(msg.chat.id, "SecretMessage: <message>");
            break;
        case "/contact":
            bot.sendMessage(
                msg.chat.id,
                `
            Linkedin - https://www.linkedin.com/in/subhranilchakraborty/
GitHub - https://github.com/subhranil002
Facebook - https://www.facebook.com/TheSubhranilChakraborty/

I Hope This Helps :)
            `
            );
            break;
        case "/help":
            bot.sendMessage(
                msg.chat.id,
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
            const regex = /^SecretMessage:\s*(.*)$/;
            const match = regex.exec(msg.text);
            if (match) {
                const resp = match[1];
                bot.sendMessage(
                    process.env.ADMIN_CHAT_ID,
                    `
        New Secret Message: 
${resp}
        `
                );
                bot.sendMessage(msg.chat.id, "Sent to Master! 🎉");
            } else {
                bot.sendMessage(
                    msg.chat.id,
                    `I don't understand that... 😔 ... But, Master surely does 🙃 ... Try sending a secret message to Master (Subhranil) 😋 
Use - /help`
                );
            }
            break;
    }
});

export default app;
