const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mqtt = require('mqtt');
const port = 3000;

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Define a route for the root URL to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// MQTT Client setup
const mqttClient = mqtt.connect('mqtt://localhost:1883'); // No credentials needed

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('pneu/data', (err) => {
    if (!err) {
      console.log('Subscribed to pneu/data topic');
    }
  });
});

mqttClient.on('message', (topic, message) => {
  // message is Buffer
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  if (topic === 'pneu/data') {
    try {
      const data = JSON.parse(message.toString());
      io.emit('pressureUpdate', data.pressure.toString());
      io.emit('flowrateUpdate', data.flowRate.toString());
      io.emit('exhaustTemperatureUpdate', data.exhaustTemperature.toString());
      io.emit('rmsVelocityUpdate', data.rmsVelocity.toString());
      io.emit('pressureDewPointUpdate', data.pressureDewPoint.toString());
      io.emit('currentUpdate', data.current.toString());
    } catch (e) {
      console.error('Failed to parse JSON message:', e);
    }
  }
});

mqttClient.on('error', (err) => {
  console.error('MQTT Error:', err);
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
