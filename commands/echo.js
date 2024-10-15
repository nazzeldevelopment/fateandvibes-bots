const echoCommand = (chatId, message, bot) => {
    if (!message) {
      bot.sendMessage(chatId, 'Please provide a message to echo.');
    } else {
      bot.sendMessage(chatId, message);
    }
  };
  
  export default echoCommand;
  