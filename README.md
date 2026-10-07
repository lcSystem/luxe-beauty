# AURA ATELIER — Portafolio Visual & Mostrario Digital de Haute Beauté

Un sitio web de alta gama, moderno, minimalista y cinematográfico diseñado exclusivamente como **mostrario y portafolio visual** de arte en uñas (nail art, manicure ruso, extensiones esculpidas, pedicure spa de autor y estética de la mirada).

> **IMPORTANTE**: Este proyecto **NO** es una tienda, **NO** incluye carrito, precios, pasarelas de pago ni sistemas de reserva o citas. Está concebido con el rigor de una **revista editorial de belleza de lujo** y una **galería de arte interactiva**, donde la fotografía es la protagonista absoluta.

---

## ✨ Características Principales

* **Estética Editorial de Alta Costura**:
  * Tipografía serif refinada (*Cormorant Garamond*) combinada con sans-serif geométrica (*Plus Jakarta Sans*).
  * Paleta de color curada: marfil, arena cálida, champagne, toques sutiles de oro y negro profundo para contraste.
  * Cero colores estridentes o diseños genéricos de salón tradicional.

* **Mobile First Riguroso**:
  * Diseñado ergonómicamente para navegación con una sola mano en pantallas móviles (320px a 430px y tablets/escritorio).
  * Barra de navegación inferior flotante tipo app móvil.
  * Gestos táctiles de **Swipe Horizontal** para navegar fluidamente entre fotografías.
  * Cero desbordamiento horizontal (`overflow-x: hidden`).

* **Composición Editorial Asimétrica (Sin cuadrícula aburrida 3x3)**:
  * Ritmo dinámico alternando fotografía protagonista grande, diptychs verticales, planos de detalle, tomas panorámicas y pausas con reflexiones editoriales.

* **Visor Cinematográfico Interactivo (Shared Element)**:
  * Transición fluida con **Framer Motion**.
  * Ficha técnica discreta con técnica, forma, acabado y paleta cromática de cada trabajo.
  * Navegación por teclado (`←`, `→`, `ESC`, `Z`).
  * Herramienta de **Zoom de Alta Precisión** (hasta 350%) y desplazamiento para apreciar microdetalles del nail art y la cutícula.

* **Modo Exposición Inmersiva (Slideshow)**:
  * Convierte la pantalla en una exhibición continua automática de arte a pantalla completa para presentaciones en eventos o exhibición en salón.

* **Estructura de Datos Desacoplada**:
  * Todos los trabajos están centralizados en `src/data/projects.ts`.
  * Las colecciones temáticas en `src/data/collections.ts`.
  * Las categorías en `src/data/categories.ts`.
  * Fácilmente escalable para añadir decenas de trabajos sin tocar los componentes.

---

## 🛠️ Stack Tecnológico

* **Framework**: Next.js 14 (App Router)
* **Lenguaje**: TypeScript 5
* **Estilos**: Tailwind CSS 3.4
* **Animaciones**: Framer Motion 11
* **Iconografía**: Lucide React
* **Optimización de Medios**: Next/Image (formatos WebP y AVIF)
* **Despliegue**: Optimizado nativamente para **Vercel**

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar o navegar al directorio:
```bash
cd luxe-beauty-atelier
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### 4. Compilar para producción (Build):
```bash
npm run build
```

### 5. Iniciar en modo producción:
```bash
npm run start
```

---

## 📷 Cómo Reemplazar las Fotografías con Trabajos Reales

Las fotografías actuales son muestras en alta resolución de Unsplash. Para colocar las fotografías reales de tus trabajos:

### Opción A: Guardar imágenes locales en el proyecto
1. Coloca tus archivos de imagen en la carpeta:
   ```
   public/images/projects/
   ```
   *(por ejemplo: `obra-01.jpg`, `obra-02.jpg`, etc.)*

2. Abre el archivo `src/data/projects.ts` y actualiza la propiedad `image`:
   ```typescript
   {
     id: 'work-01',
     num: '01',
     title: 'SOFT NUDE ESCULTURE',
     image: '/images/projects/obra-01.jpg',
     // ...
   }
   ```

### Opción B: Usar un servicio CDN (Cloudinary, AWS S3, etc.)
1. Sube tus fotos a tu CDN o repositorio de medios.
2. Añade los dominios a `next.config.mjs` en `images.remotePatterns` si utilizas un host externo.
3. Coloca las URLs directamente en `src/data/projects.ts`.

---

## ☁️ Despliegue en Vercel (GitHub → Vercel)

El proyecto está 100% preparado para desplegarse con un solo click:

1. Sube este repositorio a **GitHub**.
2. Entra en [vercel.com](https://vercel.com) e inicia sesión.
3. Haz clic en **"Add New..."** → **"Project"**.
4. Importa tu repositorio de GitHub `luxe-beauty-atelier`.
5. Vercel detectará automáticamente Next.js.
6. Haz clic en **Deploy**.
7. ¡Listo! Tendrás tu URL de producción en segundos con SSL automático y CDN global.

---

## ♿ Accesibilidad y Rendimiento

* Soporte de `prefers-reduced-motion` para usuarios sensibles a animaciones.
* Atributos `alt` descriptivos en todas las imágenes.
* Controles accesibles por teclado y etiquetas `aria-*`.
* Carga diferida (`lazy loading`) y tamaños responsivos en imágenes.
