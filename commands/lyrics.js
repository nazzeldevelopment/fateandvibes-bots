import axios from 'axios';

// Function to fetch lyrics of a song
const fetchLyrics = async (songName) => {
  const apiKey = process.env.LYRICS_API_KEY; // Replace with your actual API key
  const apiUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(songName)}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.lyrics;
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
