/* -----------------
   MENU RESPONSIVO
--------------------*/
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

/* -----------------
      CARROSSEL (somente se existir)
--------------------*/
const carousel = document.getElementById("carousel");
const slides = carousel ? carousel.querySelectorAll(".slide") : [];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsWrap = document.getElementById("carouselIndicators");

let index = 0;
let interval;

/* Criar indicadores */
if (indicatorsWrap && slides.length > 0) {
  slides.forEach((_, idx) => {
    const btn = document.createElement("button");
    if (idx === 0) btn.classList.add("active");
    btn.addEventListener("click", () => goTo(idx));
    indicatorsWrap.appendChild(btn);
  });
}

function showSlide(i) {
  if (!slides.length) return;

  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === i);
  });

  if (indicatorsWrap) {
    [...indicatorsWrap.children].forEach((btn, idx) => {
      btn.classList.toggle("active", idx === i);
    });
  }
}

function next() {
  if (!slides.length) return;
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prev() {
  if (!slides.length) return;
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

function goTo(i) {
  index = i;
  showSlide(i);
}

/* Botões do carrossel */
if (nextBtn && slides.length) {
  nextBtn.addEventListener("click", () => { next(); restartInterval(); });
}
if (prevBtn && slides.length) {
  prevBtn.addEventListener("click", () => { prev(); restartInterval(); });
}

/* Auto-play */
function startInterval() {
  if (slides.length > 0) interval = setInterval(next, 4000);
}

function restartInterval() {
  clearInterval(interval);
  startInterval();
}

startInterval();

/* -----------------
   FORMULÁRIOS (nenhum alerta feio aqui!)
--------------------*/
/* REMOVIDO o código que gerava o alert() */
