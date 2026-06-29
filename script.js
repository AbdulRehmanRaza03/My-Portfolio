// ============================================================
//  Abdul Rehman Raza — Portfolio Script
// ============================================================

/* ── Loader ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 600);
  }, 1400);
});

/* ── Custom Cursor ── */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px,${mouseY}px)`;
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px,${ringY}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a,button,.project-card,.skill-tag,.social-link').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

/* ── Navbar scroll behaviour ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile menu ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight);
  });
});

/* ── Typed hero subtitle ── */
const typed     = document.getElementById('typed-text');
const roles     = ['Data Scientist', 'Full-Stack Developer', 'ML Engineer', 'Digital Strategist'];
let ri = 0, ci = 0, deleting = false;
function typeLoop() {
  const word = roles[ri];
  typed.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length)      { deleting = true; setTimeout(typeLoop, 1400); return; }
  if (deleting  && ci < 0)               { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
setTimeout(typeLoop, 1800);

/* ── Scroll-reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

/* ── Skill bar animation ── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => {
        b.style.width = b.dataset.width;
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-bars').forEach(el => barObs.observe(el));

/* ── Hero image: subtle tilt on hover, always eases back — no auto-spin ── */
const heroImgWrap = document.querySelector('.hero-image-wrap');
if (heroImgWrap) {
  heroImgWrap.addEventListener('mousemove', e => {
    const r = heroImgWrap.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
    heroImgWrap.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });
  heroImgWrap.addEventListener('mouseleave', () => {
    heroImgWrap.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
  // Touch: brief tilt on tap, then ease back — never spins, never stays off-center
  heroImgWrap.addEventListener('touchstart', () => {
    heroImgWrap.style.transform = 'rotateX(-4deg) rotateY(6deg)';
  });
  heroImgWrap.addEventListener('touchend', () => {
    heroImgWrap.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

/* ── Project filter tabs ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const allProjectCards = document.querySelectorAll('.project-card[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    allProjectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

/* ── Tilt effect on project cards ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Counter animation ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  let current = 0;
  const step = target / 60;
  const t = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(t);
  }, 20);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Back to top ── */
const btt = document.getElementById('back-top');
window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 500));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Particle canvas background ── */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.4,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.5 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99,179,237,${p.alpha})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  // Draw connecting lines
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(99,179,237,${0.08 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── Contact form — real send via FormSubmit.co (no backend needed) ── */
const form = document.getElementById('contact-form');
if (form) {
  const statusEl = document.getElementById('form-status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalLabel = btn.innerHTML;
    btn.innerHTML = 'Sending…';
    btn.disabled = true;
    if (statusEl) { statusEl.className = 'form-status'; statusEl.textContent = ''; }

    try {
      const res = await fetch('https://formsubmit.co/ajax/abdulrehmanraza60@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      const data = await res.json();

      if (res.ok && (data.success === 'true' || data.success === true)) {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#48bb78,#38a169)';
        form.reset();
        if (statusEl) {
          statusEl.className = 'form-status show ok';
          statusEl.textContent = 'Thanks — your message is on its way. I\'ll reply by email soon.';
        }
      } else {
        throw new Error('FormSubmit did not confirm delivery');
      }
    } catch (err) {
      btn.innerHTML = 'Try Again';
      if (statusEl) {
        statusEl.className = 'form-status show err';
        statusEl.textContent = 'Couldn\'t send right now — please email me directly at abdulrehmanraza60@gmail.com.';
      }
    } finally {
      setTimeout(() => {
        btn.innerHTML = originalLabel;
        btn.disabled = false;
        btn.style.background = '';
      }, 3500);
    }
  });
}
