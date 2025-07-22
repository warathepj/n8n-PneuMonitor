const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

function generateRandomPressure() {
  // Generate a random integer between 80 and 160 (inclusive)
  const minPressure = 80;
  const maxPressure = 160;
  return Math.floor(Math.random() * (maxPressure - minPressure + 1)) + minPressure;
}

// Simulate pneumatic pump pressure every 8 seconds
setInterval(() => {
  const pressure = generateRandomPressure();
  const topic = 'pneu/pressure';
  const message = pressure.toString();

  client.publish(topic, message, (err) => {
    if (err) {
      console.error('Failed to publish message:', err);
    } else {
      console.log(`Published ${message} to ${topic}`);
    }
  });
}, 8000);
