import { Markup } from 'telegraf';

export const setupInlineButtons = (bot) => {
    bot.command('help', (ctx) => {
        ctx.reply('Choose a command:', Markup.inlineKeyboard([
            [Markup.button.callback('Play Music', 'music')],
            [Markup.button.callback('Echo', 'echo')],
            [Markup.button.callback('Uptime', 'uptime')],
            [Markup.button.callback('Admin Commands', 'admin')],
            [Markup.button.callback('Info', 'info')],
            [Markup.button.callback('Jokes', 'jokes')],
            [Markup.button.callback('Weather', 'weather')]
        ]));
    });

    bot.action('music', (ctx) => {
        ctx.reply('Send me a YouTube URL to play music!');
    });

    bot.action('echo', (ctx) => {
        ctx.reply('What do you want to echo? Send your message!');
    });

    bot.action('uptime', (ctx) => {
        ctx.reply('Fetching uptime...');
        import('../commands/uptime.js').then(module => {
            module.uptimeCommand(ctx);
        });
    });

    bot.action('admin', (ctx) => {
        ctx.reply('Sending admin commands...');
        import('../commands/admin.js').then(module => {
            module.adminCommand(ctx, '/admin status');
        });
    });

    bot.action('info', (ctx) => {
        ctx.reply('Fetching bot info...');
        import('../commands/info.js').then(module => {
            module.infoCommand(ctx);
        });
    });

    bot.action('jokes', (ctx) => {
        ctx.reply('Fetching a joke...');
        import('../commands/jokes.js').then(module => {
            module.jokesCommand(ctx);
        });
    });

    bot.action('weather', (ctx) => {
        ctx.reply('Send me a city name to get the weather!');
    });
};
