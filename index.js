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
  mqttClient.subscribe('pneu/pressure', (err) => {
    if (!err) {
      console.log('Subscribed to pneu/pressure topic');
    }
  });
  mqttClient.subscribe('pneu/flowrate', (err) => {
    if (!err) {
      console.log('Subscribed to pneu/flowrate topic');
    }
  });
  mqttClient.subscribe('pneu/exhaust_temperature', (err) => { // New subscription
    if (!err) {
      console.log('Subscribed to pneu/exhaust_temperature topic');
    }
  });
  mqttClient.subscribe('pneu/rms_velocity', (err) => {
    if (!err) {
      console.log('Subscribed to pneu/rms_velocity topic');
    }
  });
  mqttClient.subscribe('pneu/pressure_dew_point', (err) => {
    if (!err) {
      console.log('Subscribed to pneu/pressure_dew_point topic');
    }
  });
  mqttClient.subscribe('pneu/current', (err) => {
    if (!err) {
      console.log('Subscribed to pneu/current topic');
    }
  });
});

mqttClient.on('message', (topic, message) => {
  // message is Buffer
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  if (topic === 'pneu/pressure') {
    io.emit('pressureUpdate', message.toString()); // Emit to all connected clients
  } else if (topic === 'pneu/flowrate') {
    io.emit('flowrateUpdate', message.toString()); // Emit to all connected clients
  } else if (topic === 'pneu/exhaust_temperature') { // New message handling
    io.emit('exhaustTemperatureUpdate', message.toString()); // Emit to all connected clients
  } else if (topic === 'pneu/rms_velocity') {
    io.emit('rmsVelocityUpdate', message.toString()); // Emit to all connected clients
  } else if (topic === 'pneu/pressure_dew_point') {
    io.emit('pressureDewPointUpdate', message.toString()); // Emit to all connected clients
  } else if (topic === 'pneu/current') {
    io.emit('currentUpdate', message.toString()); // Emit to all connected clients
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
