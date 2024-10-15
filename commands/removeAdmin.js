
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

// Function to remove an admin
export const removeAdminCommand = (ctx, userId) => {
  const admins = readAdminList();
  if (admins.includes(userId)) {
    const updatedAdmins = admins.filter(admin => admin !== userId);
    saveAdminList(updatedAdmins);
    ctx.reply(`✅ User ID ${userId} has been removed from the admin list.`);
  } else {
    ctx.reply(`🚫 User ID ${userId} is not an admin.`);
  }
};

export default removeAdminCommand;