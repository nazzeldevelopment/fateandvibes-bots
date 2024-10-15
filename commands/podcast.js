import axios from 'axios';
import dotenv from 'dotenv';

// I-load ang environment variables mula sa .env file
dotenv.config();

export const podcastCommand = async (ctx, args) => {
  try {
    // Function to fetch all podcasts from Taddy API
    const fetchAllPodcasts = async () => {
      const response = await axios.get('https://api.taddy.dev/podcasts', {
        headers: {
          'Authorization': `Bearer ${process.env.TADDY_API_KEY}` // Idinadagdag ang authorization header
        }
      });
      return response.data; // Ibalik ang data mula sa API
    };

    // Fetch the podcasts
    const podcasts = await fetchAllPodcasts();

    // Suriin kung may valid na data ng podcasts
    if (podcasts && podcasts.length > 0) {
      const podcastList = podcasts.map(podcast => `*${podcast.title}* - [Listen Here](${podcast.link})`).join('\n\n');
      ctx.reply(`🎙️ Here are some podcasts for you:\n\n${podcastList}`);
    } else {
      ctx.reply('❌ Sorry, I couldn\'t fetch any podcasts at the moment. Please try again later.');
    }
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    ctx.reply('❌ An error occurred while fetching the podcasts. Please try again later.');
  }
};

// Export as default
export default podcastCommand;