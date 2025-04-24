# CoAP Temperature Sensor System

A lightweight implementation of a temperature sensor network using the Constrained Application Protocol (CoAP). This project provides both server and client components for IoT temperature and humidity monitoring.

## Features

- **CoAP Protocol**: Lightweight IoT communication using the CoAP protocol
- **Real-time Monitoring**: Continuous temperature and humidity data transmission
- **Unique Device Identification**: Each sensor gets a unique device ID
- **Timestamp Recording**: All measurements are timestamped for time-series analysis
- **Proper Error Handling**: Robust error management for both client and server
- **Standardized Responses**: RFC-compliant CoAP status codes

## Requirements

- Node.js 14.x or higher
- npm or yarn package manager

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/coap-temperature-sensor.git
cd coap-temperature-sensor
npm install
```

### Dependencies

This project relies on the following npm packages:
- `coap`: For CoAP protocol implementation

## Usage

### Starting the Server

Run the CoAP server to begin accepting data from temperature sensors:

```bash
node coap-server.js
```

The server will listen on the standard CoAP port (5683) and process incoming temperature readings on the `/sensor/temp` endpoint.

### Running the Client (Sensor Simulator)

To simulate a temperature sensor sending data:

```bash
node coap-client.js
```

The client will:
1. Generate a unique device ID
2. Send temperature readings (18-26°C) and humidity levels (30-70%) every 5 seconds
3. Include timestamps with each reading
4. Log server responses

## API Reference

### Server Endpoints

#### `POST /sensor/temp`

Accepts temperature sensor data in JSON format.

**Request Body:**
```json
{
  "temperature": "23.45°C",
  "humidity": "45.67%",
  "timestamp": "2025-04-24T12:34:56.789Z",
  "deviceID": "temp_sensor_abc123"
}
```

**Successful Response (CoAP 2.01 Created):**
```json
{
  "status": "success",
  "message": "Temperature data received"
}
```

**Error Response (CoAP 4.00 Bad Request):**
```json
{
  "status": "error",
  "message": "Invalid JSON format"
}
```

## Architecture

The system follows a simple client-server architecture:

1. **Client (Temperature Sensor)**:
   - Simulates a temperature sensor by generating random values
   - Creates a unique device ID for identification
   - Sends data to the server via CoAP POST requests

2. **Server (Data Collector)**:
   - Receives temperature and humidity data from multiple sensors
   - Validates incoming data format
   - Processes and logs the data
   - Returns confirmation responses

## Development

### Extending the Server

To add data persistence, modify the server's request handler:

```javascript
// Example: Add database storage
req.on('end', () => {
    try {
        const data = JSON.parse(payload);
        
        // Extract data
        const temperature = data.temperature;
        const humidity = data.humidity;
        const timestamp = data.timestamp;
        const deviceID = data.deviceID;
        
        // Save to database (example)
        saveToDatabase(deviceID, temperature, humidity, timestamp);
        
        // Return success
        res.code = '2.01';
        res.end(JSON.stringify({ status: 'success', message: 'Temperature data received' }));
    } catch (error) {
        // Error handling
    }
});
```

### Creating Real Sensor Clients

To implement on actual hardware sensors:

1. Port the client code to the target platform
2. Replace random value generation with actual sensor readings
3. Configure network settings for your environment
4. Adjust polling frequency based on requirements

## License

[MIT License](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request