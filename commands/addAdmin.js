
import fs from 'fs';

const adminsFile = 'admins.json';

// Function to read the admin list from the JSON file
const readAdminList = () => {
  const data = fs.readFileSync(adminsFile);
  return JSON.parse(data).admins;
};

// Function to save the updated admin list to the JSON file
const saveAdminList = (admins) => {
  fs.writeFileSync(adminsFile, JSON.stringify({ admins }, null, 2));
};

// Function to add a new admin
export const addAdminCommand = (ctx, userId) => {
  const admins = readAdminList();
  if (!admins.includes(userId)) {
    admins.push(userId);
    saveAdminList(admins);
    ctx.reply(`✅ User ID ${userId} has been added as an admin.`);
  } else {
    ctx.reply(`🚫 User ID ${userId} is already an admin.`);
  }
};

export default addAdminCommand;