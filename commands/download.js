import ytdl from 'ytdl-core';
import { PassThrough } from 'stream';
import fs from 'fs';
import path from 'path';

export default async (ctx) => {
  const message = ctx.message.text;
  const args = message.split(' ').slice(1);

  if (args.length === 0) {
    await ctx.reply("Usage: /downloadsong [song URL]");
    return;
  }

  const url = args[0];

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    await ctx.reply(`Downloading "${title}"...`);

    const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const audioFilePath = path.resolve(__dirname, `${title}.mp3`);
    const writeStream = fs.createWriteStream(audioFilePath);

    // Pipe the audio stream to a local file
    audioStream.pipe(writeStream);

    writeStream.on('finish', async () => {
      await ctx.reply(`"${title}" has been downloaded! Sending audio file...`);

      // Send the audio file directly to the chat
      await ctx.telegram.sendAudio(ctx.chat.id, { source: audioFilePath }, { title });

      // Delete the file after sending
      fs.unlink(audioFilePath, (err) => {
        if (err) console.error(`Failed to delete file: ${err}`);
      });
    });

    // Handle errors
    audioStream.on('error', async (error) => {
      console.error(error);
      await ctx.reply("Error downloading song. Please check the URL and try again.");
    });

    writeStream.on('error', async (error) => {
      console.error(error);
      await ctx.reply("Error saving song. Please try again later.");
    });

  } catch (error) {
    console.error(error);
    await ctx.reply("Error downloading song. Please check the URL and try again.");
  }
};