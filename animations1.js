function animateSlide() {
    const slides = document.querySelectorAll('.reveal .slides section');
    slides.forEach(slide => {
        slide.style.opacity = 0;
        slide.style.transition = 'opacity 0.5s';
    });
    setTimeout(() => {
        slides.forEach(slide => slide.style.opacity = 1);
    }, 100);
}

document.addEventListener('slidechanged', animateSlide);