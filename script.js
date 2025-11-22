// script.js - carrossel, menu mobile e melhorias
document.addEventListener('DOMContentLoaded', () => {
    // Carousel logic
    const slides = Array.from(document.querySelectorAll('.slide'));
    const indicatorsWrap = document.getElementById('carouselIndicators');
    let current = 0;
    const total = slides.length;
    let intervalId = null;
    const INTERVAL = 5000;

    // build indicators
    slides.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.className = idx === 0 ? 'active' : '';
        btn.addEventListener('click', () => goTo(idx));
        indicatorsWrap.appendChild(btn);
    });

    const indicators = Array.from(indicatorsWrap.children);

    function update() {
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        indicators.forEach((b, i) => b.classList.toggle('active', i === current));
    }

    function next() {
        current = (current + 1) % total;
        update();
    }
    function prev() {
        current = (current - 1 + total) % total;
        update();
    }
    function goTo(i) {
        current = i;
        update();
        restartInterval();
    }
    function restartInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(next, INTERVAL);
    }

    // attach buttons
    document.getElementById('nextBtn').addEventListener('click', () => { next(); restartInterval(); });
    document.getElementById('prevBtn').addEventListener('click', () => { prev(); restartInterval(); });

    // auto start
    intervalId = setInterval(next, INTERVAL);

    // header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });

    // mobile menu toggle (simple)
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const nav = document.querySelector('.navbar');
            if (!nav) return;
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.background = 'linear-gradient(180deg, rgba(123,31,162,0.98), rgba(94,14,132,0.95))';
            nav.style.position = 'absolute';
            nav.style.right = '12px';
            nav.style.top = '64px';
            nav.style.padding = '12px';
            nav.style.borderRadius = '10px';
            nav.style.zIndex = '80';
        });
    }

    // accessibility: keyboard controls for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); restartInterval(); }
        if (e.key === 'ArrowLeft') { prev(); restartInterval(); }
    });

    // safety: if no slides or broken paths, hide controls gracefully
    if (total <= 1) {
        document.querySelectorAll('.carousel-btn').forEach(btn => btn.style.display = 'none');
        indicatorsWrap.style.display = 'none';
        clearInterval(intervalId);
    }
});
