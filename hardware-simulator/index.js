function generateRandomPressure() {
  // Generate a random integer between 80 and 160 (inclusive)
  const minPressure = 80;
  const maxPressure = 160;
  return Math.floor(Math.random() * (maxPressure - minPressure + 1)) + minPressure;
}

// Simulate pneumatic pump pressure every 8 seconds
setInterval(() => {
  const pressure = generateRandomPressure();
  console.log(`Pneumatic Pump Pressure: ${pressure}psi`);
}, 8000);
