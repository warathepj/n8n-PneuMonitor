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

// Simulate pneumatic pump pressure and flow rate every 8 seconds
setInterval(() => {
  const pressure = generateRandomPressure();
  const flowRate = generateRandomFlowRate();
  const exhaustTemperature = generateRandomExhaustTemperature();

  const pressureTopic = 'pneu/pressure';
  const pressureMessage = pressure.toString();

  const flowRateTopic = 'pneu/flowrate';
  const flowRateMessage = flowRate.toString();

  client.publish(pressureTopic, pressureMessage, (err) => {
    if (err) {
      console.error('Failed to publish pressure message:', err);
    } else {
      console.log(`Published ${pressureMessage} to ${pressureTopic}`);
    }
  });

  client.publish(flowRateTopic, flowRateMessage, (err) => {
    if (err) {
      console.error('Failed to publish flow rate message:', err);
    } else {
      console.log(`Published ${flowRateMessage} to ${flowRateTopic}`);
    }
  });

  const exhaustTemperatureTopic = 'pneu/exhaust_temperature';
  const exhaustTemperatureMessage = exhaustTemperature.toString();

  client.publish(exhaustTemperatureTopic, exhaustTemperatureMessage, (err) => {
    if (err) {
      console.error('Failed to publish exhaust temperature message:', err);
    } else {
      console.log(`Published ${exhaustTemperatureMessage} to ${exhaustTemperatureTopic}`);
    }
  });
}, 8000);
