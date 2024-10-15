import { commandHandler } from './commandHandler.js';

export const messageHandler = (ctx) => {
    const messageText = ctx.message.text.trim();
    commandHandler(ctx, messageText);
};
