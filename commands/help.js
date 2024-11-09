export const helpCommand = async (ctx) => {
  const helpMessage = `🌟 *Welcome to Unified Ascensants Bot!* 🌟

✨ Here are some amazing features you can use:

🔧 /help - *Displays this help message*
📊 /status - *Shows the bot's current status*
🚀 /ping - *Checks the bot's latency*
🛠️ /maintenance - *Toggles maintenance mode (admin only)*
🔊 /echo [message] - *Echoes back the message you send*
👋 /greet - *Sends a friendly greeting*
🌤️ /weather [location] - *Get weather info for the specified location*
😂 /joke - *Fetches a random joke to lighten the mood*
📐 /math [expression] - *Evaluates a math expression (e.g., 2+2)*
🎲 /roll [number of sides] - *Rolls a dice with specified sides*
🧙 /character - *Generates a random character*
❤️ /couple [user1] [user2] - *Calculates couple percentage between two users*
🎶 /downloadsong [song URL or name] - *Downloads a song automatically*
🎉 /gif - *Gets a random GIF*
⏰ /reminder [time in minutes] [message] - *Sets a reminder*
🎂 /birthday [DD-MM] - *Sets your birthday for special greetings!*
✅ /confirm [user_id] [transaction_id] - *Confirms a transaction for a specified user*
📅 /subscribe - *Subscribe to access Premium Features*

🌟 *Admin Features:*
🛠️ /maintenance - *Toggles maintenance mode on or off (admin only)*
✅ /addpremium [user_id] - *Adds a user as a premium member (admin only)*
❌ /removepremium [user_id] - *remove as a premium member (admin only)*
👥 /addadmin [user_id] - *Adds a user as an admin (admin only)*
❌ /removeadmin [user_id] - *Removes a user from admin status (admin only)*

🌟 *Premium Features:*
🎙️ /podcast - *Fetches a random podcast episode*
🌍 /translate - *Translates text into different languages*
💰 /currency - *Converts currencies in real-time*
📜 /lyrics - *Fetches lyrics for a specified song*
📰 /news - *Fetches the latest news articles*
📊 /stocks - *Provides stock market information*
📱 /qr - *Generates a QR code*
🔄 /shorten - *Shortens a long URL*
🔍 /analyze - *Analyzes the given text or data*
🖼️ /imageedit - *Edits images with specified parameters*
🃏 /flashcard - *Creates a flashcard for study purposes*
🧠 /trivia - *Fetches random trivia questions*
📖 /fact - *Provides interesting facts*
💬 /quote - *Fetches a random quote*
🎬 /movie - *Recommends a movie based on your preferences*
📚 /book - *Recommends a book to read*
🍽️ /recipe - *Suggests a recipe for your next meal!*

🤖 *Leveling System:*
Every time you send a message, you earn XP.
- 🌟 *100 XP* = Level Up! 🎉

If you have any questions, feel free to ask!`;

  await ctx.telegram.sendMessage(ctx.chat.id, helpMessage.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1'), { parse_mode: 'MarkdownV2' });
};

// Export as default
export default helpCommand;
