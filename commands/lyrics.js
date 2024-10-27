import axios from 'axios';

// Function to fetch lyrics using AudD API
const fetchFromAudD = async (songName, artistName) => {
  const apiKey = process.env.AUDD_API_KEY; // Set your AudD API key in .env
  const apiUrl = `https://api.audd.io/lyrics/?q=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artistName)}&api_token=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data && response.data.result && response.data.result.length > 0) {
      return response.data.result[0].lyrics; // Return lyrics from AudD
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics from AudD:', error);
    return null;
  }
};

// Function to fetch lyrics using Genius API
const fetchFromGenius = async (songName, artistName) => {
  const apiKey = process.env.GENIUS_API_KEY; // Set your Genius API key in .env
  const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(songName)} by ${encodeURIComponent(artistName)}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.get(apiUrl, { headers });
    if (response.data.response.hits.length > 0) {
      const songId = response.data.response.hits[0].result.id;
      const songUrl = `https://api.genius.com/songs/${songId}`;
      const songResponse = await axios.get(songUrl, { headers });
      
      // Get the lyrics from the response
      const lyrics = songResponse.data.response.song.lyrics;
      return lyrics ? lyrics.replace(/<[^>]*>/g, '').trim() : null; // Clean up HTML tags
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics from Genius:', error);
    return null;
  }
};

// Main function to get lyrics using multiple APIs
const fetchLyrics = async (songName, artistName) => {
  // Try fetching from AudD first
  let lyrics = await fetchFromAudD(songName, artistName);
  if (!lyrics) {
    // Fallback to Genius if AudD doesn't have the lyrics
    lyrics = await fetchFromGenius(songName, artistName);
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
