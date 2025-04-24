import { createServer } from 'coap';
import { parse } from 'url';

// Create a CoAP server
const server = createServer();

server.on('request', (req, res) => {
    const { pathname } = parse(req.url);
    console.log(`Received request for ${pathname}`);

    if (pathname === '/sensor/temp' && req.method === 'POST') {
        let payload = '';

        req.on('data', (chunk) => {
            payload += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(payload);

                // Extract temperature sensor data
                const temperature = data.temperature;
                const humidity = data.humidity;
                const timestamp = data.timestamp;
                const deviceID = data.deviceID;

                console.log(`Received data: ${JSON.stringify(data)}`);
                console.log(`Temperature: ${temperature}, Humidity: ${humidity}`);
                console.log(`Device: ${deviceID}, Time: ${timestamp}`);

                // Return a success message
                res.code = '2.01'; // Created
                res.end(JSON.stringify({ status: 'success', message: 'Temperature data received' }));
            } catch (error) {
                console.error('Error processing payload:', error);
                res.code = '4.00'; // Bad Request
                res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON format' }));
            }
        });
    } else {
        res.code = '4.04'; // Not Found
        res.end(JSON.stringify({ status: 'error', message: 'Endpoint not found' }));
    }
});

// Start the CoAP server
const PORT = 5683; // Standard CoAP port
server.listen(PORT, () => {
    console.log(`CoAP server started on port ${PORT}`);
    console.log('Waiting for temperature data on /sensor/temp endpoint...');
});