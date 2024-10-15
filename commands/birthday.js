import { writeFileSync, readFileSync } from 'fs';

const BIRTHDAYS_FILE = 'birthdays.json';

const loadBirthdays = () => {
  try {
    const data = readFileSync(BIRTHDAYS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const saveBirthday = (chatId, date) => {
  const birthdays = loadBirthdays();
  birthdays[chatId] = date;
  writeFileSync(BIRTHDAYS_FILE, JSON.stringify(birthdays));
};

export default async (ctx, args) => {
  const chatId = ctx.chat.id; // Kunin ang chat ID mula sa ctx
  if (args.length < 1) {
    await ctx.reply("Usage: /birthday [DD-MM]"); // Gumamit ng ctx.reply para sa error message
    return;
  }

  const [day, month] = args[0].split('-');

  if (!day || !month) {
    await ctx.reply("Please provide a valid date in DD-MM format."); // Gumamit ng ctx.reply para sa error message
    return;
  }

  const birthdayDate = `${day}-${month}`;
  saveBirthday(chatId, birthdayDate);
  await ctx.reply(`🎉 Your birthday has been set to ${birthdayDate}! 🎉`); // Gumamit ng ctx.reply para sa result message
};

export const checkBirthdays = (bot) => {
  const birthdays = loadBirthdays();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based

  for (const chatId in birthdays) {
    if (birthdays[chatId] === `${day}-${month}`) {
      bot.sendMessage(chatId, `🎂 Happy Birthday! Wishing you a wonderful day! 🎈`);
    }
  }
};

// Check birthdays every day
setInterval(() => {
  checkBirthdays(bot);
}, 86400000); // Check every 24 hours
