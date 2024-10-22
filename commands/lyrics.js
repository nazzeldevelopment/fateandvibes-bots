import axios from 'axios';

// Function to fetch lyrics using ChartLyrics API
const fetchLyrics = async (songName, artistName) => {
  const apiUrl = `http://api.chartlyrics.com/apiv1.asmx/SearchLyric?artist=${encodeURIComponent(artistName)}&song=${encodeURIComponent(songName)}`;

  try {
    const response = await axios.get(apiUrl);
    const lyrics = response.data; // Parse the response to get lyrics
    // Extract the relevant lyrics text from the response here
    return lyrics; // Return lyrics
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
