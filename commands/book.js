import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file contents into process.env

const BOOKS_API_KEY = process.env.BOOKS_API_KEY; // I-import ang BOOKS_API_KEY mula sa .env

// Function to fetch book information by title
const fetchBookByTitle = async (title) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${BOOKS_API_KEY}`);
    return response.data; // Ibalik ang data mula sa API
  } catch (error) {
    console.error('Error fetching book:', error);
    throw new Error('Could not fetch book information. Please try again later.');
  }
};

// Telegram command to get book information
const bookCommand = async (ctx, args) => {
  const bookTitle = args.join(' '); // Kunin ang title ng libro mula sa arguments

  if (!bookTitle) {
    return ctx.reply('❌ Please provide a book title to search.');
  }

  try {
    const bookData = await fetchBookByTitle(bookTitle); // Kunin ang impormasyon ng libro

    // Suriin kung may nakuha na libro
    if (bookData && bookData.items && bookData.items.length > 0) {
      const book = bookData.items[0]; // Kumuha ng unang libro mula sa resulta

      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
      const description = book.volumeInfo.description || 'No description available.';
      const link = book.volumeInfo.infoLink; // Link sa detalye ng libro

      // I-reply ang impormasyon ng libro sa Telegram chat
      ctx.reply(`📚 *${title}* by ${authors}\n\n${description}\n\n📖 [More Info](${link})`);
    } else {
      ctx.reply('❌ Sorry, no books found with that title. Please try again with a different title.');
    }
  } catch (error) {
    ctx.reply('❌ An error occurred while fetching book information. Please try again later.');
  }
};

// Export as default
export default bookCommand;
