export default async (ctx, args) => {
    const chatId = ctx.chat.id; // Kunin ang chat ID mula sa ctx
  
    if (args.length < 2) {
      await ctx.reply("Usage: /reminder [time in minutes] [message]"); // Gumamit ng ctx.reply para sa error message
      return;
    }
  
    const time = parseInt(args[0]) * 60000; // Convert minutes to milliseconds
    const message = args.slice(1).join(' ');
  
    setTimeout(() => {
      ctx.reply(`Reminder: ${message}`); // Gumamit ng ctx.reply para sa reminder message
    }, time);
  
    await ctx.reply(`Reminder set for ${args[0]} minutes.`); // Gumamit ng ctx.reply para sa confirmation message
  };
  