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

function generateRandomFlowRate() {
  const minFlowRate = 2.5;
  const maxFlowRate = 3.1;
  return (Math.random() * (maxFlowRate - minFlowRate) + minFlowRate).toFixed(2);
}

function generateRandomExhaustTemperature() {
  const minTemp = 100;
  const maxTemp = 125;
  return Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;
}

function generateRandomRMSVelocity() {
  const minVelocity = 1.0;
  const maxVelocity = 9.0;
  return (Math.random() * (maxVelocity - minVelocity) + minVelocity).toFixed(2);
}

function generateRandomPressureDewPoint() {
  const minDewPoint = 0;
  const maxDewPoint = 12;
  return Math.floor(Math.random() * (maxDewPoint - minDewPoint + 1)) + minDewPoint;
}

function generateRandomCurrent() {
  const minCurrent = 38;
  const maxCurrent = 44;
  return (Math.random() * (maxCurrent - minCurrent) + minCurrent).toFixed(2);
}

// Simulate pneumatic pump pressure and flow rate every 8 seconds
setInterval(() => {
  const pressure = generateRandomPressure();
  const flowRate = generateRandomFlowRate();
  const exhaustTemperature = generateRandomExhaustTemperature();
  const rmsVelocity = generateRandomRMSVelocity();
  const pressureDewPoint = generateRandomPressureDewPoint();
  const current = generateRandomCurrent();

  const data = {
    pressure: pressure,
    flowRate: flowRate,
    exhaustTemperature: exhaustTemperature,
    rmsVelocity: rmsVelocity,
    pressureDewPoint: pressureDewPoint,
    current: current
  };

  const topic = 'pneu/data';
  const message = JSON.stringify(data);

  client.publish(topic, message, (err) => {
    if (err) {
      console.error('Failed to publish message:', err);
    } else {
      console.log(`Published ${message} to ${topic}`);
    }
  });
}, 8000);
