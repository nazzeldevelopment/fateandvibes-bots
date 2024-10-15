export default (chatId, args, bot) => {
    if (args.length < 2) {
      bot.sendMessage(chatId, "Usage: /couple [user1] [user2]");
      return;
    }
  
    const [user1, user2] = args;
    const couplePercentage = Math.floor(Math.random() * 101); // Random percentage between 0 and 100
  
    let emoji = '';
    if (couplePercentage > 80) emoji = '❤️';
    else if (couplePercentage > 50) emoji = '💖';
    else if (couplePercentage > 20) emoji = '💔';
    else emoji = '😢';
  
    bot.sendMessage(chatId, `💞 Couple Percentage between ${user1} and ${user2}: ${couplePercentage}% ${emoji}`);
  };
  