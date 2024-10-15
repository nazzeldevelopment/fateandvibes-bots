import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file contents into process.env

const MOVIE_API_URL = 'https://www.omdbapi.com/?apikey=';
const STREAMING_API_URL = 'https://api.watchmode.com/v1/title/search/?apiKey=';

export default async function movieCommand(ctx, args) {
    // Check if at least one argument is provided
    if (args.length < 1) {
        ctx.reply('Usage: /movie [movie title] [optional: type (movie/series/episode)]');
        return;
    }

    const movieTitle = args.slice(0, -1).join(' ');
    let type = args[args.length - 1].toLowerCase();

    // Default to "movie" if the type is not specified correctly
    if (!['movie', 'series', 'episode'].includes(type)) {
        type = 'movie'; // If the last argument is not a valid type, treat it as a movie
    }

    try {
        // Fetch movie details from OMDB API
        const movieResponse = await axios.get(`${MOVIE_API_URL}${process.env.MOVIE_API_KEY}&t=${encodeURIComponent(movieTitle)}&type=${type}`);
        const movie = movieResponse.data;

        // Check if the response indicates a failure
        if (movie.Response === 'False') {
            ctx.reply('Movie not found. Please try another title or type.');
            return;
        }

        // Fetch availability on streaming platforms (sample implementation)
        const streamingResponse = await axios.get(`${STREAMING_API_URL}${process.env.STREAMING_API_KEY}&title=${encodeURIComponent(movieTitle)}`);
        
        let availability = [];
        if (streamingResponse.data && streamingResponse.data.results) {
            // Extract the names of the platforms where the movie is available
            availability = streamingResponse.data.results.map(stream => stream.provider_name);
        } else {
            availability = ['Not available on any streaming platforms.'];
        }

        // Respond with the movie details and availability
        ctx.reply(
            `*Title:* ${movie.Title}\n` +
            `*Year:* ${movie.Year}\n` +
            `*Type:* ${movie.Type}\n` +
            `*Genre:* ${movie.Genre}\n` +
            `*Director:* ${movie.Director}\n` +
            `*Actors:* ${movie.Actors}\n` +
            `*Plot:* ${movie.Plot}\n` +
            `*Available on:* ${availability.join(', ')}`
        );
    } catch (error) {
        console.error('Error fetching movie details:', error); // Log the error for debugging
        ctx.reply('Error fetching movie details. Please try again later.');
    }
}
