import axios from 'axios';

// Function to fetch lyrics using AudD API
const fetchLyrics = async (songName) => {
  const apiKey = process.env.AUDD_API_KEY; // Set your AudD API key in .env
  const apiUrl = `https://api.audd.io/findLyrics/?q=${encodeURIComponent(songName)}&api_token=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    // Check if there are results
    if (response.data && response.data.result && response.data.result.length > 0) {
      return response.data.result[0].lyrics;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};

// Command to get lyrics
const lyricsCommand = async (ctx, args) => {
  if (args.length === 0) {
    ctx.reply('Please provide a song name. Usage: /lyrics [song name]');
    return;
  }

  const songName = args.join(' ');
  const lyrics = await fetchLyrics(songName);

  if (lyrics) {
    ctx.reply(`🎶 Lyrics for *${songName}*:\n\n${lyrics}`);
  } else {
    ctx.reply(`Sorry, I couldn't find the lyrics for *${songName}*.`);
  }
};

export default lyricsCommand;
  
