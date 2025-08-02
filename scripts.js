document.addEventListener('DOMContentLoaded', () => {
    Reveal.initialize({ transition: 'cube', hash: true });

    let charts = {};

    Reveal.on('ready', (event) => {
        window.showModal = function(modalId) { 
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
            const modal = document.getElementById(modalId); 
            if (modal) { 
                setTimeout(() => initializeChart(modalId.replace('Modal', '')), 100);
            } 
        };
        window.closeModal = function(modalId) { 
            const modal = document.getElementById(modalId); 
            if (modal) {
                modal.style.display = 'none'; 
                document.body.style.overflow = ''; // Restaura scroll
            }
        };

        function initializeChart(chartId) {
            if (charts[chartId]) {
                charts[chartId].destroy();
            }
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.error(`Canvas ${chartId} not found`);
                return;
            }
            const container = canvas.parentElement;
            if (!container) {
                console.error(`No container for ${chartId}`);
                return;
            }
            canvas.style.display = 'block';
            canvas.style.opacity = '1';
            canvas.width = Math.max(container.offsetWidth, 400);
            canvas.height = Math.max(container.offsetWidth * 9 / 16, 200);
            const ctx = canvas.getContext('2d');
            const config = {
                motivationChart: { 
                    type: 'line', 
                    data: { 
                        labels: [0, 2, 4, 6, 8], 
                        datasets: [{ label: 'Curva Exponencial', data: [1, 0.607, 0.368, 0.223, 0.135], borderColor: '#00eaff', fill: false, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 }] 
                    }, 
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 16/9,
                        scales: { 
                            x: { title: { display: true, text: 'Tiempo', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, maxTicksLimit: 10 }, grid: { color: 'rgba(224, 224, 224, 0.1)' } }, 
                            y: { title: { display: true, text: 'Probabilidad', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, callback: value => `${value}` }, min: 0, max: 1, grid: { color: 'rgba(224, 224, 224, 0.1)' } } 
                        }, 
                        plugins: { legend: { labels: { color: '#e0e0e0', font: { size: 12 } }, position: 'top' }, tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.8)', titleColor: '#fff', bodyColor: '#fff' } }
                    } 
                },
                simulationChart: { 
                    type: 'scatter', 
                    data: { 
                        datasets: [{ label: 'Tiempos', data: generateExponentialData(0.5).map(x => ({ x: x, y: 0.5 * Math.exp(-0.5 * x) })).slice(0, 20), backgroundColor: '#00eaff', pointRadius: 4, pointHoverRadius: 6 }] 
                    }, 
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 16/9,
                        scales: { 
                            x: { title: { display: true, text: 'Tiempo', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, maxTicksLimit: 10 }, grid: { color: 'rgba(224, 224, 224, 0.1)' } }, 
                            y: { title: { display: true, text: 'Densidad', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 } }, grid: { color: 'rgba(224, 224, 224, 0.1)' } } 
                        }, 
                        plugins: { legend: { labels: { color: '#e0e0e0', font: { size: 12 } }, position: 'top' }, tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.8)', titleColor: '#fff', bodyColor: '#fff' } }
                    } 
                },
                patternChart: { 
                    type: 'line', 
                    data: { 
                        labels: [0, 2, 4, 6, 8], 
                        datasets: [
                            { label: 'Tasa = 0.1', data: [1, 0.904, 0.818, 0.740, 0.670], borderColor: '#00eaff', fill: false, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
                            { label: 'Tasa = 0.3', data: [1, 0.740, 0.548, 0.406, 0.301], borderColor: '#ff00ff', fill: false, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
                            { label: 'Tasa = 0.8', data: [1, 0.449, 0.202, 0.091, 0.041], borderColor: '#ffd700', fill: false, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 },
                            { label: 'Tasa = 1', data: [1, 0.368, 0.135, 0.050, 0.018], borderColor: '#00ff9f', fill: false, tension: 0.4, pointRadius: 4, pointHoverRadius: 6 }
                        ] 
                    }, 
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 16/9,
                        scales: { 
                            x: { title: { display: true, text: 'Tiempo', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, maxTicksLimit: 10 }, grid: { color: 'rgba(224, 224, 224, 0.1)' } }, 
                            y: { title: { display: true, text: 'Probabilidad', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, callback: value => `${value}` }, min: 0, max: 1, grid: { color: 'rgba(224, 224, 224, 0.1)' } } 
                        }, 
                        plugins: { legend: { labels: { color: '#e0e0e0', font: { size: 12 } }, position: 'top' }, tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.8)', titleColor: '#fff', bodyColor: '#fff' } }
                    } 
                },
                excelChart: { 
                    type: 'bar', 
                    data: { 
                        labels: [], 
                        datasets: [{ label: 'Frecuencia', data: [], backgroundColor: '#00eaff', borderRadius: 3, borderColor: '#00eaff', borderWidth: 1, barThickness: 20 }] 
                    }, 
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 16/9,
                        scales: { 
                            x: { title: { display: true, text: 'Tiempo', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, maxTicksLimit: 10 }, grid: { color: 'rgba(224, 224, 224, 0.1)' } }, 
                            y: { title: { display: true, text: 'Frecuencia', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, beginAtZero: true }, grid: { color: 'rgba(224, 224, 224, 0.1)' } } 
                        }, 
                        plugins: { legend: { labels: { color: '#e0e0e0', font: { size: 12 } }, position: 'top' }, tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.8)', titleColor: '#fff', bodyColor: '#fff' } }
                    } 
                },
                summaryChart: { 
                    type: 'bar', 
                    data: { 
                        labels: ['Sin Memoria', 'Riesgo Constante', 'Poisson'], 
                        datasets: [{ label: 'Impacto', data: [0.8, 0.7, 0.9], backgroundColor: '#00eaff', borderRadius: 3, borderColor: '#00eaff', borderWidth: 1, barThickness: 20 }] 
                    }, 
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 16/9,
                        scales: { 
                            x: { title: { display: true, text: 'Propiedades', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 } }, grid: { color: 'rgba(224, 224, 224, 0.1)' } }, 
                            y: { title: { display: true, text: 'Valor', color: '#e0e0e0', font: { size: 14 } }, ticks: { color: '#e0e0e0', font: { size: 12 }, min: 0, max: 1 }, grid: { color: 'rgba(224, 224, 224, 0.1)' } } 
                        }, 
                        plugins: { legend: { labels: { color: '#e0e0e0', font: { size: 12 } }, position: 'top' }, tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.8)', titleColor: '#fff', bodyColor: '#fff' } }
                    } 
                }
            };
            charts[chartId] = new Chart(ctx, config[chartId]);
            charts[chartId].resize();
            console.log(`Chart ${chartId} initialized with size ${canvas.width}x${canvas.height}`);
            if (chartId === 'simulationChart') updateSimulationChart();
            if (chartId === 'patternChart') updatePatternChart();
            if (chartId === 'excelChart') updateExcelChart();
            if (chartId === 'summaryChart') charts.summaryChart.update();
        }

        function generateExponentialData(lambda, size = 100) {
            return Array(size).fill().map(() => -Math.log(Math.random()) / lambda);
        }

        window.updateMotivationChart = function() {
            const lambda = parseFloat(document.getElementById('motivationSlider')?.value) || 0.5;
            document.getElementById('motivationLambda').textContent = lambda.toFixed(1);
            const labels = [0, 2, 4, 6, 8];
            const data = labels.map(x => Math.exp(-lambda * x));
            if (charts.motivationChart) {
                charts.motivationChart.data.labels = labels;
                charts.motivationChart.data.datasets[0].data = data;
                charts.motivationChart.update();
            }
        };

        window.updateSimulationChart = function() {
            const lambda = parseFloat(document.getElementById('simulationSlider')?.value) || 0.5;
            document.getElementById('simulationLambda').textContent = lambda.toFixed(1);
            const data = generateExponentialData(lambda, 100).map(x => ({ x: x, y: lambda * Math.exp(-lambda * x) })).slice(0, 20);
            document.getElementById('simTime1').textContent = data[0]?.x.toFixed(1) || 0;
            document.getElementById('simFreq1').textContent = data[0]?.y.toFixed(3) || 0;
            document.getElementById('simTime2').textContent = data[1]?.x.toFixed(1) || 0;
            document.getElementById('simFreq2').textContent = data[1]?.y.toFixed(3) || 0;
            if (charts.simulationChart) {
                charts.simulationChart.data.datasets[0].data = data;
                charts.simulationChart.update();
            }
        };

        window.updatePatternChart = function() {
            const lambda = parseFloat(document.getElementById('patternSlider')?.value) || 0.1;
            if (charts.patternChart) {
                charts.patternChart.data.datasets.forEach(dataset => dataset.hidden = true);
                const dataset = charts.patternChart.data.datasets.find(d => parseFloat(d.label.split('=')[1]) === lambda);
                if (dataset) dataset.hidden = false;
                charts.patternChart.update();
            }
        };

        window.updateExcelChart = function() {
            const lambda = parseFloat(document.getElementById('excelSlider')?.value) || 0.5;
            document.getElementById('excelLambda').textContent = lambda.toFixed(1);
            const data = generateExponentialData(lambda, 100);
            const max = Math.max(...data, 1);
            const bins = Array(10).fill().map((_, i) => i * max / 10);
            const frequencies = new Array(10).fill(0);
            data.forEach(d => { 
                for (let i = 0; i < bins.length - 1; i++) 
                    if (d >= bins[i] && d < bins[i + 1]) frequencies[i]++; 
            });
            document.getElementById('excelTime1').textContent = bins[0].toFixed(1);
            document.getElementById('excelFreq1').textContent = frequencies[0];
            document.getElementById('excelTime2').textContent = bins[1].toFixed(1);
            document.getElementById('excelFreq2').textContent = frequencies[1];
            if (charts.excelChart) {
                charts.excelChart.data.labels = bins.slice(0, -1).map(x => x.toFixed(1));
                charts.excelChart.data.datasets[0].data = frequencies.slice(0, -1);
                charts.excelChart.update();
            }
        };

        window.regenerateSimulation = function() { updateSimulationChart(); };
        window.regeneratePattern = function() { updatePatternChart(); };
        window.regenerateExcel = function() { updateExcelChart(); };

        document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => {
            if (e.target.className === 'close') closeModal(m.id);
        }));

        document.getElementById('motivationSlider')?.addEventListener('input', updateMotivationChart);
        document.getElementById('simulationSlider')?.addEventListener('input', updateSimulationChart);
        document.getElementById('excelSlider')?.addEventListener('input', updateExcelChart);

        ['motivationChart', 'simulationChart', 'patternChart', 'excelChart', 'summaryChart'].forEach(chartId => {
            initializeChart(chartId);
        });

        updateMotivationChart();
        updateSimulationChart();
        updatePatternChart();
        updateExcelChart();
    });

    window.addEventListener('resize', () => {
        for (let chartId in charts) {
            if (charts[chartId]) {
                const canvas = document.getElementById(chartId);
                if (canvas) {
                    const container = canvas.parentElement;
                    canvas.width = Math.max(container.offsetWidth, 400);
                    canvas.height = Math.max(container.offsetWidth * 9 / 16, 200);
                    charts[chartId].resize();
                }
            }
        }
    });
});

function renderAllKatex() {
    document.querySelectorAll('.katex-formula').forEach(el => {
        if (el.dataset.formula) {
            katex.render(el.dataset.formula, el, { throwOnError: false, displayMode: true });
        }
    });
}
document.addEventListener('DOMContentLoaded', renderAllKatex);
if (window.Reveal) Reveal.on('slidechanged', renderAllKatex);

// Ejemplo para Chart.js
const chartOptions = {
  plugins: {
    legend: {
      labels: { font: { size: 16 }, color: '#00e6ff' }
    }
  },
  scales: {
    x: {
      ticks: { font: { size: 16 }, color: '#fff' },
      title: { display: true, text: 'Tiempo', font: { size: 18 }, color: '#00e6ff' }
    },
    y: {
      ticks: { font: { size: 16 }, color: '#fff' },
      title: { display: true, text: 'Densidad', font: { size: 18 }, color: '#00e6ff' }
    }
  }
};
// Usa chartOptions en todos tus gráficos Chart.js