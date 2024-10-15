import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const GLOBAL_STOCKS_API_URL = 'https://financialmodelingprep.com/api/v3/quote';
const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query';

export default async function stocksCommand(ctx, args) {
    if (args.length === 0) {
        ctx.reply(
            'Usage: /stocks [symbol] [exchange (optional)]\n' +
            'Examples:\n' +
            '/stocks AAPL (U.S. stock)\n' +
            '/stocks GOOGL NASDAQ\n' +
            '/stocks BPI.PS (Philippine Stock Exchange)\n' +
            '/stocks TSLA\n' +
            '/stocks 7203.T (Toyota, Japan)\n'
        );
        return;
    }

    const symbol = args[0].toUpperCase();
    const exchange = args[1] ? args[1].toUpperCase() : '';

    try {
        let response;

        // Fetch stock data from the Financial Modeling Prep (FMP) API or Alpha Vantage
        if (exchange) {
            // Financial Modeling Prep supports adding exchange names like NASDAQ, NYSE, TSX, etc.
            response = await axios.get(`${GLOBAL_STOCKS_API_URL}/${symbol}.${exchange}?apikey=${process.env.GLOBAL_STOCKS_API_KEY}`);
        } else {
            // If no exchange specified, try using Alpha Vantage for popular stocks
            response = await axios.get(ALPHA_VANTAGE_URL, {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: symbol,
                    apikey: process.env.STOCKS_API_KEY,
                },
            });
        }

        if (!response.data || Object.keys(response.data).length === 0) {
            ctx.reply('Could not retrieve stock data. Please check the symbol or exchange and try again.');
            return;
        }

        const stock = response.data[0] || response.data['Global Quote'];
        const { symbol: stockSymbol, price, changesPercentage, dayHigh, dayLow, volume } = stock;

        ctx.reply(
            `*Stock: ${stockSymbol}*\n` +
            `Price: ${price || stock['05. price']} USD\n` +
            `Change %: ${changesPercentage || stock['10. change percent']}\n` +
            `Day High: ${dayHigh || stock['03. high']} USD\n` +
            `Day Low: ${dayLow || stock['04. low']} USD\n` +
            `Volume: ${volume || stock['06. volume']}`
        );
    } catch (error) {
        ctx.reply('Error fetching stock data. Please try again.');
    }
}
