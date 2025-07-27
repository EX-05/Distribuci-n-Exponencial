document.addEventListener('DOMContentLoaded', () => {
    // Animación para títulos
    const titles = document.querySelectorAll('.reveal h1, .reveal h2');
    titles.forEach(title => {
        title.addEventListener('click', () => {
            title.classList.add('animate__animated', 'animate__rubberBand');
            setTimeout(() => title.classList.remove('animate__animated', 'animate__rubberBand'), 1200);
        });
    });

    // Animación para íconos
    const icons = document.querySelectorAll('.fas');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.classList.add('animate__animated', 'animate__tada');
            setTimeout(() => icon.classList.remove('animate__animated', 'animate__tada'), 1200);
        });
    });

    // Animación para slider
    const slider = document.getElementById('lambdaSlider');
    if (slider) {
        slider.addEventListener('input', () => {
            slider.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => slider.classList.remove('animate__animated', 'animate__pulse'), 600);
        });
    }
});