import { createServer } from 'coap';
import { parse } from 'url';

// Create a CoAP server
const server = createServer();

server.on('request', (req, res) => {
    const { pathname } = parse(req.url);
    console.log(`Received request for ${pathname}`); // Log the request path
    if (pathname === '/sensor/temp' && req.method === 'POST') {
        let payload = '';

        req.on('data', (chunk) => {
            payload += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(payload); // Parse JSON payload

                // Print and handle the data (e.g., sound, timestamp, deviceID)
                const sound = data.temp;
                const timestamp = data.timestamp;
                const device_id = data.deviceID;

                // Print the received data for debugging purposes
                console.log(`Received data: ${JSON.stringify(data)}`);

                // Return a success message
                res.code = '2.04'; // Changed
                res.end('Data received');
            } catch (error) {
                res.code = '4.00'; // Bad Request
                res.end('Invalid JSON format');
            }
        });
    } else {
        res.code = '4.04'; // Not Found
        res.end('Not Found');
    }
});

// Start the CoAP server
server.listen(() => {
    console.log('CoAP server started');
});