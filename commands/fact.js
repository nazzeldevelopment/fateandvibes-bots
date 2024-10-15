import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const FACT_API_URL = 'https://api.api-ninjas.com/v1/facts?limit=1';

export default async function factCommand(ctx) {
    try {
        const response = await axios.get(FACT_API_URL, {
            headers: {
                'X-Api-Key': process.env.FACT_API_KEY
            }
        });

        const fact = response.data[0].fact;
        ctx.reply(`Did you know?\n${fact}`);
    } catch (error) {
        ctx.reply('Error fetching fact. Please try again.');
    }
}
