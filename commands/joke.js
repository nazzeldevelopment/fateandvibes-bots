import fetch from 'node-fetch';

const jokeCommand = async (ctx) => {
  const url = 'https://official-joke-api.appspot.com/random_joke';

  try {
    const response = await fetch(url);
    const data = await response.json();

    const joke = `${data.setup} ${data.punchline}`;
    await ctx.reply(joke); // Gumamit ng ctx.reply para mag-send ng joke
  } catch (error) {
    console.error(error);
    await ctx.reply('Error fetching joke.'); // I-send ang error message
  }
};

export default jokeCommand;
