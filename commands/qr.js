import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const QR_API_URL = 'https://api.qrserver.com/v1/create-qr-code/';

export default async function qrCommand(ctx, args) {
    if (args.length === 0) {
        ctx.reply(
            'Usage:\n' +
            '/qr [text or URL]\n' +
            '/qr wifi [SSID] [password] [encryption] (optional) [authentication] (optional)\n\n' +
            'Supported encryptions:\n' +
            '- WPA (default)\n' +
            '- WPA2\n' +
            '- WPA3\n' +
            '- WEP\n' +
            '- 802.1X (requires authentication, e.g., PEAP, EAP-TTLS)'
        );
        return;
    }

    const commandType = args[0].toLowerCase();

    try {
        let qrCodeUrl;

        // Check if the command is for WiFi QR Code
        if (commandType === 'wifi' && args.length >= 3) {
            const ssid = args[1];
            const password = args[2];
            const encryption = args[3] ? args[3].toUpperCase() : 'WPA'; // Default to WPA
            const auth = args[4] ? args[4].toUpperCase() : ''; // Optional authentication method for 802.1X

            let wifiData;

            // Generate the WiFi QR Code data format
            if (encryption === 'WPA3') {
                wifiData = `WIFI:S:${ssid};T:WPA3;P:${password};;`;
            } else if (encryption === 'WPA2') {
                wifiData = `WIFI:S:${ssid};T:WPA2;P:${password};;`;
            } else if (encryption === 'WEP') {
                wifiData = `WIFI:S:${ssid};T:WEP;P:${password};;`;
            } else if (encryption === '802.1X') {
                if (!auth) {
                    ctx.reply('802.1X requires an authentication method. Example: /qr wifi [SSID] [password] 802.1X PEAP');
                    return;
                }
                wifiData = `WIFI:S:${ssid};T:WPA2-EAP;E:${auth};P:${password};;`;
            } else {
                // Default to WPA for any unspecified or WPA encryption
                wifiData = `WIFI:S:${ssid};T:WPA;P:${password};;`;
            }

            qrCodeUrl = `${QR_API_URL}?size=300x300&data=${encodeURIComponent(wifiData)}`;

            ctx.reply(`Here is your WiFi QR Code (SSID: ${ssid}):\n${qrCodeUrl}`);
        } else {
            // Regular QR Code
            const data = args.join(' ');
            qrCodeUrl = `${QR_API_URL}?size=300x300&data=${encodeURIComponent(data)}`;

            ctx.reply(`Here is your QR Code:\n${qrCodeUrl}`);
        }
    } catch (error) {
        ctx.reply('Error generating QR code. Please try again.');
    }
}
