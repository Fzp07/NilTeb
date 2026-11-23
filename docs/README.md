# Documentación del Proyecto Nilteb

## Descripción General
**Nilteb** es un sitio web estático para una empresa de ingeniería biomédica. El nombre "NilTeb" representa "ingeniería biomédica al servicio de la salud".

El proyecto contiene:
- 4 páginas HTML principales
- Archivos CSS y JavaScript para estilo e interactividad
- Imágenes SVG en el directorio `assets/img/`

## Estructura de Archivos

```
/home/fzp07/Nilteb/
├── index.html          # Página de inicio
├── nosotros.html       # Página "Sobre nosotros"
├── servicios.html      # Página de Servicios
├── galeria.html        # Página Galería con lightbox
├── css/
│   └── styles.css      # Hoja de estilos principal
├── js/
│   └── main.js         # Interactividad del sitio
├── assets/
│   └── img/
│       ├── about.svg
│       ├── gallery-1.svg through gallery-6.svg
│       └── hero.svg
└── docs/
    └── README.md       # Esta documentación
```

## Páginas del Sitio

### 1. `index.html` - Página de Inicio
- **Hero section**: Título principal "Tecnología médica que cuida vidas" con llamada a la acción
- **Tarjetas**: 3 tarjetas con sobre enlaces a "Sobre nosotros", "Servicios" y "Galería"
- **Footer**: Información de contacto, horario y redes sociales

### 2. `nosotros.html` - Página "Sobre nosotros"
- Historia de la empresa desde 2016
- Estadísticas: "+10 años de experiencia", "+250 equipos gestionados", "99,8% disponibilidad operativa"
- Perfil del fundador: Daniel Ortega Ruiz, fundador y director técnico
- Frase célebre: "La tecnología solo tiene sentido cuando está al servicio de las personas"

### 3. `servicios.html` - Página de Servicios
- 4 servicios principales:
  1. Mantenimiento preventivo y correctivo
  2. Calibración y verificación
  3. Instalación y asesoría tecnológica
  4. Capacitación y soporte
- Cada servicio tiene ícono descriptivo y texto explicativo

### 4. `galeria.html` - Página Galería
- Grid de 6 imágenes con capacitación al pasar el mouse
- Lightbox (visor de imágenes) al hacer clic en cualquier imagen
- Cada imagen tiene una etiqueta/caption (Monitorización, Laboratorio, Mantenimiento, Imagenología, Calibración, Quirófano)

## Características Técnicas

### Estilo (CSS - `css/styles.css`)
- Diseño **mobile-first** (diseño que comienza por móviles)
- Variables CSS personalizadas para colores, tipografía y espaciado
- Colores principales: 
  - `--color-accent: #0f766e` (verde azulado)
  - `--color-bg: #f7fbfa` (fondo claro)
- Animaciones suaves y efectos de hover
- Tipografía con serif para acentos

### Interactividad (JavaScript - `js/main.js`)
El archivo `main.js` incluye las siguientes funcionalidades:

1. **Header con sombra al hacer scroll**
   - El header cambia de apariencia al hacer scroll (clase `is-scrolled`)
   - Umbral de 8 píxeles de desplazamiento

2. **Pestaña activa según la página actual**
   - Detecta automáticamente qué página se está mostrando
   - Resalta el enlace de navegación correspondiente
   - Usa `window.location.pathname` para determinar la página actual

3. **Menú móvil accesible**
   - Botón hamburguesa que muestra/oculta el menú
   - Cierre al hacer clic fuera del menú
   - Cierre automático al cambiar a modo escritorio
   - Atributos ARIA para accesibilidad

4. **Lightbox para la galería (solo en galeria.html)**
   - Abre imágenes en un modal centrado
   - Navegación con tecla Tab para mantener el foco
   - Cierre con botón "X" o haciendo clic en el fondo oscuro
   - Presiona Escape para cerrar

5. **Animaciones de aparición al hacer scroll**
   - Elementos con `data-reveal` van desvaneciéndose gradualmente
   - Usa `IntersectionObserver` para detectar cuándo son visibles
   - Fallback: si no hay IntersectionObserver o el usuario prefiere reducir movimiento, se añade la clase `is-visible` inmediatamente

6. **Actualización automática del año**
   - El elemento `<span id="year">` se actualiza automáticamente con el año actual
   - Se ejecuta al cargar la página: `new Date().getFullYear()`

7. **Enlaces de saltos (skip links)**
   - Enlace al inicio de contenido para accesibilidad
   - Se oculta por defecto y aparece cuando tiene foco

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica con elementos como `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- **CSS3**: Flexbox, Grid, variables personalizadas, media queries, animaciones, transiciones
- **JavaScript Vanilla**: Sin dependencias externas (solo el servidor `serve` para desarrollo)
- **SVG**: Todas las imágenes son vectores escalables
- **Responsive Design**: Funciona en móviles, tablets y escritorio

## Cómo Ejecutar el Proyecto Localmente

Dado que es un sitio web estático, necesitas un servidor local para que funcione correctamente. Sigue estos pasos:

### Opción 1: Usando Python (con puerto 8000 - actualizado)

1. Asegúrate de estar en el directorio correcto:
   ```bash
   cd /home/fzp07/Nilteb
   ```

2. Inicia el servidor en el puerto 8000:
   ```bash
   python3 -m http.server 8000
   ```

3. Abre tu navegador e ingresa:
   ```
   http://localhost:8000
   ```

### Opción 2: Usando Node.js

Si tienes Node.js instalado, puedes usar el paquete `serve`:

```bash
# Instalar serve si no lo tienes
npm install -g serve

# Iniciar servidor en puerto 8000
serve -l 8000

# Alternativamente, el puerto por defecto es 3000
serve -l 3000
```

Abre tu navegador e ingresa:
```
http://localhost:3000
```
O el puerto que indiques.

### Opción 3: VS Code Live Server
- Instala la extensión "Live Server" en VS Code
- Haz clic derecho en `index.html` → "Open with Live Server"
- O haz clic en el botón "Go Live" en la esquina inferior derecha

## Solución de Problemas Comunes

### "El proyecto no me corre"
- **Causa**: Intentando abrir archivos HTML directamente (`double-click` o `file:///`)
- **Solución**: Siempre usar un servidor local (Python, Node.js o Live Server)

### "Las imágenes no se ven"
- **Causa**: Rutas relativas incorrectas
- **Solución**: Ejecutar desde el directorio `Nilteb` con un servidor local

### "El menú móvil no funciona"
- **Causa**: Sin servidor activo o caché del navegador
- **Solución**: Limpiar caché o recargar la página después de iniciar el servidor

### "Los estilos se ven rotos"
- **Causa**: El servidor no está sirviendo los archivos CSS/JS
- **Solución**: Verificar que el servidor está corriendo y la URL correcta

## Personalización

### Cambiar colores
Modificar las variables CSS en `:root` de `css/styles.css`:
- `--color-accent`: Color principal (verde azulado actual: `#0f766e`)
- `--color-bg`: Color de fondo (`#f7fbfa`)
- `--color-text`: Color de texto (`#1c2b29`)

### Modificar contenido
- Textos: Editar directamente en los archivos HTML
- Imágenes: Reemplazar archivos SVG en `assets/img/`
- Enlaces: Actualizar rutas `href` en los menús

### Añadir nuevas páginas
- Crear nuevo archivo HTML siguiendo la estructura existente
- Agregar enlace de navegación en el header
- El JavaScript detectará automáticamente la nueva página y activará el tab correspondiente

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones recientes)
- **Dispositivos**: Escritorio, tablets, teléfonos móviles
- **Accesibilidad**: Cumple con estándares WCAG básicos
- **Motion reduction**: Respeta la configuración "reduced motion" del usuario

## Licencia
El proyecto está bajo licencia MIT (consultar el archivo `package.json` para detalles completos).

---

**Nota importante**: Este es un proyecto estático sin backend ni base de datos. Toda la lógica funciona en el cliente (navegador). Para un proyecto de producción real, se añadiría un CMS, base de datos y posiblemente un framework como React, Vue o Svelte.