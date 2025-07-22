document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('poissonSim');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let events = [];
    let lambda = 2; // Tasa de eventos por segundo

    function drawEvent(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#00ff9f';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff9f';
        ctx.fill();
        ctx.closePath();
    }

    function simulatePoisson() {
        ctx.clearRect(0, 0, width, height);
        const timeStep = 0.1;
        const probEvent = lambda * timeStep;
        events = events.filter(event => event.y < height);
        if (Math.random() < probEvent) {
            events.push({ x: Math.random() * width, y: 0 });
        }
        events.forEach(event => {
            event.y += 3;
            drawEvent(event.x, event.y);
        });
        requestAnimationFrame(simulatePoisson);
    }

    simulatePoisson();
});