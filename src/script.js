const socket = io();

// Update clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('time').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Function to update gauge needle rotation
function updateNeedle(needleId, value, maxValue, offsetDegrees) {
    const needle = document.getElementById(needleId);
    if (needle) {
        const rotation = (value / maxValue) * 180 - offsetDegrees; // 180 degrees for half circle, adjust offset
        needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
    }
}

// Socket.IO event listener for pressure updates
socket.on('pressureUpdate', (pressure) => {
    const pressureValueElement = document.getElementById('pressure-value');
    if (pressureValueElement) {
        pressureValueElement.textContent = parseFloat(pressure).toFixed(2);
        updateNeedle('pressure-needle', parseFloat(pressure), 150, 90); // Max 150 PSI, 90 degree offset for 0 at left
    }
});

// Socket.IO event listener for flowrate updates
socket.on('flowrateUpdate', (flowrate) => {
    const flowValueElement = document.getElementById('flow-value');
    if (flowValueElement) {
        flowValueElement.textContent = parseFloat(flowrate).toFixed(2);
        updateNeedle('flow-needle', parseFloat(flowrate), 3.1, 90); // Max 3.1 CBM/MIN, 90 degree offset for 0 at left
    }
});

// Socket.IO event listener for exhaust temperature updates
socket.on('exhaustTemperatureUpdate', (temperature) => {
    const tempValueElement = document.getElementById('temp-value');
    if (tempValueElement) {
        tempValueElement.textContent = parseFloat(temperature).toFixed(2);
        updateNeedle('temp-needle', parseFloat(temperature), 120, 90); // Max 120°C, 90 degree offset for 0 at left
    }
});

// Socket.IO event listener for rmsVelocity updates
socket.on('rmsVelocityUpdate', (rmsVelocity) => {
    const vibrationValueElement = document.getElementById('vibration-value');
    if (vibrationValueElement) {
        vibrationValueElement.textContent = parseFloat(rmsVelocity).toFixed(2);
    }
});

// Socket.IO event listener for pressureDewPoint updates
socket.on('pressureDewPointUpdate', (value) => {
    const dewPointValueElement = document.getElementById('dewpoint-value');
    const humidityBar = document.getElementById('humidity-bar');
    const humidityFill = document.getElementById('humidity-fill');
    const dewpointFill = document.getElementById('dewpoint-fill');

    const dewPoint = parseFloat(value);
    if (!isNaN(dewPoint)) {
        dewPointValueElement.textContent = dewPoint.toFixed(1); // Display with one decimal place

        // Dew point range for visualization: 0 to 12 degrees Celsius
        const minDewPoint = 0;
        const maxDewPoint = 12;
        const percentage = ((dewPoint - minDewPoint) / (maxDewPoint - minDewPoint)) * 100;
        const clampedPercentage = Math.max(0, Math.min(100, percentage));

        humidityBar.style.height = `${clampedPercentage}%`;
        humidityFill.style.height = `${clampedPercentage}%`;
        dewpointFill.style.height = `${clampedPercentage}%`;
    }
});

// Simulate random data changes (modified to not update pressure)
function simulateData() {
    // Flow (0-50 GPM) - Removed as it's now handled by Socket.IO
    // const flow = 10 + Math.random() * 30;
    // document.getElementById('flow-value').textContent = flow.toFixed(0);
    // const flowAngle = (flow / 50) * 180 - 90;
    // document.getElementById('flow-needle').style.transform = `translateX(-50%) rotate(${flowAngle}deg)`;
    
    // Temperature (0-120°C) - Removed as it's now handled by Socket.IO
    // const temp = 30 + Math.random() * 60;
    // document.getElementById('temp-value').textContent = temp.toFixed(0);
    // const tempAngle = (temp / 120) * 180 - 90;
    // document.getElementById('temp-needle').style.transform = `translateX(-50%) rotate(${tempAngle}deg)`;
    
    // Vibration - Removed as it's now handled by Socket.IO
    // const vibration = (Math.random() * 5).toFixed(2);
    // document.getElementById('vibration-value').textContent = vibration;
    // updateVibrationChart(vibration); // Re-enable if chart is used
    
    // Humidity (30-80%) - REMOVED, now handled by Socket.IO
    // const humidity = (40 + Math.random() * 40).toFixed(0);
    // document.getElementById('humidity-value').textContent = humidity;
    // document.getElementById('humidity-bar').style.height = `${humidity}%`;
    // document.getElementById('humidity-fill').style.height = `${humidity}%`;
    
    // Dew Point (10-30°C) - REMOVED, now handled by Socket.IO
    // const dewpoint = (10 + Math.random() * 20).toFixed(0);
    // document.getElementById('dewpoint-value').textContent = dewpoint;
    // document.getElementById('dewpoint-fill').style.height = `${(dewpoint / 30) * 100}%`;
    
    // Current (5-15A)
    const current = (5 + Math.random() * 10).toFixed(1);
    document.getElementById('current-value').textContent = current;
    document.getElementById('current-bar').style.height = `${(current / 15) * 100}%`;
    
    // Power (1-10kW)
    const power = (1 + Math.random() * 9).toFixed(1);
    document.getElementById('power-value').textContent = power;
    document.getElementById('power-bar').style.height = `${(power / 10) * 100}%`;
    
    // Efficiency (60-95%)
    const efficiency = (60 + Math.random() * 35).toFixed(0);
    document.getElementById('efficiency-value').textContent = `EFF: ${efficiency}%`;
    
    // Trigger alert every minute
    triggerRandomAlert();
}

// Update vibration chart
function updateVibrationChart(value) {
    const data = vibrationChart.data.datasets[0].data;
    data.shift();
    data.push(value);
    vibrationChart.update();
    
    // Change line color based on value
    if (value > 3.5) {
        vibrationChart.data.datasets[0].borderColor = '#ff0000';
        vibrationChart.data.datasets[0].fill.above = 'rgba(255, 0, 0, 0.1)';
    } else if (value > 2.5) {
        vibrationChart.data.datasets[0].borderColor = '#ffff00';
        vibrationChart.data.datasets[0].fill.above = 'rgba(255, 255, 0, 0.1)';
    } else {
        vibrationChart.data.datasets[0].borderColor = '#00ff41';
        vibrationChart.data.datasets[0].fill.above = 'rgba(0, 255, 65, 0.1)';
    }
    vibrationChart.update();
}

// Trigger random alert
function triggerRandomAlert() {
    const alerts = [
        "PRESSURE FLUCTUATION DETECTED",
        "TEMPERATURE RISING",
        "VIBRATION LEVEL HIGH",
        "FLOW RATE UNSTABLE",
        "MOTOR CURRENT SPIKE"
    ];
    const alertElement = document.createElement('div');
    alertElement.className = 'alert bg-red-900 text-white p-3 mb-2 rounded text-center glow-text';
    alertElement.textContent = `WARNING: ${alerts[Math.floor(Math.random() * alerts.length)]}`;
    
    const systemStatus = document.querySelector('.gauge-container:last-child');
    systemStatus.insertBefore(alertElement, systemStatus.firstChild);
    
    // Change status to warning
    const statusDivs = systemStatus.querySelectorAll('.text-green-500');
    statusDivs.forEach(div => {
        if (Math.random() > 0.5) {
            div.textContent = "WARNING";
            div.className = "text-yellow-500 font-bold";
        }
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertElement.remove();
        statusDivs.forEach(div => {
            div.textContent = div.textContent.includes("STATUS") ? "OPERATIONAL" : 
                              div.textContent.includes("PRESSURE") ? "NORMAL" :
                              div.textContent.includes("TEMPERATURE") ? "WITHIN RANGE" : "NONE";
            div.className = "text-green-500 font-bold";
        });
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // initVibrationChart(); // User requested not to use this
    setInterval(simulateData, 60000);
    simulateData();
});
