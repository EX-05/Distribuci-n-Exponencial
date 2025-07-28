document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        particles: { number: { value: 100, density: { enable: true, value_area: 800 } }, color: { value: ['#00f2ff', '#ff00ff', '#00ff9f'] }, shape: { type: 'circle' }, opacity: { value: 0.6, random: true }, size: { value: 3, random: true }, move: { enable: true, speed: 3, direction: 'none', random: true } },
        interactivity: { events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'repulse' } } }
    });
    Reveal.initialize({ transition: 'cube', hash: true });

    let charts = {};
    window.showModal = function(modalId) { const modal = document.getElementById(modalId); if (modal) { modal.style.display = 'block'; initializeChart(modalId.replace('Modal', '')); } };
    window.closeModal = function(modalId) { const modal = document.getElementById(modalId); if (modal) modal.style.display = 'none'; };

    function initializeChart(chartId) {
        if (charts[chartId]) return;
        const canvas = document.getElementById(chartId);
        if (!canvas) return;
        const config = {
            motivationChart: { type: 'line', data: { labels: [0, 2, 4, 6, 8], datasets: [{ label: 'Curva Exponencial', data: [1, 0.607, 0.368, 0.223, 0.135], borderColor: '#00eaff', fill: false }] }, options: { responsive: true, scales: { x: { title: { display: true, text: 'Tiempo' } }, y: { title: { display: true, text: 'Probabilidad' }, min: 0, max: 1 } }, maintainAspectRatio: false } },
            simulationChart: { type: 'scatter', data: { datasets: [{ label: 'Tiempos', data: generateExponentialData(0.5).map(x => ({ x: x, y: Math.random() * 0.1 })).slice(0, 20), backgroundColor: '#00eaff', pointRadius: 3 }] }, options: { responsive: true, scales: { x: { title: { display: true, text: 'Tiempo' } }, y: { title: { display: true, text: 'Frecuencia' } } }, maintainAspectRatio: false } },
            patternChart: { type: 'line', data: { labels: [0, 2, 4, 6, 8], datasets: [{ label: 'λ = 0.1', data: [1, 0.904, 0.818, 0.740, 0.670], borderColor: '#00eaff', fill: false }, { label: 'λ = 0.3', data: [1, 0.740, 0.548, 0.406, 0.301], borderColor: '#ff00ff', fill: false }, { label: 'λ = 0.8', data: [1, 0.449, 0.202, 0.091, 0.041], borderColor: '#ffd700', fill: false }, { label: 'λ = 1', data: [1, 0.368, 0.135, 0.050, 0.018], borderColor: '#00ff9f', fill: false }] }, options: { responsive: true, scales: { x: { title: { display: true, text: 'Tiempo' } }, y: { title: { display: true, text: 'Probabilidad' }, min: 0, max: 1 } }, maintainAspectRatio: false } },
            excelChart: { type: 'bar', data: { labels: [], datasets: [{ label: 'Frecuencia', data: [], backgroundColor: '#00eaff', borderRadius: 3 }] }, options: { responsive: true, scales: { x: { title: { display: true, text: 'Tiempo' } }, y: { title: { display: true, text: 'Frecuencia' }, beginAtZero: true } }, maintainAspectRatio: false } },
            summaryChart: { type: 'bar', data: { labels: ['Sin Memoria', 'Riesgo Constante', 'Poisson'], datasets: [{ label: 'Impacto', data: [0.8, 0.7, 0.9], backgroundColor: '#00eaff', borderRadius: 3 }] }, options: { responsive: true, scales: { x: { title: { display: true, text: 'Propiedades' } }, y: { title: { display: true, text: 'Valor' }, min: 0, max: 1 } }, maintainAspectRatio: false } }
        };
        charts[chartId] = new Chart(canvas.getContext('2d'), config[chartId]);
        if (chartId === 'simulationChart') updateSimulationChart();
        if (chartId === 'patternChart') updatePatternChart();
        if (chartId === 'excelChart') updateExcelChart();
        if (chartId === 'summaryChart') charts.summaryChart.update();
    }

    function generateExponentialData(lambda, size = 100) {
        return Array(size).fill().map(() => -Math.log(Math.random()) / lambda);
    }

    function updateSimulationChart() {
        const lambda = parseFloat(document.getElementById('simulationSlider').value);
        document.getElementById('simulationLambda').textContent = lambda.toFixed(1);
        const data = generateExponentialData(lambda, 100).map(x => ({ x: x, y: Math.random() * 0.1 })).slice(0, 20);
        document.getElementById('simTime1').textContent = data[0].x.toFixed(1);
        document.getElementById('simFreq1').textContent = data[0].y.toFixed(1);
        document.getElementById('simTime2').textContent = data[1].x.toFixed(1);
        document.getElementById('simFreq2').textContent = data[1].y.toFixed(1);
        if (charts.simulationChart) {
            charts.simulationChart.data.datasets[0].data = data;
            charts.simulationChart.update();
        }
    }

    function updatePatternChart() {
        const lambda = parseFloat(document.getElementById('patternSlider').value);
        if (charts.patternChart) {
            charts.patternChart.data.datasets.forEach(dataset => dataset.hidden = true);
            const dataset = charts.patternChart.data.datasets.find(d => parseFloat(d.label.split('=')[1]) === lambda);
            if (dataset) dataset.hidden = false;
            charts.patternChart.update();
        }
    }

    function updateExcelChart() {
        const lambda = parseFloat(document.getElementById('excelSlider').value);
        document.getElementById('excelLambda').textContent = lambda.toFixed(1);
        const data = generateExponentialData(lambda, 1000);
        const bins = Array(10).fill().map((_, i) => i * Math.max(...data) / 10);
        const frequencies = new Array(10).fill(0);
        data.forEach(d => { for (let i = 0; i < bins.length - 1; i++) if (d >= bins[i] && d < bins[i + 1]) frequencies[i]++; });
        document.getElementById('excelTime1').textContent = bins[0].toFixed(1);
        document.getElementById('excelFreq1').textContent = frequencies[0].toFixed(1);
        document.getElementById('excelTime2').textContent = bins[1].toFixed(1);
        document.getElementById('excelFreq2').textContent = frequencies[1].toFixed(1);
        if (charts.excelChart) {
            charts.excelChart.data.labels = bins.slice(0, -1).map(x => x.toFixed(1));
            charts.excelChart.data.datasets[0].data = frequencies.slice(0, 20);
            charts.excelChart.update();
        }
    }

    window.regenerateSimulation = function() { updateSimulationChart(); };
    window.regeneratePattern = function() { updatePatternChart(); };
    window.regenerateExcel = function() { updateExcelChart(); };

    document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => {
        if (e.target.className === 'close') closeModal(m.id);
    }));

    initializeChart('motivationChart');
    initializeChart('simulationChart');
    initializeChart('patternChart');
    initializeChart('excelChart');
    initializeChart('summaryChart');

    document.getElementById('simulationSlider').addEventListener('input', updateSimulationChart);
    document.getElementById('patternSlider').addEventListener('change', updatePatternChart);
    document.getElementById('excelSlider').addEventListener('input', updateExcelChart);
});