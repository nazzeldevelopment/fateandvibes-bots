import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // I-load ang .env file contents sa process.env

const MOVIE_API_URL = 'https://www.omdbapi.com/?apikey=';
const STREAMING_API_URL = 'https://api.watchmode.com/v1/title/search/?apiKey='; // JustWatch or similar API

export default async function movieCommand(ctx, args) {
    if (args.length < 1) {
        ctx.reply('Usage: /movie [movie title] [optional: type (movie/series/episode)]');
        return;
    }

    const movieTitle = args.slice(0, -1).join(' ');
    let type = args[args.length - 1].toLowerCase();

    // Default to "movie" if the type is not specified correctly
    if (!['movie', 'series', 'episode'].includes(type)) {
        type = 'movie';
    }

    try {
        const response = await axios.get(`${MOVIE_API_URL}${process.env.MOVIE_API_KEY}&t=${encodeURIComponent(movieTitle)}&type=${type}`);
        const movie = response.data;

        if (movie.Response === 'False') {
            ctx.reply('Movie not found. Please try another title or type.');
            return;
        }

        // Check availability on streaming platforms (sample implementation)
        const streamingResponse = await axios.get(`${STREAMING_API_URL}${process.env.STREAMING_API_KEY}&title=${encodeURIComponent(movieTitle)}`);
        const availability = streamingResponse.data; // Handle the actual response to get platform info

        ctx.reply(
            `*Title: ${movie.Title}*\n` +
            `Year: ${movie.Year}\n` +
            `Type: ${movie.Type}\n` +
            `Genre: ${movie.Genre}\n` +
            `Director: ${movie.Director}\n` +
            `Actors: ${movie.Actors}\n` +
            `Plot: ${movie.Plot}\n` +
            `Available on: ${availability.join(', ')}` // Sample format of response
        );
    } catch (error) {
        ctx.reply('Error fetching movie details. Please try again.');
    }
}
