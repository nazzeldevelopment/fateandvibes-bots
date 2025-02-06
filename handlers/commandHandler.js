// Importing command modules
import helpCommand from '../commands/help.js';
import statusCommand from '../commands/status.js';
import pingCommand from '../commands/ping.js';
import maintenanceCommand from '../commands/maintenance.js';
import echoCommand from '../commands/echo.js';
import greetCommand from '../commands/greet.js';
import weatherCommand from '../commands/weather.js';
import jokeCommand from '../commands/joke.js';
import mathCommand from '../commands/math.js';
import rollCommand from '../commands/roll.js';
import characterCommand from '../commands/character.js';
import birthdayCommand from '../commands/birthday.js';
import coupleCommand from '../commands/couple.js';
import downloadCommand from '../commands/download.js';
import gifCommand from '../commands/gif.js';
import translateCommand from '../commands/translate.js';
import reminderCommand from '../commands/reminder.js';
import currencyCommand from '../commands/currency.js';
import lyricsCommand from '../commands/lyrics.js';
import newsCommand from '../commands/news.js';
import stocksCommand from '../commands/stocks.js';
import qrCommand from '../commands/qr.js';
import shortenCommand from '../commands/shorten.js';
import analyzeCommand from '../commands/analyze.js';
import imageEditCommand from '../commands/imageedit.js';
import flashcardCommand from '../commands/flashcard.js';
import triviaCommand from '../commands/trivia.js';
import factCommand from '../commands/fact.js';
import quoteCommand from '../commands/quote.js';
import movieCommand from '../commands/movie.js';
import bookCommand from '../commands/book.js';
import recipeCommand from '../commands/recipe.js';
import dictionaryCommand from '../commands/dictionary.js';
import podcastCommand from '../commands/podcast.js';
import confirmCommand from '../commands/confirm.js';
import subscribeCommand from '../commands/subscribe.js';
import fs from 'fs';

// Leveling logic
const levelingFilePath = './levelingData.json'; // Path for leveling data file
let leveling = {};

// Load leveling data from file
const loadLevelingData = () => {
  if (fs.existsSync(levelingFilePath)) {
    const data = fs.readFileSync(levelingFilePath, 'utf8');
    leveling = JSON.parse(data);
  }
};

// Save leveling data to file
const saveLevelingData = () => {
  fs.writeFileSync(levelingFilePath, JSON.stringify(leveling), 'utf8');
};

// Function for leveling up users
const levelUp = (msg) => {
  const userId = msg.from.id;
  const userLevelData = leveling[msg.chat.id] || {};
  const userData = userLevelData[userId] || { level: 1, experience: 0 };

  // Calculate required experience to level up
  const experienceToLevelUp = userData.level * 100;

  // Increment experience by 50 for each command used
  userData.experience += 50;

  // Check if user has enough experience to level up
  if (userData.experience >= experienceToLevelUp) {
    userData.level += 1; // Level up
    userData.experience = 0; // Reset experience after leveling up
    userLevelData[userId] = userData;
    leveling[msg.chat.id] = userLevelData; // Save leveling data
    saveLevelingData(); // Save leveling data to file

    return true; // Indicate that the user leveled up
  }

  userLevelData[userId] = userData; // Update user data
  leveling[msg.chat.id] = userLevelData; // Save leveling data
  saveLevelingData(); // Save leveling data to file
  return false; // Indicate that the user did not level up
};

// Premium status management
const premiumUsers = new Set(); // Store premium users

// Function to check if the user is premium
const isPremiumUser = (userId) => {
  return premiumUsers.has(userId);
};

// Function to add premium status
const addPremiumStatus = (userId) => {
  premiumUsers.add(userId);
  // Optional: Inform user they have been given premium status
};

// Function to remove premium status
const removePremiumStatus = (userId) => {
  premiumUsers.delete(userId);
  // Optional: Inform user they have been removed from premium status
};

// Command handler
export const handleCommand = async (msg, ctx) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const leveledUp = levelUp(msg);

  if (leveledUp) {
    ctx.reply(`🎉 Congrats! You leveled up to level ${leveling[chatId][userId].level}! 🎉`);
  }

  // Maintenance mode check
  const isAdmin = userId === parseInt(process.env.ADMIN_ID); // Check if the user is admin
  if (process.env.MAINTENANCE_MODE === 'true' && !isAdmin) {
    ctx.reply('Fate and Vibes Bot is currently in maintenance mode. Please try again later.');
    return;
  }

  // Check for premium commands
  const premiumCommands = [
    '/gif', '/translate', '/reminder', '/currency', '/lyrics', '/news',
    '/stocks', '/qr', '/shorten', '/analyze', '/imageedit', '/flashcard',
    '/trivia', '/fact', '/quote', '/movie', '/book', '/recipe',
    '/dictionary', '/podcast'
  ];

  // Check if the command is premium and the user is not a premium user
  if (premiumCommands.includes(msg.text.split(' ')[0]) && !isPremiumUser(userId)) {
    ctx.reply(`🚫 This is a premium feature. Please upgrade to premium to use this command.`);
    return;
  }

  // Command handling
  const command = msg.text.split(' ')[0];
  switch (command) {
    case '/help':
      await helpCommand(ctx);
      break;
    case '/status':
      await statusCommand(ctx);
      break;
    case '/ping':
      await pingCommand(ctx);
      break;
    case '/maintenance':
      await maintenanceCommand(ctx, userId);
      break;
    case '/echo':
      await echoCommand(ctx, msg.text.split(' ').slice(1).join(' '));
      break;
    case '/greet':
      await greetCommand(ctx);
      break;
    case '/weather':
      await weatherCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/joke':
      await jokeCommand(ctx);
      break;
    case '/math':
      await mathCommand(ctx, msg.text.split(' ').slice(1).join(' '));
      break;
    case '/roll':
      await rollCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/character':
      await characterCommand(ctx);
      break;
    case '/birthday':
      await birthdayCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/couple':
      await coupleCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/downloadsong':
      await downloadCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/gif':
      await gifCommand(ctx);
      break;
    case '/translate':
      await translateCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/reminder':
      await reminderCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/currency':
      await currencyCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/lyrics':
      await lyricsCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/news':
      await newsCommand(ctx);
      break;
    case '/dictionary':
      await dictionaryCommand(ctx);
      break;
    case '/stocks':
      await stocksCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/qr':
      await qrCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/shorten':
      await shortenCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/analyze':
      const analysisInput = msg.text.split(' ').slice(1).join(' ');
      if (!analysisInput) {
        ctx.reply(`❓ Please provide text to analyze: \`/analyze [text]\``);
      } else {
        await analyzeCommand(ctx, analysisInput);
      }
      break;
    case '/imageedit':
      await imageEditCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/flashcard':
      await flashcardCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/trivia':
      await triviaCommand(ctx);
      break;
    case '/fact':
      await factCommand(ctx);
      break;
    case '/quote':
      await quoteCommand(ctx);
      break;
    case '/movie':
      await movieCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/book':
      await bookCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/recipe':
      await recipeCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/podcast':
      await podcastCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/addpremium': // Add premium status
      addPremiumStatus(userId);
      ctx.reply(`✨ You have been granted premium status! Enjoy exclusive features!`);
      break;
    case '/removepremium': // Remove premium status
      removePremiumStatus(userId);
      ctx.reply(`❌ Your premium status has been removed.`);
      break;
    case '/confirm':
      await confirmCommand(ctx, msg.text.split(' ').slice(1));
      break;
    case '/subscribe':
      await subscribeCommand(ctx, msg.text.split(' ').slice(1));
      break;
    default:
      ctx.reply(`❓ Unknown command. Use /help for a list of available commands.`);
      break;
  }
};

// Load leveling data when the bot starts
loadLevelingData();
