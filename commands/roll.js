export default async (ctx, args) => {
    const chatId = ctx.chat.id; // Kunin ang chat ID mula sa ctx
  
    if (args.length === 0) {
      await ctx.reply("Usage: /roll [number of sides]"); // Gumamit ng ctx.reply para sa error message
      return;
    }
  
    const sides = parseInt(args[0]);
    if (isNaN(sides) || sides <= 0) {
      await ctx.reply("Please provide a valid number of sides for the dice."); // Gumamit ng ctx.reply para sa error message
      return;
    }
  
    const roll = Math.floor(Math.random() * sides) + 1;
    await ctx.reply(`🎲 You rolled a ${sides}-sided dice and got: **${roll}**`); // Gumamit ng ctx.reply para sa result message
  };
  