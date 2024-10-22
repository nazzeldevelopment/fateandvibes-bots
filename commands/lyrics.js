import axios from 'axios';

// Function to fetch lyrics using Genius API
const fetchLyrics = async (songName) => {
  const accessToken = process.env.GENIUS_ACCESS_TOKEN; // Set your Genius access token in .env
  const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(songName)}`;

  try {
    // Search for the song on Genius
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const hits = response.data.response.hits;
    if (hits.length === 0) {
      return null;
    }

    // Get the URL of the first result
    const songUrl = hits[0].result.url;

    // Fetch the lyrics from the song page
    return `You can find the lyrics here: ${songUrl}`;
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
  const lyricsMessage = await fetchLyrics(songName);

  if (lyricsMessage) {
    ctx.reply(lyricsMessage);
  } else {
    ctx.reply(`Sorry, I couldn't find the lyrics for *${songName}*.`);
  }
};

export default lyricsCommand;
