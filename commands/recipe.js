import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // I-load ang .env file contents sa process.env

const RECIPE_API_URL = 'https://api.api-ninjas.com/v1/recipe?query='; // I-update ang base URL para sa query

export default async function recipeCommand(ctx, args) {
    if (args.length === 0) {
        ctx.reply('Usage: /recipe [recipe name]'); // Magbigay ng tamang format ng command
        return;
    }

    const recipeName = args.join(' '); // I-concatenate ang mga argumento bilang recipe name

    try {
        const response = await axios.get(`${RECIPE_API_URL}${recipeName}&apiKey=${process.env.RECIPE_API_KEY}`); // Gamitin ang API key mula sa .env
        const recipe = response.data[0]; // Kunin ang unang recipe mula sa response

        if (!recipe) {
            ctx.reply('No recipe found for that name. Please try another.'); // Error kung walang recipe
            return;
        }

        ctx.reply(`*Recipe: ${recipe.title}*\nInstructions: ${recipe.instructions}`); // I-send ang recipe details
    } catch (error) {
        ctx.reply('Error fetching recipe. Please try again.'); // General error message
    }
}
