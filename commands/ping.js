const pingCommand = async (ctx) => {
  const start = Date.now(); // Simulan ang oras
  await ctx.reply('Astral Bots Ping Status!'); // Mag-send ng "Pong!" message
  const latency = Date.now() - start; // Sukatin ang latency
  // I-send ang latency sa chat
  await ctx.reply(`Latency: ${latency}ms`);
};

export default pingCommand;