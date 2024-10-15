const greetCommand = async (ctx) => {
    const greeting = 'Hello! How can I assist you today?';
    await ctx.reply(greeting); // Gumamit ng ctx.reply para sa tamang pagtugon
};

export default greetCommand;
