import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Function to download an image from a URL
const downloadImage = async (url) => {
  const response = await axios({
    url,
    responseType: 'arraybuffer',
  });
  return Buffer.from(response.data, 'binary');
};

// Function to edit the image
const editImage = async (imageBuffer, width, height) => {
  return sharp(imageBuffer)
    .resize(width, height)
    .toBuffer();
};

// Command to edit an image
const imageEditCommand = async (ctx, args) => {
  if (args.length < 3) {
    ctx.reply('Usage: /imageedit [image URL] [width] [height]');
    return;
  }

  const imageUrl = args[0];
  const width = parseInt(args[1]);
  const height = parseInt(args[2]);

  try {
    const imageBuffer = await downloadImage(imageUrl);
    const editedImageBuffer = await editImage(imageBuffer, width, height);

    const editedImagePath = path.join(__dirname, 'editedImage.png');
    fs.writeFileSync(editedImagePath, editedImageBuffer);

    await ctx.replyWithPhoto({ source: editedImagePath });
    
    // Clean up the file after sending
    fs.unlinkSync(editedImagePath);
  } catch (error) {
    console.error('Error editing image:', error);
    ctx.reply('Sorry, there was an error editing the image. Please try again.');
  }
};

export default imageEditCommand;
