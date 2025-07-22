// Update clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('time').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Simulate random data changes
function simulateData() {
    // Pressure (0-150 PSI)
    const pressure = 50 + Math.random() * 80;
    document.getElementById('pressure-value').textContent = pressure.toFixed(0);
    const pressureAngle = (pressure / 150) * 180 - 90;
    document.getElementById('pressure-needle').style.transform = `translateX(-50%) rotate(${pressureAngle}deg)`;
    
    // Flow (0-50 GPM)
    const flow = 10 + Math.random() * 30;
    document.getElementById('flow-value').textContent = flow.toFixed(0);
    const flowAngle = (flow / 50) * 180 - 90;
    document.getElementById('flow-needle').style.transform = `translateX(-50%) rotate(${flowAngle}deg)`;
    
    // Temperature (0-120°C)
    const temp = 30 + Math.random() * 60;
    document.getElementById('temp-value').textContent = temp.toFixed(0);
    const tempAngle = (temp / 120) * 180 - 90;
    document.getElementById('temp-needle').style.transform = `translateX(-50%) rotate(${tempAngle}deg)`;
    
    // Vibration
    const vibration = (Math.random() * 5).toFixed(2);
    document.getElementById('vibration-value').textContent = vibration;
    updateVibrationChart(vibration);
    
    // Humidity (30-80%)
    const humidity = (40 + Math.random() * 40).toFixed(0);
    document.getElementById('humidity-value').textContent = humidity;
    document.getElementById('humidity-bar').style.height = `${humidity}%`;
    document.getElementById('humidity-fill').style.height = `${humidity}%`;
    
    // Dew Point (10-30°C)
    const dewpoint = (10 + Math.random() * 20).toFixed(0);
    document.getElementById('dewpoint-value').textContent = dewpoint;
    document.getElementById('dewpoint-fill').style.height = `${(dewpoint / 30) * 100}%`;
    
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

// Initialize vibration chart
// let vibrationChart;
// function initVibrationChart() {
//     const ctx = document.getElementById('vibration-chart').getContext('2d');
//     vibrationChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: Array(20).fill(''),
//             datasets: [{
//                 data: Array(20).fill(0),
//                 borderColor: '#00ff41',
//                 borderWidth: 2,
//                 pointRadius: 0,
//                 tension: 0.1,
//                 fill: {
//                     target: 'origin',
//                     above: 'rgba(0, 255, 65, 0.1)'
//                 }
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//                 y: {
//                     min: 0,
//                     max: 5,
//                     grid: {
//                         color: 'rgba(0, 255, 65, 0.1)'
//                     },
//                     ticks: {
//                         color: '#00ff41'
//                     }
//                 },
//                 x: {
//                     grid: {
//                         display: false
//                     },
//                     ticks: {
//                         display: false
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 }
//             }
//         }
//     });
// }

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
    initVibrationChart();
    setInterval(simulateData, 60000);
    simulateData();
});
