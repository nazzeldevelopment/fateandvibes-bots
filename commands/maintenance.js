import dotenv from 'dotenv';

dotenv.config(); // Load .env file contents into process.env

const ADMIN_ID = process.env.ADMIN_ID; // Kunin ang ADMIN_ID mula sa .env
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE; // Kunin ang MAINTENANCE_MODE mula sa .env

const maintenanceCommand = async (ctx, userId) => {
  const chatId = ctx.chat.id; // Kunin ang chat ID mula sa ctx

  // Convert userId to string for comparison
  if (String(userId) !== ADMIN_ID) {
    await ctx.reply('You do not have permission to use this command.');
    return;
  }

  // Toggle maintenance mode
  const newMode = MAINTENANCE_MODE === 'true' ? 'false' : 'true';
  process.env.MAINTENANCE_MODE = newMode; // Update the environment variable

  const status = newMode === 'true' ? 'enabled' : 'disabled';
  await ctx.reply(`Maintenance mode has been ${status}.`);
};

export default maintenanceCommand;
