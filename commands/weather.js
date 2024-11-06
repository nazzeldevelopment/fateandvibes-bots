import fetch from 'node-fetch';

// Weather Command
const weatherCommand = async (ctx, args) => {
  const chatId = ctx.chat.id;
  const location = args.join(' ');

  if (!location) {
    await ctx.reply('Please provide a location (e.g., "Manila", "New York", or "Luzon").');
    return;
  }

  const apiKey = process.env.WEATHER_API_KEY;  // OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const { description } = data.weather[0];
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      const pressure = data.main.pressure;
      const cloudiness = data.clouds.all;
      const rain = data.rain ? data.rain["1h"] || 0 : 0;

      // Weather condition alerts
      const isHotWeather = temperature >= 30;
      const isHeavyRain = rain >= 10;
      const isStorm = windSpeed >= 17;
      const isTyphoon = windSpeed >= 25;

      // Wind direction mapping
      const directionMap = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      const windDir = directionMap[Math.round(windDirection / 22.5) % 16];

      const weatherInfo = `
        **Weather in ${location}:**
        - **Description**: ${description.charAt(0).toUpperCase() + description.slice(1)}
        - **Temperature**: ${temperature}°C ${isHotWeather ? '🔥 Hot Weather Alert!' : ''}
        - **Humidity**: ${humidity}%
        - **Pressure**: ${pressure} hPa
        - **Cloudiness**: ${cloudiness}%
        - **Wind Speed**: ${windSpeed} m/s (${windDir}) ${isTyphoon ? '🌀 Typhoon-level Winds!' : isStorm ? '🌬️ Strong Winds' : ''}
        - **Rainfall (last hour)**: ${rain} mm ${isHeavyRain ? '🌧️ Heavy Rain Alert!' : ''}
      `;

      await ctx.reply(weatherInfo);

    } else {
      await ctx.reply(`Could not find weather information for "${location}". Please provide a valid location.`);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    await ctx.reply('Error fetching weather data. Please try again later.');
  }
};

export default { weatherCommand };
