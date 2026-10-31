/* ПРЕЛОАДЕР */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hide");
  }, 1900);
});

/* КУРСОР */
const cursor = document.getElementById("cursor");
let cx = 0, cy = 0, tx = 0, ty = 0;

document.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
document.querySelectorAll("a, .card, .btn, .burger").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
});

function animateCursor(){
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;
  cursor.style.left = cx + "px";
  cursor.style.top  = cy + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ПРОГРЕСС + ШАПКА */
const progress = document.getElementById("progress");
const header = document.getElementById("header");

function onScroll(){
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progress.style.width = scrolled * 100 + "%";
  header.classList.toggle("scrolled", h.scrollTop > 40);
}
window.addEventListener("scroll", onScroll, { passive:true });

/* МОБИЛЬНОЕ МЕНЮ */
const burger = document.getElementById("burger");
const navList = document.getElementById("navList");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navList.classList.toggle("open");
});
navList.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    navList.classList.remove("open");
  })
);

/* REVEAL */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add("active");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold:0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* СЧЁТЧИКИ */
const statsEl = document.getElementById("stats");
let counted = false;

function runCounters(){
  if (counted) return;
  counted = true;
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = +el.dataset.count;
    const duration = 1600;
    const start = performance.now();
    function step(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("ru-RU");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting){ runCounters(); obs.disconnect(); }
}, { threshold:0.4 }).observe(statsEl);

/* ПАРАЛЛАКС */
const layer = document.getElementById("parallaxLayer");
const parallaxSection = document.querySelector(".parallax");

window.addEventListener("scroll", () => {
  const rect = parallaxSection.getBoundingClientRect();
  const offset = rect.top * 0.25;
  layer.style.transform = `translateY(${offset}px)`;
}, { passive:true });

/* ТИЛТ КАРТОЧЕК */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(700px) rotateY(0) rotateX(0)";
  });
});

/* ФОРМА */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const btn = e.target.querySelector(".btn");
  btn.textContent = "Заявка отправлена ✓";
  btn.style.borderColor = "#4caf50";
  btn.style.color = "#4caf50";
  setTimeout(() => {
    btn.textContent = "Отправить заявку";
    btn.style.borderColor = "";
    btn.style.color = "";
    e.target.reset();
  }, 2500);
});

/* МАРКИ — дублирование для бесшовности */
const track = document.getElementById("marquee");
track.innerHTML += track.innerHTML;