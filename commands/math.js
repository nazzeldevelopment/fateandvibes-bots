const mathCommand = async (ctx, expression) => {
    const chatId = ctx.chat.id; // Kunin ang chat ID mula sa ctx
  
    // Kung walang expression na ibinigay, ipakita ang usage information
    if (!expression) {
      const usageMessage = `📐 **Usage:** \nTo evaluate a mathematical expression, use:\n\n\`/math [expression]\`\n\n**Mathematical Levels Supported by Different Strands:**\n\n**STEM Strand:**\n- **Junior High School Math:** Basic operations (addition, subtraction, multiplication, division)\n- **Senior High School Math:** \n  - **Algebra:** Linear equations, quadratic equations\n  - **Geometry:** Area and perimeter of basic shapes\n  - **Trigonometry:** Sine, cosine, tangent, Pythagorean theorem\n- **1st Year College Math:** \n  - **College Algebra:** Functions, graphing, polynomials\n  - **Basic Calculus:** Limits, derivatives, and basic integrals\n- **2nd Year College Math:** \n  - **Intermediate Calculus:** Integration techniques, sequences, and series\n  - **Linear Algebra:** Vectors, matrices, determinants\n\n**ABM Strand:**\n- **Basic Business Math:** Profit and loss, percentage, discounts\n- **Statistics:** Data interpretation, mean, median, mode\n- **Finance Math:** Simple and compound interest, loan calculations\n- **Gas Strand:** \n  - **Advanced Algebra:** Polynomials, rational functions\n  - **Statistics and Probability:** Advanced statistical measures, probability distributions\n- **HUMSS Strand:**\n- **Basic Statistics:** Measures of central tendency\n- **Quantitative Research:** Statistical analysis in research methodologies\n\n**Examples:** \n- \`/math 2 + 3\` \n- \`/math sin(30)\` \n- \`/math (5^2) * (3 - 1)\` \n- \`/math integral(x^2, x)\` (basic integral)`;
  
      return await ctx.reply(usageMessage, { parse_mode: 'Markdown' });
    }
  
    try {
      const result = eval(expression); // I-evaluate ang mathematical expression
      await ctx.reply(`Result: \`${result}\``, { parse_mode: 'Markdown' }); // Gumamit ng ctx.reply para sa response
    } catch (error) {
      await ctx.reply('🚫 Invalid math expression. Please use a valid one.'); // Error handling
    }
  };
  
  export default mathCommand;
  