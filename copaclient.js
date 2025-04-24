import { request } from 'coap';

// Function to generate a random device ID
function generateDeviceID() {
    return 'device_' + Math.random().toString(36).substr(2, 9);
}

const deviceID = generateDeviceID(); // Generate random device ID

function sendTemperature() {
    const temperature = (Math.random() * (24 - 18) + 18).toFixed(2); // Generate random temperature between 18 and 24
    const humidity = (Math.random() * (90 - 30) + 18).toFixed(2); // Generate random temperature between 18 and 24

    const payload = JSON.stringify({
        temperature: `${temperature}Â°C`,
        humidity: `${humidity}Â°C`,
        timestamp: new Date().toISOString(),
        deviceID: deviceID
    });

    const req = request({
        hostname: 'localhost',
        port: 3000,
        pathname: '/sensor/temp',
        method: 'POST',
        confirmable: true
    });
    console.log('Sending temperature data:', payload); // Log the payload being sent
    req.write(payload);
    req.on('response', (res) => {
        res.on('data', (help) => {
            process.stdout.write(help + '\n');
        });
   });
    req.end();
}

// Send temperature every 5 seconds
setInterval(sendTemperature, 5000);