const express = require('express');
const sensor = require('node-dht-sensor');

const app = express();
const PORT = 3000;

// DHT Sensor type and pin
const DHT_TYPE = 11; // DHT11 or change to 22 for DHT22
const DHT_PIN = 4; // GPIO pin number

// Serve static files (for frontend CSS/JS if needed)
app.use(express.static('public'));

// Route to fetch sensor data
app.get('/sensor-data', (req, res) => {
  // Read data from DHT sensor
  sensor.read(DHT_TYPE, DHT_PIN, function (err, temperature, humidity) {
    if (err) {
      console.error('Error reading sensor data:', err);
      res.status(500).json({ error: 'Error reading sensor data' });
      return;
    }

    // Return temperature and humidity data as JSON
    res.json({
      temperature: temperature.toFixed(1), // Temperature in Celsius
      humidity: humidity.toFixed(1) // Humidity in percentage
    });
  });
});

// Serve the main webpage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
