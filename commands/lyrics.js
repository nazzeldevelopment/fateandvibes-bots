import axios from 'axios';

// Function to fetch lyrics using Lyrics.ovh
const fetchLyrics = async (artist, song) => {
  const apiUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.lyrics || "Lyrics not found.";
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};

// Command to get lyrics
const lyricsCommand = async (ctx, args) => {
  if (args.length < 2) {
    ctx.reply('Please provide both artist and song name. Usage: /lyrics [artist] [song name]');
    return;
  }

  const artist = args[0];
  const songName = args.slice(1).join(' ');
  const lyrics = await fetchLyrics(artist, songName);

  if (lyrics) {
    ctx.reply(`🎶 Lyrics for *${songName}* by *${artist}*:\n\n${lyrics}`);
  } else {
    ctx.reply(`Sorry, I couldn't find the lyrics for *${songName}* by *${artist}*.`);
  }
};

export default lyricsCommand;
      
