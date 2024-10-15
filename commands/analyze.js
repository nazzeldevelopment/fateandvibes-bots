import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const TEXT_ANALYSIS_API_URL = 'https://api.textgears.com/analyze?key=';

export default async function analyzeCommand(ctx, args) {
    // Log the args to verify if they are being parsed correctly
    console.log('Arguments received:', args);

    // Validate args input
    if (!args || !Array.isArray(args) || args.length === 0) {
        ctx.reply('Usage: /analyze [text]');
        return;
    }

    // Join the arguments into a single text string
    const textToAnalyze = args.join(' ');

    try {
        const response = await axios.get(`${TEXT_ANALYSIS_API_URL}${process.env.TEXT_ANALYSIS_API_KEY}&text=${encodeURIComponent(textToAnalyze)}`);
        const analysis = response.data;

        if (!analysis.response) {
            ctx.reply('Could not analyze the text. Please try again.');
            return;
        }

        const errors = analysis.response.errors || [];
        const readabilityScore = analysis.response.score;
        const sentiment = analysis.response.sentiment || 'Neutral';
        const wordCount = analysis.response.word_count || 0;
        const grammarSuggestions = errors.map(error => error.bad).join(', ') || 'None';

        ctx.reply(
            `Text Analysis:\n` +
            `- Spelling Errors: ${errors.length}\n` +
            `- Grammar Suggestions: ${grammarSuggestions}\n` +
            `- Readability Score: ${readabilityScore}\n` +
            `- Sentiment: ${sentiment}\n` +
            `- Word Count: ${wordCount}`
        );
    } catch (error) {
        console.error('Error analyzing text:', error);
        ctx.reply('Error analyzing text. Please try again.');
    }
}
