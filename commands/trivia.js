import axios from 'axios';

// Function to fetch random trivia questions
const fetchTrivia = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching trivia:', error);
    return null;
  }
};

// Command to start trivia game
const triviaCommand = async (ctx) => {
  const trivia = await fetchTrivia();
  if (!trivia) {
    ctx.reply('Sorry, I could not fetch trivia at the moment. Please try again later.');
    return;
  }

  const question = trivia.question;
  const correctAnswer = trivia.correct_answer;
  const incorrectAnswers = trivia.incorrect_answers;
  const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5); // Shuffle answers

  // Store trivia data in session for answer checking
  ctx.session.trivia = {
    question,
    correctAnswer,
  };

  // Send the trivia question and options to the user
  const replyMarkup = {
    reply_markup: {
      keyboard: options.map(option => [{ text: option }]),
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  };

  ctx.reply(`Trivia Question: ${question}`, replyMarkup);
};

// Command to check the answer
const checkAnswer = async (ctx, answer) => {
  if (ctx.session.trivia) {
    const { correctAnswer } = ctx.session.trivia;

    if (answer === correctAnswer) {
      ctx.reply('Correct! 🎉');
    } else {
      ctx.reply(`Wrong! The correct answer was: ${correctAnswer}`);
    }

    // Clear trivia data from session
    delete ctx.session.trivia;
  } else {
    ctx.reply('No trivia question is active. Please start a new trivia game with /trivia.');
  }
};

export { triviaCommand, checkAnswer };

// Export as default
export default triviaCommand;