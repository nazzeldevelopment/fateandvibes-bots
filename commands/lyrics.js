import axios from 'axios';

// Function to fetch lyrics using AudD API
const fetchFromAudD = async (songName, artistName) => {
  const apiKey = process.env.AUDD_API_KEY; // Set your AudD API key in .env
  const apiUrl = `https://api.audd.io/lyrics/?q=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artistName)}&api_token=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data && response.data.result && response.data.result.length > 0) {
      return response.data.result[0].lyrics;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics from AudD:', error);
    return null;
  }
};

// Function to fetch lyrics using Lyrics.ovh API as fallback
const fetchFromLyricsOvh = async (songName, artistName) => {
  const apiUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(songName)}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data && response.data.lyrics) {
      return response.data.lyrics;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics from Lyrics.ovh:', error);
    return null;
  }
};

// Main function to get lyrics using multiple APIs
const fetchLyrics = async (songName, artistName) => {
  // Try fetching from AudD first
  let lyrics = await fetchFromAudD(songName, artistName);
  if (!lyrics) {
    // Fallback to Lyrics.ovh if AudD doesn't have the lyrics
    lyrics = await fetchFromLyricsOvh(songName, artistName);
  }

  return lyrics;
};

// Command to get lyrics
const lyricsCommand = async (ctx, args) => {
  if (args.length < 2) {
    ctx.reply('Please provide both a song name and an artist. Usage: /lyrics [song name] by [artist]');
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
