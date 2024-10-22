import axios from 'axios';
import cheerio from 'cheerio';

// Function to scrape lyrics from a lyrics website
const fetchLyrics = async (songName, artistName) => {
  const query = `${songName} ${artistName}`;
  const searchUrl = `https://www.lyrics.com/serp.php?st=${encodeURIComponent(query)}`;

  try {
    // Fetch the search results page
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);

    // Find the first result link
    const firstResult = $('a.lyric-link').first();
    const lyricsPageUrl = firstResult.attr('href');

    // Fetch the lyrics page
    const lyricsResponse = await axios.get(`https://www.lyrics.com${lyricsPageUrl}`);
    const lyricsPage = cheerio.load(lyricsResponse.data);

    // Extract the lyrics
    const lyrics = lyricsPage('.lyric-body').text().trim();
    return lyrics;
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
  
