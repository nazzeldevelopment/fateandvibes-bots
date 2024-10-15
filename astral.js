import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { handleCommand } from './handlers/commandHandler.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token);


// Welcoming message when the bot is started
bot.start((ctx) => {
  ctx.reply('Welcome to the Astral Hunters bot! Use /help to see the available commands.');
});

// Handle incoming messages
bot.on('text', (ctx) => {
  const chatId = ctx.chat.id;
  const userId = ctx.from.id;

  // Handle commands
  handleCommand(ctx.message, ctx); // Gamitin ang ctx para sa command handler
});

// Welcoming new chat members
bot.on('new_chat_members', (ctx) => {
  ctx.message.new_chat_members.forEach((member) => {
    ctx.reply(`Welcome ${member.first_name}! Use /level to check your level.`);
  });
});

// Goodbye message for left chat members
bot.on('left_chat_member', (ctx) => {
  ctx.reply(`Goodbye ${ctx.message.left_chat_member.first_name}! We'll miss you.`);
});

// Log that the bot is running
bot.launch();
console.log('Astral Bot is running...');
