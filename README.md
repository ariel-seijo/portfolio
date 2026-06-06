# Ariel Seijo — Portfolio

Landing page personal con fondo WebGL generativo, animaciones al scroll y formulario de contacto funcional. Construido con Astro, React 19 y TypeScript.

**[ariel-seijo.vercel.app](https://ariel-seijo.vercel.app)**

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | [Astro 5](https://astro.build) (SSR) |
| UI | [React 19](https://react.dev) |
| Lenguaje | TypeScript |
| Estilos | CSS custom properties + [LightningCSS](https://lightningcss.dev) |
| Animaciones | [Motion](https://motion.dev) (ex Framer Motion) |
| Fondo WebGL | [OGL](https://github.com/oframe/ogl) (shader CPPN generativo) |
| Email | [Resend](https://resend.com) |
| Hosting | [Vercel](https://vercel.com) |

## Lo que incluye

- **Fondo WebGL generativo** — shader CPPN con hue-shift, scanlines y noise. Se carga con spinner antes de mostrar el contenido.
- **Animaciones al scroll** — IntersectionObserver + CSS transitions. Respeta `prefers-reduced-motion`.
- **Hero** — nombre, rol, tagline, avatar y botón de descarga de CV.
- **Sobre mí** — avatar en marco de terminal estilo macOS + stats animados con contadores.
- **Tecnologías** — grid de 12 tarjetas con efecto 3D tilt, spotlight al mouse y glow por color de marca.
- **Proyectos** — galería con lightbox fullscreen, carrusel de imágenes, pills de tecnologías y badges de estado (producción/desarrollo).
- **Educación** — tarjeta con datos académicos.
- **Contacto** — formulario con validación cliente/servidor que envía emails reales vía Resend.
- **Círculos sociales flotantes** — acceso rápido a LinkedIn, GitHub, Email y CV con animaciones spring.

## Estructura

```
src/
├── components/
│   ├── react/           # React (.tsx) — interactividad cliente
│   │   ├── icons/       # Iconos SVG compartidos
│   │   ├── contact/     # Info de contacto lateral
│   │   └── projects/    # Tarjeta individual de proyecto
│   ├── sections/        # Astro — secciones de la página
│   └── ui/              # Componentes de presentación
├── data/                # Capa de datos tipada (TypeScript)
├── layouts/             # Layout base con head, SEO y loader
├── pages/
│   ├── index.astro      # Página única
│   └── api/contact.ts   # Endpoint del formulario (Resend)
└── styles/              # Tokens, globales y animaciones
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# TypeScript check
npm run typecheck

# Build de producción
npm run build
```

### Variables de entorno

Copiá `.env.example` a `.env` y completá:

```env
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=tu@email.com
```

## Deploy

El proyecto usa el adapter SSR de Vercel. Conectá el repo a Vercel y se deploya automáticamente en cada push a `main`.

```bash
npm run build    # Genera dist/ para preview local
npm run preview  # Sirve el build localmente
```

## Licencia

MIT
