import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const DICTIONARY_API_URLS = {
    en: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
    es: 'https://api.dictionaryapi.dev/api/v2/entries/es/',
    fil: 'https://api.dictionaryapi.dev/api/v2/entries/fil/', // Example Filipino support
    // Additional language APIs can be added here
    default: 'https://api.dictionaryapi.dev/api/v2/entries/'
};

export default async function dictionaryCommand(ctx, args) {
    if (args.length === 0) {
        ctx.reply('Usage: /dictionary [language] [word]\nExample: /dictionary en hello or /dictionary fil kumusta');
        return;
    }

    // Determine language and word
    const language = args.length > 1 ? args[0].toLowerCase() : 'en'; // Default to English if no language specified
    const word = args.length > 1 ? args[1] : args[0];

    // Choose the appropriate API URL
    const apiUrl = DICTIONARY_API_URLS[language] || `${DICTIONARY_API_URLS.default}${language}/`;

    try {
        const response = await axios.get(`${apiUrl}${encodeURIComponent(word)}`);
        const meanings = response.data[0].meanings;

        const definitions = meanings.map((meaning) => {
            return `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}`;
        }).join('\n');

        ctx.reply(`*Definitions of "${word}" in ${language}:*\n${definitions}`);
    } catch (error) {
        ctx.reply(`Error fetching word definition for "${word}" in ${language}. Please try again.`);
    }
}
