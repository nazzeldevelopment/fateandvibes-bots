import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const URL_SHORTENER_API_URL = 'https://api.rebrandly.com/v1/links';

export default async function shortenCommand(ctx, args) {
    if (args.length === 0) {
        ctx.reply('Usage: /shorten [URL]');
        return;
    }

    const originalUrl = args[0];

    try {
        const response = await axios.post(
            URL_SHORTENER_API_URL,
            {
                destination: originalUrl
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': process.env.URL_SHORTENER_API_KEY
                }
            }
        );

        const shortUrl = response.data.shortUrl;
        ctx.reply(`Shortened URL: ${shortUrl}`);
    } catch (error) {
        ctx.reply('Error shortening the URL. Please try again.');
    }
}
