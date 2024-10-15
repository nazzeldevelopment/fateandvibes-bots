import fetch from 'node-fetch';

const weatherCommand = async (ctx, args) => {
  const chatId = ctx.chat.id; // Kunin ang chat ID mula sa ctx
  const city = args.join(' ');

  if (!city) {
    await ctx.reply('Please provide a city name.'); // Gumamit ng ctx.reply para sa error message
    return;
  }

  const apiKey = process.env.WEATHER_API_KEY; // Ilagay ang iyong weather API key sa .env file
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;

      const weatherInfo = `
        Weather in ${city}:
        Description: ${weatherDescription}
        Temperature: ${temperature}°C
        Humidity: ${humidity}%
      `;
      await ctx.reply(weatherInfo); // Gumamit ng ctx.reply para sa result message
    } else {
      await ctx.reply(`Could not find weather for ${city}.`); // Gumamit ng ctx.reply para sa error message
    }
  } catch (error) {
    console.error(error);
    await ctx.reply('Error fetching weather data.'); // Gumamit ng ctx.reply para sa error message
  }
};

export default weatherCommand;
