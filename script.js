// ----- Carrossel -----
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentSlide));
}

// ----- Cabeçalho fixo com efeito -----
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});
