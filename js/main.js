/* ============================================================
   BioAurora — Interactividad principal
   - Header con sombra al hacer scroll
   - Pestaña activa según la página actual
   - Menú móvil accesible
   - Animaciones de aparición al hacer scroll
   - Lightbox para la galería (solo en galeria.html)
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Referencias del DOM ---------- */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-menu');
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const revealItems = document.querySelectorAll('[data-reveal]');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
  const hasLightbox = Boolean(lightbox && lightboxImg && lightboxCaption && lightboxClose);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopQuery = window.matchMedia('(min-width: 861px)');

  let lastFocusedElement = null;
  let closeTimer = null;

  /* ---------- Header ---------- */
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------- Pestaña activa según la página ---------- */
  const currentPage = (() => {
    const file = window.location.pathname.split('/').pop();
    return (file || 'index.html').toLowerCase();
  })();

  navLinks.forEach((link) => {
    const target = (link.getAttribute('href') || '').split('#')[0].toLowerCase();

    if (!target) {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
      return;
    }

    const isActive = target === currentPage;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  /* ---------- Menú móvil ---------- */
  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    nav.classList.add('is-open');
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    if (navToggle.getAttribute('aria-expanded') !== 'true') return;

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    nav.classList.remove('is-open');

    if (returnFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener('click', (event) => {
    if (navToggle.getAttribute('aria-expanded') !== 'true') return;
    const clickedOutside = !nav.contains(event.target) && !navToggle.contains(event.target);
    if (clickedOutside) {
      closeMenu();
    }
  });

  // Cerrar el menú automáticamente al pasar a escritorio
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });

  /* ---------- Lightbox ---------- */
  let closeLightbox = () => {};

  if (hasLightbox) {
    const finishCloseLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.removeAttribute('src');
      document.body.classList.remove('no-scroll');

      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    };

    const openLightbox = (button) => {
      const img = button.querySelector('img');
      if (!img) return;

      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      lastFocusedElement = document.activeElement;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = button.dataset.caption || '';

      lightbox.hidden = false;
      document.body.classList.add('no-scroll');

      // Permitir que el navegador aplique el estado oculto antes de animar
      requestAnimationFrame(() => {
        lightbox.classList.add('is-open');
      });

      lightboxClose.focus();
    };

    const closeLightboxImpl = () => {
      if (lightbox.hidden) return;

      lightbox.classList.remove('is-open');

      if (prefersReducedMotion.matches) {
        finishCloseLightbox();
      } else {
        closeTimer = window.setTimeout(finishCloseLightbox, 250);
      }
    };

    closeLightbox = closeLightboxImpl;

    galleryItems.forEach((button) => {
      button.addEventListener('click', () => openLightbox(button));
    });

    lightboxClose.addEventListener('click', closeLightboxImpl);

    // Cerrar al hacer clic en el fondo oscuro
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightboxImpl();
      }
    });

    // Mantener el foco dentro del diálogo (solo hay un control enfocable)
    lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        lightboxClose.focus();
      }
    });
  }

  // Cerrar con Escape: primero el lightbox, luego el menú móvil
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (hasLightbox && !lightbox.hidden) {
      closeLightbox();
    } else {
      closeMenu({ returnFocus: true });
    }
  });

  /* ---------- Animaciones de aparición ---------- */
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* ---------- Año actual en el footer ---------- */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
})();
