const statusCommand = (ctx) => {
    const uptimeInSeconds = process.uptime();
  
    const days = Math.floor(uptimeInSeconds / (24 * 3600));
    const hours = Math.floor((uptimeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  
    const statusText = `
      Bot Status:
      - Uptime: ${days} days, ${hours} hours, ${minutes} minutes
      - Maintenance Mode: ${process.env.MAINTENANCE_MODE ? 'Enabled' : 'Disabled'}
    `;
    
    ctx.reply(statusText);
  };
  
  export default statusCommand;
  