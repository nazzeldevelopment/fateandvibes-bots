import axios from 'axios';

// Function to fetch lyrics using Vagalume API
const fetchLyrics = async (songName, artistName) => {
  const apiUrl = `https://api.vagalume.com.br/search.php?art=${encodeURIComponent(artistName)}&mus=${encodeURIComponent(songName)}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data.response && response.data.response.docs.length > 0) {
      return response.data.response.docs[0].text; // Lyrics text
    }
    return null; // No lyrics found
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};

// Command to get lyrics
const lyricsCommand = async (ctx, args) => {
  if (args.length < 2) {
    ctx.reply('Please provide both a song name and artist. Usage: /lyrics [song name] by [artist]');
    return;
  }

  const artistKeywordIndex = args.indexOf('by');
  if (artistKeywordIndex === -1) {
    ctx.reply('Please use "by" to separate the song name and the artist.');
    return;
  }

  const songName = args.slice(0, artistKeywordIndex).join(' ');
  const artistName = args.slice(artistKeywordIndex + 1).join(' ');

  const lyrics = await fetchLyrics(songName, artistName);

  if (lyrics) {
    ctx.reply(`🎶 Lyrics for *${songName}* by *${artistName}*:\n\n${lyrics}`);
  } else {
    ctx.reply(`Sorry, I couldn't find the lyrics for *${songName}* by *${artistName}*.`);
  }
};

export default lyricsCommand;
  
