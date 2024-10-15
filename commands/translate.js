import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const TRANSLATE_API_URL = 'https://ai-translate.p.rapidapi.com/translate';
const LANGUAGES_API_URL = 'https://ai-translate.p.rapidapi.com/languages';

// Function to fetch supported languages from the API
async function fetchSupportedLanguages() {
    try {
        const response = await axios.get(LANGUAGES_API_URL, {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Use the API key from .env
                'X-RapidAPI-Host': 'ai-translate.p.rapidapi.com',
            }
        });
        return response.data.languages; // Adjust based on the actual API response
    } catch (error) {
        console.error('Error fetching supported languages:', error);
        return null;
    }
}

// Main function to handle translation command
export default async function translateCommand(ctx, args) {
    // Validate the input arguments
    if (args.length < 3) { // Ensure at least source_lang, target_lang, and text are provided
        ctx.reply('Usage: /translate [source_lang] [target_lang] [text]');
        return;
    }

    const [sourceLang, targetLang, ...textArray] = args;
    const text = textArray.join(' ');

    // Fetch supported languages
    const languages = await fetchSupportedLanguages();
    if (!languages) {
        ctx.reply('Could not fetch supported languages. Please try again later.');
        return;
    }

    // Check if the provided languages are supported
    if (!languages.includes(sourceLang) || !languages.includes(targetLang)) {
        ctx.reply(`Invalid language codes. Supported languages are: ${languages.join(', ')}`);
        return;
    }

    try {
        // Send a POST request to the translation API
        const response = await axios.post(TRANSLATE_API_URL, {
            text: text,
            source: sourceLang,
            target: targetLang,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Ensure the API key is sent here
                'X-RapidAPI-Host': 'ai-translate.p.rapidapi.com',
            }
        });

        // Ensure the translated text is available
        const translatedText = response.data.translation || 'Translation failed.';
        ctx.reply(`Translated Text: ${translatedText}`);
    } catch (error) {
        console.error('Translation error:', error.response ? error.response.data : error);
        ctx.reply('Error while translating. Please try again.');
    }
}
