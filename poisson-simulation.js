const poissonCanvas = document.createElement('canvas');
poissonCanvas.id = 'poissonSim';
poissonCanvas.width = 150;
poissonCanvas.height = 100;
poissonCanvas.style.cssText = 'position: absolute; top: 120px; left: 10px; z-index: 100; border: 1px solid #00ff9f; border-radius: 8px; background: rgba(0, 0, 0, 0.5);';
document.body.appendChild(poissonCanvas);
const ctx = poissonCanvas.getContext('2d');
let events = [];
let poissonLambda = 0.05;

function drawEvent(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#00ff9f';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00ff9f';
    ctx.fill();
    ctx.closePath();
}

function simulatePoisson(lambda) {
    ctx.clearRect(0, 0, poissonCanvas.width, poissonCanvas.height);
    const timeStep = 0.1;
    const probEvent = lambda * timeStep;
    events = events.filter(event => event.y < poissonCanvas.height);
    if (Math.random() < probEvent) events.push({ x: Math.random() * poissonCanvas.width, y: 0 });
    events.forEach(event => { event.y += 2; drawEvent(event.x, event.y); });
    requestAnimationFrame(() => simulatePoisson(lambda));
}
simulatePoisson(poissonLambda);