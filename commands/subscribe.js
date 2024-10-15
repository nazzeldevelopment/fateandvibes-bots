// import { sendNotificationToAdmin, sendNotificationToUser, verifyPayment } from '../utils/paymentUtils.js'; // Placeholder utility functions

export default async function subscribeCommand(ctx, userId) {
    // Step 1: Inform the user about the subscription process
    ctx.reply(`
      🎉 Para mag-subscribe, pumili ka ng paraan ng pagbabayad:
      1. GCash - Send to: 09608364633
      2. PayMaya - Send to: 09944736545
      3. Lazada - Send to: 09944736545
  
      Pagkatapos mong magbayad, i-send ang proof of payment (screenshot) sa bot gamit ang: \`/confirm [transaction ID]\`.
    `);
  }
  