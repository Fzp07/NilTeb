# Tecnologías Utilizadas en Nilteb

## Resumen General
El proyecto **Nilteb** está construido con tecnologías web fundamentales, sin dependencias de frameworks externos ni librerías de terceros. Esto garantiza ligereza, facilidad de mantenimiento y compatibilidad universal.

## Capa de Estructura (HTML)

### `index.html`, `nosotros.html`, `servicios.html`, `galeria.html`
- **HTML5**: Versión moderna con elementos semánticos
- Estructura de página con:
  - `<header>`: Encabezado con navegación y logo
  - `<main>`: Contenido principal
  - `<section>`: Secciones temáticas
  - `<footer>`: Pie de página con información de contacto
  - `<nav>`: Menú de navegación principal
  - `<article>`: Contenido independiente (en servicios.html)
  - `<figure>` y `<figcaption>`: Para elementos multimedia (galeria.html)

## Capa de Presentación (CSS)

### `css/styles.css`
- **CSS3** con variables personalizadas en `:root`
- **Mobile-first** approach (diseño que comienza por móviles)
- Características destacadas:

  - **Variables CSS** (`--color-*, --font-*, --radius-*, --shadow-*, --section-space-, --transition-`):
    - Colores: `--color-bg: #f7fbfa`, `--color-text: #1c2b29`, `--color-accent: #0f766e`
    - Tipografía: `--font-sans`, `--font-serif`
    - Medidas: `--header-height`, `--radius-sm`, `--radius-md`, `--radius-lg`
    - Espaciado: `--section-space`, `--container`
    - Transiciones: `--transition` (0.25s ease por defecto)

  - **Sistemas de layout**:
    - Flexbox: Para navegación, botones, tarjetas, footer
    - CSS Grid: Para hero section, about section, servicios grid, galería
    - Posicionamiento: Fixed header, relative/absolute para elementos overlay

  - **Animaciones y transiciones**:
    - `transition: all 0.25s ease` en elementos interactivos
    - Efectos hover en botones, tarjetas, enlaces
    - Animaciones de aparición con `opacity` y `transform`
    - `prefers-reduced-motion` media query para respetar configuraciones de accesibilidad

  - **Responsive Design**:
    - Media queries en puntos de quiebre: 1024px, 860px, 640px, 420px
    - Grid columns responsivas: `repeat(auto-fit, minmax(15rem, 1fr))`
    - `clamp()` para tipografía fluida: `clamp(1rem, 1.4vw, 1.12rem)`

## Capa de Comportamiento (JavaScript)

### `js/main.js`
- **JavaScript Vanilla** (pure vanilla JS, sin jQuery ni frameworks)
- **IIFE** ( Immediately Invoked Function Expression) con `'use strict'`
- Módulos incluidos:

  1. **Header scroll effect**:
     - Detecta `window.scrollY > 8` para toggled clase `is-scrolled`
     - Evento `scroll` con opción `passive: true` para performance

  2. **Active page tab detection**:
     - Función autoejecutable que obtiene `window.location.pathname`
     - Compara con `href` de los enlaces de navegación
     - Añade/clase `is-active` y atributo `aria-current="page"`

  3. **Mobile menu**:
     - Toggle button con atributos ARIA (`aria-expanded`, `aria-label`)
     - Event listeners en links para cerrar menú
     - Cierre al hacer clic fuera del menú
     - Cierre automático al redimensionar a escritorio (`matchMedia`)

  4. **Gallery lightbox** (solo en galeria.html):
     - Modal con `position: fixed`, `inset: 0`
     - Cambio de imagen src desde el botón clickeado
     - Closure con botón X,Escape key, o clic en fondo oscuro
     - `IntersectionObserver` para animaciones de entrada
     - Focus trap con tecla Tab
     - `prefers-reduced-motion` check para acelerar cierre

  5. **Reveal animations**:
     - Selecciona todos los elementos con `data-reveal` attribute
     - Fallback: si no hay `IntersectionObserver` o `prefers-reduced-motion`, añade clase `is-visible` inmediatamente
     - `IntersectionObserver` con `threshold: 0.15` y `rootMargin: '0px 0px -40px 0px'`
     - Desvanece gradualmente (`opacity: 0` a `1`, `transform: translateY(28px)` a `0`)

  6. **Year update**:
     - `document.getElementById('year').textContent = new Date().getFullYear()`
     - Se ejecuta al cargar la página

## Recursos Adicionales

### Imágenes y Multimedia
- **SVG** (Scalable Vector Graphics): Todas las imágenes y iconos
  - No pierden calidad al escalar
  - Físicamente más pequeños que PNG/JPG para ilustraciones simples
  - Fáciles de colorear via CSS ( `fill="currentColor"` o `color: var(--color-*)` )
  - Archivos en `assets/img/`: about.svg, hero.svg, gallery-1.svg through gallery-6.svg

### Metaetiquetado
- `<meta charset="UTF-8">`: Soporte de caracteres internacionales (español)
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Responsive base
- `<meta name="description" content="...">`: Descripciones por página para SEO
- `<meta name="theme-color" content="#f7fbfa">`: Color de tema del navegador

## Resumen de Decisiones de Tecnología

| Tecnología | Justificación |
|------------|---------------|
| **HTML5 semántico** | Accesibilidad, SEO, código limpio |
| **CSS pu** | Sin build step, carga rápida, fácil customization |
| **JavaScript Vanilla** | No dependencias externas, rendimiento óptimo, fácil debugging |
| **SVG** | Icons e imágenes escalables, color vía CSS, lightweight |
| **Mobile-first** | Mayor porcentaje de tráfico móvil, mejor UX inicial |
| **CSS Variables** | Tema consistente, fácil theming, mantenimiento sencillo |
| **IntersectionObserver** | Animaciones eficientes, sin librerías externas |
| **Media queries** | Responsive design probado, breakpoints lógica de negocio |

## Entorno de Desarrollo
- **Servidor local**: `python3 -m http.server 8000` o `serve -l 8000`
- **Navegadores compatibles**: Chrome, Firefox, Safari, Edge (versiones recientes)
- **Testing**: No requiere bundle/build step, editar archivos directamente se reflejan al recargar

## Futuras Posibilidades
- Integración de framework CSS (Tailwind, Bootstrap) si se necesita más complejidad
- Animaciones con CSS Keyframes para efectos más complejos
- Dark mode support mediante `prefers-color-scheme` media query
- Internacionalización (i18n) si se necesita múltiples idiomas
- Integración con CMS para contenido dinámico en el futuro