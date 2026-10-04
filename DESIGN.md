# Barber 920 — Referencia de estilo
> Letras marfil talladas en una pared negra, con el oro del sello como única joya. Un titular condensado de hasta 153 px domina el espacio vacío y el logo aporta el color que la interfaz se niega a poner.

**Tema:** oscuro
**Origen:** adaptación de la referencia *Break Maiden* (galería negra, tipografía gigante, cero adornos) a los colores del logo [Imagenes/Logo920.jpg](Imagenes/Logo920.jpg). Se conservan la composición y las reglas; el monocromo blanco y gris se sustituye por la paleta del sello.

Barber 920 se presenta como un sello de barbería clásico colgado en una pared negra. El lienzo es negro absoluto, igual que el fondo del logo, para que el sello se funda con la página sin marco. Un titular condensado (Anton) a escala de cartel hace todo el trabajo emocional; una grotesca sobria (Inter) se encarga de la navegación, los formularios y el texto. El oro del aro solar es el único acento y aparece en antetítulos, cifras, bordes de acción y estados de foco. El rojo y el azul del poste se reservan para señales pequeñas: la franja superior y los estados de las citas. No hay sombras, degradados, esquinas redondeadas ni fondos de tarjeta. La jerarquía sale del contraste entre espacio vacío y tipografía colosal.

## Tokens — Colores

Todos los valores se midieron sobre el logo (mediana de los píxeles de cada zona).

| Nombre | Valor | Token | Origen en el logo | Rol | Contraste sobre negro |
|--------|-------|-------|-------------------|-----|-----------------------|
| Negro ónix | `#000000` | `--color-onyx` | Fondo del sello | Lienzo de toda la página; el único color que rellena regiones | — |
| Marfil | `#faf4d8` | `--color-ivory` | Letras "BARBER 920" | Titulares, texto principal, navegación, valores de formulario | 19.0:1 |
| Oro | `#e9bf59` | `--color-gold` | Aro solar, "ESTD 2018", "BARBER COMPANY" | Acento único: antetítulos, cifras y precios, borde del botón fantasma, enlace activo, subrayado al pasar el cursor, foco | 12.1:1 |
| Oro antiguo | `#8a6f34` | `--color-antique-gold` | Sombra de los ornamentos | Bordes de campos, marco del resumen, línea bajo encabezados de tabla | 4.4:1 |
| Plata | `#bab9b6` | `--color-silver` | Tijeras | Texto secundario, metadatos, etiquetas de campo, aviso de demostración | 10.7:1 |
| Rojo poste | `#9b201b` | `--color-pole-red` | Franjas del poste | Solo señales: franja superior, error de formulario, estado *Cancelada* | 2.6:1 |
| Azul poste | `#0a6cb5` | `--color-pole-blue` | Franjas del poste | Solo señales: franja superior, estado *Confirmada* | 3.8:1 |
| Línea | `#3e3217` | `--color-rule` | Oro antiguo al 45 % sobre negro | Separadores entre filas de tabla y del resumen | 1.7:1 (decorativa) |

### Colores de estado

| Estado | Color | Token |
|--------|-------|-------|
| Pendiente | Oro | `--color-gold` |
| Confirmada | Azul poste | `--color-pole-blue` |
| Completada | Marfil | `--color-ivory` |
| Cancelada | Rojo poste | `--color-pole-red` |

El estado se muestra siempre como un cuadro de 10 px seguido del texto. El color nunca es la única señal.

## Tokens — Tipografía

### Anton: titular display · `--font-display`
- **Sustituye a:** Martin (la fuente de la referencia original)
- **Pesos:** 400
- **Tamaños:** 153 px (hero), 96 px (títulos de página, precios y cifras), 64 px (títulos de sección), 43 px (pasos, resumen)
- **Interlineado:** 1.0 (1.05 en títulos de sección)
- **Rol:** voz de cartel. Condensada y en mayúsculas visuales, hace eco del "BARBER 920" del sello. Solo para titulares y cifras, nunca para párrafos.

### Inter: interfaz y cuerpo · `--font-body`
- **Sustituye a:** America
- **Pesos:** 400 (texto), 500 (nombres, botones, etiquetas)
- **Tamaños:** 14 px (etiquetas), 19 px (cuerpo), 22 px (nombres de servicio y sucursal, texto de entrada)
- **Interlineado:** 1.5
- **Rol:** navegación, formularios, tablas y texto corrido. Su pequeñez frente a Anton crea el ritmo editorial.

Ambas fuentes se sirven desde `web/assets/` (licencia SIL OFL, incluida). La política de seguridad del servidor (`default-src 'self'`) bloquea Google Fonts, así que no deben enlazarse desde un CDN.

### Escala tipográfica

| Rol | Familia | Peso | Tamaño | Interlineado | Espaciado | Token |
|-----|---------|------|--------|--------------|-----------|-------|
| label | Inter | 500 | 14px | 1.5 | 0.18em, mayúsculas | `--text-label` |
| body-sm | Inter | 400 | 19px | 1.5 | — | `--text-body-sm` |
| body | Inter | 400/500 | 22px | 1.5 | — | `--text-body` |
| heading | Anton | 400 | clamp(40px, 4.6vw, 64px) | 1.05 | — | `--text-heading` |
| display-md | Anton | 400 | clamp(56px, 7vw, 96px) | 1 | — | `--text-display-md` |
| display | Anton | 400 | clamp(64px, 10.6vw, 153px) | 1 | — | `--text-display` |

La etiqueta (`label`) imita el "ESTD 2018" del sello: mayúsculas espaciadas, en oro para antetítulos y en plata para etiquetas de campo y metadatos.

## Tokens — Espaciado y formas

**Densidad:** cómoda

| Nombre | Valor | Token | Uso típico |
|--------|-------|-------|------------|
| 13 | 13px | `--spacing-13` | Separación interna de piezas, relleno de campos |
| 18 | 18px | `--spacing-18` | Margen lateral en móvil, espacio entre campos |
| 27 | 27px | `--spacing-27` | Espacio entre enlaces de navegación y columnas |
| 43 | 43px | `--spacing-43` | Margen lateral en escritorio, separación entre bloques |
| 78 | 78px | `--spacing-78` | Separación entre secciones, desplazamiento de la rejilla irregular |

- **Margen lateral (`--gutter`):** 43 px en escritorio y 18 px a partir de 700 px de ancho o menos.
- **Radio de esquinas:** 0 px en todo (botones, campos, marcos, imágenes). El logo es circular por sí mismo; no se recorta, y sus esquinas negras se funden con el lienzo.

## Componentes

### Franja del poste
Banda de 6 px en el borde superior de la página con rayas de rojo, marfil, azul y marfil a −45°, con cortes duros. Es el único patrón del sistema y aparece una sola vez.

### Aviso de demostración
Texto de 14 px en plata, centrado, directamente sobre negro y bajo la franja. Sin fondo ni borde.

### Barra de navegación
Sello del logo a la izquierda (72 px; 56 px en móvil) como enlace a inicio. Cuatro enlaces a la derecha en Inter 19 px marfil, separados 27 px. Al pasar el cursor aparece un subrayado de 1 px en oro; el enlace activo se pinta en oro. No es fija. En móvil se pliega tras un botón "Menú" con borde de oro antiguo y los enlaces pasan a 22 px en columna.

### Titular display (hero)
Anton a 153 px en marfil, alineado a la izquierda y a todo el ancho. Lleva el logo como glifo entre paréntesis, a escala de letra (0.78 em), igual que el galgo de la referencia original. El glifo es decorativo (`aria-hidden`). Encima va un antetítulo en oro; debajo, en una fila, los tres pasos (dos tercios) y el texto de apoyo con las acciones (un tercio). En pantallas estrechas las acciones van antes que los pasos.

### Pasos 01·02·03
Número en Anton 43 px oro, nombre en Inter 22 px marfil y descripción en 19 px plata. Sin marcos ni líneas.

### Botón fantasma (`.button.primary`)
Inter 500, 19 px, texto marfil, borde de 1 px en oro, sin relleno, 54 px de alto. Al pasar el cursor se rellena de oro con texto negro. Es el único momento en que el oro cubre un área. Una acción principal por bloque.

### Enlace fantasma (`.button.secondary`)
Texto marfil seguido de una flecha → en oro, sin borde ni relleno. Al pasar el cursor aparece un subrayado de 1 px en oro y la flecha avanza 4 px. Para acciones secundarias como "Ver sucursales", "Elegir esta sucursal" o "Cerrar sesión". Los enlaces que abren otra pestaña (Google Maps) usan ↗ en lugar de →.

### Pieza de servicio
El precio en Anton 96 px oro ocupa el lugar de la fotografía. Debajo van el nombre (22 px marfil), la descripción (19 px plata) y la duración como etiqueta. Sin fondo, borde ni relleno: el negro de la página es la tarjeta.

### Pieza de sucursal
De arriba abajo: número 01–03 en Anton 96 px oro, mapa de la sucursal, nombre en 22 px, horario y dirección en plata, nota "Información simulada" como etiqueta y dos enlaces fantasma: "Elegir esta sucursal →" y "Cómo llegar ↗".

### Mapa de sucursal
Mapa incrustado de Google Maps, cuadrado (1:1), a todo el ancho de la pieza, sin borde, radio ni filtros. Ocupa el lugar de la fotografía en la pieza, y su color claro contrasta con el lienzo igual que las fotos de producto de la referencia original. Se construye con la dirección del servidor sin la nota entre paréntesis y solo se carga al abrir la vista Sucursales. "Cómo llegar" abre la ruta en Google Maps (en el celular, en la app) y también aparece en la confirmación de la cita.

### Rejilla irregular
Servicios en cuatro columnas y sucursales en tres. Las columnas pares (o la central) bajan 78 px para romper la alineación con un ritmo de revista. Con dos columnas se mantiene el desfase; con una columna desaparece.

### Campos de formulario
Etiqueta en mayúsculas espaciadas de 14 px en plata. Campo de 54 px de alto, fondo negro, texto marfil de 19 px y borde de 1 px en oro antiguo. Al pasar el cursor y al enfocar, el borde se vuelve oro y aparece el contorno de foco. Las casillas usan `accent-color` oro. Los indicadores de paso (01 02 03) son cuadros de 43 px con borde de oro antiguo y número Anton en oro.

### Mensaje de error
Texto marfil 500 con una barra de 4 px en rojo poste a la izquierda. El rojo no se usa como color de texto.

### Panel de resumen
Uno de los pocos elementos con marco: borde de 1 px en oro antiguo y 27 px de relleno. El título del servicio va en Anton 43 px, con filas `dt/dd` separadas por líneas `--color-rule`. Es fijo al desplazarse en escritorio.

### Indicadores del panel
Cifra en Anton 96 px oro y etiqueta en plata precedida del cuadro de color del estado.

### Tabla de citas
Encabezados en etiqueta oro con una línea inferior de oro antiguo; filas separadas por `--color-rule`, sin fondos alternos. La columna de estado lleva el cuadro de color antes del selector.

### Pie
"BARBER 920" en Anton 27 px marfil a la izquierda; créditos en 14 px plata a la derecha.

## Hacer y no hacer

### Hacer
- Usar solo negro `#000000` como relleno de regiones; el logo se apoya en ese mismo negro.
- Reservar Anton para titulares y cifras, y mantener el titular del hero a 153 px en escritorio.
- Usar el oro como único acento: antetítulos, cifras, bordes de acción, foco y enlace activo.
- Mostrar el rojo y el azul del poste solo en señales pequeñas (franja, cuadros de estado, barra de error) y siempre acompañados de texto.
- Separar secciones con 78 px de negro, no con líneas ni bandas.
- Mantener todas las esquinas a 0 px.
- Desplazar columnas en las rejillas de servicios y sucursales.

### No hacer
- No usar el rojo ni el azul del poste como color de texto: no alcanzan el contraste mínimo sobre negro.
- No añadir sombras, degradados suaves, brillos ni transparencias en superficies. La franja del poste es un patrón de cortes duros, no un degradado.
- No poner fondos de tarjeta ni grises intermedios. Los únicos neutros son marfil, plata y la línea.
- No rellenar botones en reposo. El relleno oro aparece solo al pasar el cursor por el botón fantasma.
- No colocar el logo sobre un fondo que no sea negro, ni recolorearlo, enmarcarlo o recortarlo.
- No usar Anton para párrafos ni Inter para el titular del hero.
- No cargar fuentes ni imágenes desde otros dominios (la CSP del servidor lo impide). La única excepción son los mapas incrustados de `https://www.google.com` (`frame-src`).
- No aplicar filtros ni modo oscuro a los mapas de Google: se muestran tal como los entrega Google.

## Superficies

| Nivel | Nombre | Valor | Propósito |
|-------|--------|-------|-----------|
| 1 | Lienzo | `#000000` | Toda la página: aviso, navegación, hero, rejillas, formularios, tabla y pie. No hay niveles superiores. |

## Elevación

El sistema no tiene elevación. No hay sombras, capas translúcidas ni tarjetas apiladas. La profundidad viene de la escala tipográfica (153 px frente a 19 px) y de los pocos marcos de 1 px (campos, resumen y botón fantasma).

## Imágenes

El logo es la única imagen propia. Se sirve como `web/assets/logo920.jpg` (512 × 512, generado a partir de `Imagenes/Logo920.jpg`) y aparece en tres lugares: el sello de la navegación, el glifo del titular y el favicon. Su fondo negro coincide con el lienzo, así que nunca necesita marco ni recorte.

Los mapas de Google de cada sucursal funcionan como las fotografías de la referencia: cuadrados, de borde a borde, sin marco, y son la principal fuente de color en la vista Sucursales. Si en el futuro se agregan fotografías de cortes o sucursales, deben ser cuadradas o 3:4, ir de borde a borde, sin radio ni marco, y aportar el color igual que el precio en las piezas de servicio.

## Composición

Lienzo negro a todo el ancho, sin contenedor centrado, con márgenes laterales de 43 px. El hero es asimétrico: un titular colosal a todo el ancho y, debajo, los tres pasos en dos tercios frente al texto de apoyo y las acciones en el tercio derecho. Después vienen la rejilla irregular de servicios y un bloque de cierre con el mismo reparto 2:1. Las vistas internas (sucursales, reservar, administración) abren con antetítulo, título display-md y una línea en plata. La reserva reparte el formulario (2/3) y el resumen enmarcado (1/3). Bajo 900 px todo pasa a una columna; bajo 700 px el margen se reduce a 18 px y la navegación se pliega.

## Accesibilidad

- Texto principal y secundario muy por encima de 4.5:1 (marfil 19:1, oro 12:1, plata 10.7:1).
- Bordes de campos en oro antiguo (4.4:1), por encima del mínimo de 3:1 para componentes.
- El color de estado siempre va junto a su texto, y los errores se escriben en marfil con barra roja.
- Foco visible: contorno de 2 px en oro con separación de 3 px en todo elemento interactivo.
- `color-scheme: dark` para que los controles nativos (fecha, listas) se rendericen oscuros.
- Con `prefers-reduced-motion` se desactivan transiciones y desplazamiento suave.

## Guía para agentes

Referencia rápida de color:
- texto: `#faf4d8`
- fondo: `#000000`
- acento: `#e9bf59` (oro)
- borde: `#8a6f34` (campos, marcos) o `#3e3217` (separadores)
- texto secundario: `#bab9b6`
- señales: `#9b201b` (rojo poste) y `#0a6cb5` (azul poste), nunca como texto
- acción principal: borde oro sin relleno; hover con relleno oro y texto negro

Ejemplos de instrucciones para componentes:

1. **Titular hero:** fondo `#000000`. Texto en Anton 153 px, peso 400, interlineado 1, color `#faf4d8`, alineado a la izquierda y a todo el ancho. Incluir el logo como glifo entre paréntesis a 0.78 em. Antetítulo encima en Inter 500, 14 px, mayúsculas, 0.18 em de espaciado, color `#e9bf59`.
2. **Navegación:** fondo `#000000`, sello del logo de 72 px a la izquierda y cuatro enlaces a la derecha en Inter 19 px `#faf4d8`, separados 27 px. Hover con subrayado de 1 px `#e9bf59` a 6 px de la línea base; activo en `#e9bf59`.
3. **Pieza de servicio:** sin fondo ni borde. Precio en Anton 96 px `#e9bf59`, nombre en Inter 500 22 px `#faf4d8`, descripción en Inter 19 px `#bab9b6`, duración como etiqueta de 14 px en mayúsculas `#bab9b6`. En rejilla de cuatro columnas con las pares bajadas 78 px.
4. **Botón fantasma:** Inter 500 19 px `#faf4d8`, borde 1 px `#e9bf59`, 54 px de alto, relleno 13 px × 27 px, radio 0. Hover con fondo `#e9bf59` y texto `#000000`.
5. **Campo de formulario:** etiqueta Inter 500 14 px mayúsculas `#bab9b6`. Campo de 54 px, fondo `#000000`, texto `#faf4d8`, borde 1 px `#8a6f34`, radio 0. Hover y foco con borde `#e9bf59` y contorno de 2 px `#e9bf59`.

## Inicio rápido

### Propiedades personalizadas de CSS

```css
:root {
  /* Colores del logo */
  --color-onyx: #000000;
  --color-ivory: #faf4d8;
  --color-gold: #e9bf59;
  --color-antique-gold: #8a6f34;
  --color-silver: #bab9b6;
  --color-pole-red: #9b201b;
  --color-pole-blue: #0a6cb5;
  --color-rule: #3e3217;

  /* Tipografía — familias (archivos en web/assets/) */
  --font-display: "Anton", "Bebas Neue", Impact, "Arial Narrow", sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Tipografía — escala */
  --text-label: 14px;
  --text-body-sm: 19px;
  --text-body: 22px;
  --text-heading: clamp(40px, 4.6vw, 64px);
  --text-display-md: clamp(56px, 7vw, 96px);
  --text-display: clamp(64px, 10.6vw, 153px);
  --tracking-label: 0.18em;

  /* Espaciado */
  --spacing-13: 13px;
  --spacing-18: 18px;
  --spacing-27: 27px;
  --spacing-43: 43px;
  --spacing-78: 78px;
  --gutter: var(--spacing-43); /* 18px bajo 700px */
}
```

### Implementación en el repositorio

- Estilos: [web/styles.css](web/styles.css)
- Logo y fuentes: [web/assets/](web/assets/)
- Los archivos estáticos se sirven desde una lista cerrada en [server/index.js](server/index.js) (`staticPaths`). Cualquier archivo nuevo en `web/assets/` debe agregarse ahí con su tipo en `contentTypes`.
