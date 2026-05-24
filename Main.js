/* ── NAV: ocultar al bajar, mostrar al subir ───────────────── */
(function () {
  const nav = document.querySelector('nav');
  let lastY = 0;
  let ticking = false;

  function updateNav() {
    const y = window.scrollY;

    // Agregar clase "scrolled" cuando no está en el tope
    if (y > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Ocultar al bajar, mostrar al subir
    // No ocultar si el menú mobile está abierto
    if (!nav.classList.contains('open')) {
      if (y > lastY && y > 80) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  /* ── HAMBURGER (mobile) ──────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
      // Al abrir el menú, siempre mostrar el nav
      if (nav.classList.contains('open')) {
        nav.classList.remove('hidden');
      }
    });
  }

  // Cerrar menú mobile al hacer click en un link
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
})();

/* ── FAQ ACCORDION ────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = this.closest('.faq-item');
    var isOpen = item.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.faq-item').forEach(function (el) {
      el.classList.remove('open');
    });

    // Abrir el clickeado si estaba cerrado
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

/* ── MODAL ────────────────────────────────────────────────── */
var overlay = document.getElementById('modalOverlay');

function openModal(plan, price) {
  var planName = document.getElementById('modalPlanName');
  if (planName) planName.textContent = 'Plan ' + plan + ' — ' + price;
  var form = document.getElementById('modalForm');
  var success = document.getElementById('successMsg');
  if (form) form.style.display = '';
  if (success) success.style.display = 'none';
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Cerrar al hacer click fuera del modal
if (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
}

// Cerrar con Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

function submitForm() {
  var nombre = document.getElementById('inputNombre');
  var email = document.getElementById('inputEmail');
  var tel = document.getElementById('inputTel');
  var objetivo = document.getElementById('inputObjetivo');

  // Validación básica
  if (!nombre || !nombre.value.trim()) { nombre.focus(); return; }
  if (!email || !email.value.trim()) { email.focus(); return; }
  if (!tel || !tel.value.trim()) { tel.focus(); return; }
  if (!objetivo || !objetivo.value) { objetivo.focus(); return; }

  // Mostrar mensaje de éxito
  var form = document.getElementById('modalForm');
  var success = document.getElementById('successMsg');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';

  // Limpiar campos
  if (nombre) nombre.value = '';
  if (email) email.value = '';
  if (tel) tel.value = '';
  if (objetivo) objetivo.value = '';
}

/* ── SMOOTH SCROLL para anclas ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var navH = document.querySelector('nav').offsetHeight || 72;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});