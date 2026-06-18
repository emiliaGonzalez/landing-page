# Design

## Theme
Dupe fiel de **DesignJoy** portado a desarrollo. Mismo lenguaje visual: fondo gris-malva cálido, tinta negra, tarjetas blancas, y el motivo estrella — **mallas de gradiente iridiscente (mesh gradients)** en la tarjeta del hero, las 3 tarjetas de pasos y los tiles de íconos de beneficios. Acento naranja vivo. Footer negro. Tipografía Figtree + acentos en serif italic de alto contraste. Sticker de caritas (smiley) reinterpretado con guiño de código.

## Color
- `--bg`: `#ECE6E8` — fondo malva-gris cálido (exacto de DesignJoy, rgb 236,230,232).
- `--card`: `#FFFFFF` — tarjetas.
- `--ink`: `#000000` — texto y elementos oscuros.
- `--ink-soft`: `#6E6A6C` — texto secundario sobre malva (≥4.5:1 verificar).
- `--ink-mute`: `#9A9498` — texto terciario / placeholders.
- `--accent`: `#FF5A00` — naranja firma (botón "Únete hoy", detalles). Texto blanco encima.
- `--abyss`: `#000000` — tarjeta de pricing oscura y footer.
- `--on-abyss`: `#FFFFFF`; `--on-abyss-soft`: `#A8A4A6`.
- `--line`: `rgba(0,0,0,0.12)`; `--line-soft`: `rgba(0,0,0,0.07)`; `--line-abyss`: `rgba(255,255,255,0.14)`.

### Mesh gradients (el motivo)
Pilas de `radial-gradient` iridiscentes. Cuatro variantes:
- `--mesh-iris`: morado/azul/rosa (hero card).
- `--mesh-amber`: amarillo/durazno/lila (Suscríbete + tile beneficio).
- `--mesh-blue`: azul/índigo/violeta (Pide + tile).
- `--mesh-coral`: coral/durazno/violeta (Recibe + tile).
- extras tile: `--mesh-mint` (verde/rosa), `--mesh-lilac`.

## Typography
- **Sans (todo)**: `Figtree` (Google), 400/500/600/700. Titulares en 500–600 muy grandes con tracking apretado (`-0.03em`), line-height ~0.95. Cuerpo 400–500.
- **Acento serif italic**: `Bodoni Moda` italic (Google), alto contraste — para palabras de énfasis dentro de titulares ("para *todos*", "*reimaginó*", "(*claro que sí*)") y para las citas grandes de testimonios. Nunca para párrafos.
- Fallbacks: `system-ui, -apple-system, sans-serif` y `Georgia, serif`.
- Escala fluida `clamp()`, H1 hasta ~5.5rem.

## Shape & Elevation
- Radios: botones `10px`; tarjetas `22px`; tiles de íconos `18px`; pills pequeños (tags, "Empieza hoy") `999px`.
- Sombras suaves y amplias en tarjetas blancas: `0 18px 50px -24px rgba(0,0,0,0.22)`. Gradient cards: sombra de color tenue.
- Cajas de garantía: borde 1px sutil sin sombra.

## Layout
- Contenedor ~1200px, padding `clamp(1.25rem,5vw,3rem)`.
- **Hero asimétrico**: titular a la izquierda, gradient card a la derecha (col 1.05fr / 0.95fr). Apila en móvil.
- Pasos: 3 gradient cards iguales en fila (apilan en móvil). Beneficios: fila de tiles+texto. Pricing: white card + dark card lado a lado + 2 cajas de garantía.
- Separaciones generosas `clamp(4.5rem,10vh,8rem)`.

## Motion
- Suave, ease-out (`cubic-bezier(0.23,1,0.32,1)`). Botones: lift + `:active` scale(0.97).
- Marquee de tags en la tarjeta "Pide" (linear, pausa en hover y reduced-motion).
- Reveal on scroll que mejora un default visible (IntersectionObserver + failsafe). Respeta `prefers-reduced-motion`.
- Gradients estáticos (sin animación pesada); opcional drift muy lento desactivado en reduced-motion.

## Signature elements
- **Smiley sticker** multicolor (amarillo/coral/rosa/negro) sobrepuesto en la esquina de la hero card; una carita lleva `</>` como guiño dev.
- **Mini-mockups** dentro de las gradient cards de pasos (UI real en CSS).
- **Widget de calendario** (estilo Cal.com) en el footer negro.
- Acentos serif italic recurrentes como voz de marca.
