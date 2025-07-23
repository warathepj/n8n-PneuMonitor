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

// Simulate pneumatic pump pressure and flow rate every 8 seconds
setInterval(() => {
  const pressure = generateRandomPressure();
  const flowRate = generateRandomFlowRate();
  const exhaustTemperature = generateRandomExhaustTemperature();
  const rmsVelocity = generateRandomRMSVelocity();
  const pressureDewPoint = generateRandomPressureDewPoint();

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

  const rmsVelocityTopic = 'pneu/rms_velocity';
  const rmsVelocityMessage = rmsVelocity.toString();

  client.publish(rmsVelocityTopic, rmsVelocityMessage, (err) => {
    if (err) {
      console.error('Failed to publish RMS velocity message:', err);
    } else {
      console.log(`Published ${rmsVelocityMessage} to ${rmsVelocityTopic}`);
    }
  });

  const pressureDewPointTopic = 'pneu/pressure_dew_point';
  const pressureDewPointMessage = pressureDewPoint.toString();

  client.publish(pressureDewPointTopic, pressureDewPointMessage, (err) => {
    if (err) {
      console.error('Failed to publish pressure dew point message:', err);
    } else {
      console.log(`Published ${pressureDewPointMessage} to ${pressureDewPointTopic}`);
    }
  });
}, 8000);
