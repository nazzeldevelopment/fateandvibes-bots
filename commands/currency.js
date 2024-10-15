import axios from 'axios';

const CURRENCY_API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export default async function currencyCommand(ctx, args) {
    if (args.length < 3) {
        ctx.reply('Usage: /currency [amount] [from currency code] [to currency code]');
        return;
    }

    const amount = parseFloat(args[0]);
    const fromCurrencyCode = args[1].toUpperCase();
    const toCurrencyCode = args[2].toUpperCase();

    if (isNaN(amount)) {
        ctx.reply('Please provide a valid number for the amount.');
        return;
    }

    try {
        // Fetch rates using the from currency
        const response = await axios.get(`${CURRENCY_API_URL}${fromCurrencyCode}`);
        const rates = response.data.rates;

        // Check if the target currency code is valid
        if (!rates[toCurrencyCode]) {
            ctx.reply('Invalid target currency code.');
            return;
        }

        // Calculate converted amount
        const convertedAmount = (amount * rates[toCurrencyCode]).toFixed(2);
        ctx.reply(`${amount} ${fromCurrencyCode} = ${convertedAmount} ${toCurrencyCode}`);
    } catch (error) {
        ctx.reply('Error fetching currency rates. Please try again.');
    }
}
