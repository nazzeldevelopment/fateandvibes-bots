import axios from 'axios';

// Function to fetch lyrics using AudD API
const fetchFromAudD = async (songName, artistName) => {
  const apiKey = process.env.AUDD_API_KEY; // Set your AudD API key in .env
  const apiUrl = `https://api.audd.io/findLyrics/?q=${encodeURIComponent(songName)} ${encodeURIComponent(artistName)}&api_token=${apiKey}`;

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

// Function to search and get full lyrics using Musixmatch API
const fetchFromMusixmatch = async (songName, artistName) => {
  const apiKey = process.env.MUSIXMATCH_API_KEY; // Set your Musixmatch API key in .env

  try {
    // Step 1: Search for the track ID
    const searchUrl = `https://api.musixmatch.com/ws/1.1/track.search?q_track=${encodeURIComponent(songName)}&q_artist=${encodeURIComponent(artistName)}&apikey=${apiKey}`;
    const searchResponse = await axios.get(searchUrl);

    if (
      searchResponse.data &&
      searchResponse.data.message &&
      searchResponse.data.message.body &&
      searchResponse.data.message.body.track_list &&
      searchResponse.data.message.body.track_list.length > 0
    ) {
      const trackList = searchResponse.data.message.body.track_list;
      const trackId = trackList[0].track.track_id;

      // Step 2: Fetch full lyrics using the Track ID
      const lyricsUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${apiKey}`;
      const lyricsResponse = await axios.get(lyricsUrl);

      if (
        lyricsResponse.data &&
        lyricsResponse.data.message &&
        lyricsResponse.data.message.body &&
        lyricsResponse.data.message.body.lyrics &&
        lyricsResponse.data.message.body.lyrics.lyrics_body
      ) {
        return lyricsResponse.data.message.body.lyrics.lyrics_body;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching lyrics from Musixmatch:', error);
    return null;
  }
};

// Main function to get lyrics using multiple APIs
const fetchLyrics = async (songName, artistName) => {
  // Try fetching from AudD first
  let lyrics = await fetchFromAudD(songName, artistName);
  if (!lyrics) {
    // Fallback to Musixmatch if AudD doesn't have the lyrics
    lyrics = await fetchFromMusixmatch(songName, artistName);
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
