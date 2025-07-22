document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: ['#00f2ff', '#ff00ff', '#00ff9f'] },
            shape: { type: 'circle' },
            opacity: { value: 0.8, random: true },
            size: { value: 5, random: true },
            move: { enable: true, speed: 5, direction: 'none', random: true }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'repulse' } }
        }
    });

    // Inicializar Reveal.js
    Reveal.initialize({
        hash: true,
        transition: 'cube',
        keyboard: {
            69: () => { Reveal.slide(25); playEasterSound(); }
        }
    });

    // Renderizar fórmulas KaTeX
    document.querySelectorAll('.katex-animate').forEach(element => {
        katex.render(element.getAttribute('data-katex'), element, { displayMode: true });
    });

    // Gráfico 1 (λ = 1)
    const ctx1 = document.getElementById('expChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => (i / 10).toFixed(1)),
            datasets: [{
                label: 'PDF (λ = 1)',
                data: Array.from({ length: 50 }, (_, i) => Math.exp(-1 * (i / 10))),
                borderColor: '#00f2ff',
                backgroundColor: 'rgba(0, 242, 255, 0.4)',
                fill: true,
                tension: 0.5,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 2000, easing: 'easeOutBounce' },
            scales: {
                x: { title: { display: true, text: 'Tiempo (x)', color: '#e0e0e0' } },
                y: { title: { display: true, text: 'f(x)', color: '#e0e0e0' } }
            }
        }
    });

    // Gráfico 2 (λ = 0.5 y λ = 2)
    const ctx2 = document.getElementById('expChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => (i / 10).toFixed(1)),
            datasets: [
                {
                    label: 'PDF (λ = 0.5)',
                    data: Array.from({ length: 50 }, (_, i) => 0.5 * Math.exp(-0.5 * (i / 10))),
                    borderColor: '#00f2ff',
                    backgroundColor: 'rgba(0, 242, 255, 0.4)',
                    fill: true,
                    tension: 0.5,
                    borderWidth: 3
                },
                {
                    label: 'PDF (λ = 2)',
                    data: Array.from({ length: 50 }, (_, i) => 2 * Math.exp(-2 * (i / 10))),
                    borderColor: '#ff00ff',
                    backgroundColor: 'rgba(255, 0, 255, 0.4)',
                    fill: true,
                    tension: 0.5,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            animation: { duration: 2000, easing: 'easeOutBounce' },
            scales: {
                x: { title: { display: true, text: 'Tiempo (x)', color: '#e0e0e0' } },
                y: { title: { display: true, text: 'f(x)', color: '#e0e0e0' } }
            }
        }
    });

    // Gráfico 3 (λ = 1.5)
    const ctx3 = document.getElementById('expChart3').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => (i / 10).toFixed(1)),
            datasets: [{
                label: 'PDF (λ = 1.5)',
                data: Array.from({ length: 50 }, (_, i) => 1.5 * Math.exp(-1.5 * (i / 10))),
                borderColor: '#00ff9f',
                backgroundColor: 'rgba(0, 255, 159, 0.4)',
                fill: true,
                tension: 0.5,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 2000, easing: 'easeOutBounce' },
            scales: {
                x: { title: { display: true, text: 'Tiempo (x)', color: '#e0e0e0' } },
                y: { title: { display: true, text: 'f(x)', color: '#e0e0e0' } }
            }
        }
    });

    // Gráfico Interactivo (Diapositiva 18)
    let dynamicChart;
    const ctxDynamic = document.getElementById('dynamicChart').getContext('2d');
    function updateChart() {
        const lambda = parseFloat(document.getElementById('lambdaSlider').value);
        dynamicChart.data.datasets[0].data = Array.from({ length: 50 }, (_, i) => lambda * Math.exp(-lambda * (i / 10)));
        dynamicChart.data.datasets[0].label = `PDF (λ = ${lambda})`;
        dynamicChart.update();
        const explanation = document.getElementById('lambdaExplanation');
        explanation.textContent = `λ = ${lambda}: Media = ${1/lambda.toFixed(2)} min. ${lambda < 1 ? 'Eventos lentos, curva suave.' : 'Eventos rápidos, decaimiento fuerte!'}`;
        explanation.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => explanation.classList.remove('animate__animated', 'animate__fadeIn'), 600);
    }
    dynamicChart = new Chart(ctxDynamic, {
        type: 'line',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => (i / 10).toFixed(1)),
            datasets: [{
                label: 'PDF (λ = 1)',
                data: Array.from({ length: 50 }, (_, i) => Math.exp(-1 * (i / 10))),
                borderColor: '#ff4d4d',
                backgroundColor: 'rgba(255, 77, 77, 0.4)',
                fill: true,
                tension: 0.5,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 2000, easing: 'easeOutBounce' },
            scales: {
                x: { title: { display: true, text: 'Tiempo (x)', color: '#e0e0e0' } },
                y: { title: { display: true, text: 'f(x)', color: '#e0e0e0' } }
            }
        }
    });
    window.updateChart = updateChart;

    // Gráfico del Mini-Juego (Diapositiva 19)
    const ctxGame = document.getElementById('gameChart').getContext('2d');
    new Chart(ctxGame, {
        type: 'line',
        data: {
            labels: Array.from({ length: 50 }, (_, i) => (i / 10).toFixed(1)),
            datasets: [{
                label: 'PDF (Adivina λ)',
                data: Array.from({ length: 50 }, (_, i) => 1.5 * Math.exp(-1.5 * (i / 10))),
                borderColor: '#ff00ff',
                backgroundColor: 'rgba(255, 0, 255, 0.4)',
                fill: true,
                tension: 0.5,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 2000, easing: 'easeOutBounce' },
            scales: {
                x: { title: { display: true, text: 'Tiempo (x)', color: '#e0e0e0' } },
                y: { title: { display: true, text: 'f(x)', color: '#e0e0e0' } }
            }
        }
    });

    // Mini-juego
    window.showAnswer = function() {
        const answer = document.querySelector('.answer');
        answer.style.display = 'block';
        answer.classList.add('animate__animated', 'animate__pulse');
        launchConfetti();
        playSuccessSound();
    };

    // Lanzar confeti
    window.launchConfetti = function() {
        confetti({
            particleCount: 250,
            spread: 100,
            colors: ['#00f2ff', '#ff00ff', '#00ff9f'],
            shapes: ['circle', 'square']
        });
    };
});