import { request } from 'coap';

// Function to generate a random device ID
function generateDeviceID() {
    return 'temp_sensor_' + Math.random().toString(36).substring(2, 10);
}

const deviceID = generateDeviceID();
console.log(`Device ID: ${deviceID}`);

function sendTemperatureData() {
    // Generate random temperature between 18°C and 26°C
    const temperature = (Math.random() * (26 - 18) + 18).toFixed(2);
    
    // Generate random humidity between 30% and 70%
    const humidity = (Math.random() * (70 - 30) + 30).toFixed(2);
    
    const payload = JSON.stringify({
        temperature: `${temperature}°C`,
        humidity: `${humidity}%`,
        timestamp: new Date().toISOString(),
        deviceID: deviceID
    });

    const req = request({
        hostname: 'localhost',
        port: 5683, // Standard CoAP port
        pathname: '/sensor/temp',
        method: 'POST',
        confirmable: true
    });

    console.log('Sending temperature data:');
    console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);
    
    req.write(payload);
    
    req.on('response', (res) => {
        console.log('Response code:', res.code);
        
        res.on('data', (data) => {
            try {
                const response = JSON.parse(data.toString());
                console.log('Server response:', response);
            } catch (e) {
                console.log('Server response:', data.toString());
            }
        });
    });
    
    req.on('error', (err) => {
        console.error('Error sending data:', err);
    });
    
    req.on('timeout', (err) => {
        console.error('Request timed out:', err);
    });
    
    req.end();
}

// Initial delay to allow server to start if run simultaneously
setTimeout(() => {
    console.log('CoAP temperature client started');
    
    // Send temperature data every 5 seconds
    sendTemperatureData(); // Send first data point immediately
    setInterval(sendTemperatureData, 5000);
}, 1000);