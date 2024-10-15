import axios from 'axios';

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

export default async function newsCommand(ctx) {
    try {
        const response = await axios.get(NEWS_API_URL);
        const articles = response.data.articles;

        if (articles.length === 0) {
            ctx.reply('No news articles found.');
            return;
        }

        const newsList = articles.map((article, index) => {
            return `${index + 1}. *${article.title}*\n${article.description}\n[Read more](${article.url})\n`;
        }).join('\n');

        ctx.reply(`*Latest News:*\n\n${newsList}`);
    } catch (error) {
        ctx.reply('Error fetching news. Please try again.');
    }
}
