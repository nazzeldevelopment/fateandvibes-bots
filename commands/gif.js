import fetch from 'node-fetch';

const gifCommand = async (ctx) => {
  try {
    const apiKey = process.env.GIPHY_API_KEY; // Ilagay ang iyong Giphy API key sa .env file
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`);
    const data = await response.json();

    console.log('Giphy API response:', data); // I-log ang response ng API

    if (data.data && data.data.images && data.data.images.original) {
      await ctx.replyWithPhoto(data.data.images.original.url);
    } else {
      ctx.reply('No GIF found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching GIF:', error); // I-log ang error para mas madali itong ma-troubleshoot
    ctx.reply('Failed to fetch a GIF. Please try again later.');
  }
};

export default gifCommand;
