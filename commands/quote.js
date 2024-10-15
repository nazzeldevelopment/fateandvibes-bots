import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file contents into process.env

const TADDY_API_KEY = process.env.TADDY_API_KEY; // I-import ang TADDY_API_KEY mula sa .env

// Function to fetch a random quote
const fetchRandomQuote = async () => {
  try {
    const response = await axios.get('https://api.taddy.dev/quotes/random', {
      headers: {
        'Authorization': `Bearer ${TADDY_API_KEY}`, // Ilagay ang TADDY API key sa authorization header
      },
    });
    return response.data; // Ibalik ang data mula sa API
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error('Could not fetch quote. Please try again later.');
  }
};

// Telegram command to get a random quote
export const quoteCommand = async (ctx) => {
  try {
    const quote = await fetchRandomQuote(); // Kunin ang random na quote

    // Suriin kung may valid na quote data
    if (quote && quote.text && quote.author) {
      ctx.reply(`💬 "${quote.text}"\n— ${quote.author}`); // I-reply ang quote sa Telegram chat
    } else {
      ctx.reply('❌ Sorry, I couldn\'t fetch a quote at the moment. Please try again later.');
    }
  } catch (error) {
    ctx.reply('❌ An error occurred while fetching the quote. Please try again later.');
  }
};

// Export as default
export default quoteCommand;