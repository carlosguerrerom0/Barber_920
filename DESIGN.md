# Barber 920: guía de estilo
> Fondo negro, letras color marfil y el dorado del logo como único color de acento. Los títulos son muy grandes y el logo pone el color.

**Tema:** oscuro
**Origen:** tomamos como referencia el sitio *Break Maiden* (fondo negro, letras gigantes, sin adornos) y le pusimos los colores del logo ([web/assets/logo920.jpg](web/assets/logo920.jpg)).

El fondo es negro, igual que el del logo, así que el logo se ve pegado a la página sin marco. Los títulos usan Anton, una letra alta y angosta como la de un cartel. El resto del texto usa Inter, que es sencilla y se lee bien. El dorado del logo es el único color de acento: lo usamos en títulos pequeños, precios, botones y el foco. El rojo y el azul del poste de barbería solo aparecen en señales chicas, como la franja de arriba y los estados de las citas. No usamos sombras, degradados, esquinas redondeadas ni fondos de tarjeta.

## Colores

Los colores los sacamos del logo.

| Nombre | Valor | Token | Origen en el logo | Rol | Contraste sobre negro |
|--------|-------|-------|-------------------|-----|-----------------------|
| Negro ónix | `#000000` | `--color-onyx` | Fondo del sello | Fondo de toda la página. Es el único color que rellena áreas | — |
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

## Tipografía

### Anton: titular display · `--font-display`
- **Sustituye a:** Martin (la fuente de la referencia original)
- **Pesos:** 400
- **Tamaños:** 153 px (hero), 96 px (títulos de página, precios y cifras), 64 px (títulos de sección), 43 px (pasos, resumen)
- **Interlineado:** 1.0 (1.05 en títulos de sección)
- **Uso:** títulos y cifras, como el "BARBER 920" del logo. Nunca para párrafos.

### Inter: interfaz y cuerpo · `--font-body`
- **Sustituye a:** America
- **Pesos:** 400 (texto), 500 (nombres, botones, etiquetas)
- **Tamaños:** 14 px (etiquetas), 19 px (cuerpo), 22 px (nombres de servicio y sucursal, texto de entrada)
- **Interlineado:** 1.5
- **Uso:** menú, formularios, tablas y párrafos.

Las dos fuentes están en `web/assets/` con su licencia SIL OFL. La política de seguridad del servidor bloquea Google Fonts, así que no se pueden enlazar desde otro sitio.

### Escala tipográfica

| Rol | Familia | Peso | Tamaño | Interlineado | Espaciado | Token |
|-----|---------|------|--------|--------------|-----------|-------|
| label | Inter | 500 | 14px | 1.5 | 0.18em, mayúsculas | `--text-label` |
| body-sm | Inter | 400 | 19px | 1.5 | — | `--text-body-sm` |
| body | Inter | 400/500 | 22px | 1.5 | — | `--text-body` |
| heading | Anton | 400 | clamp(40px, 4.6vw, 64px) | 1.05 | — | `--text-heading` |
| display-md | Anton | 400 | clamp(56px, 7vw, 96px) | 1 | — | `--text-display-md` |
| display | Anton | 400 | clamp(64px, 10.6vw, 153px) | 1 | — | `--text-display` |

La etiqueta (`label`) imita el "ESTD 2018" del logo: mayúsculas con espacio entre letras, en dorado para títulos pequeños y en plata para etiquetas de campo.

## Espaciado y formas

**Densidad:** cómoda

| Nombre | Valor | Token | Uso típico |
|--------|-------|-------|------------|
| 13 | 13px | `--spacing-13` | Separación interna de piezas, relleno de campos |
| 18 | 18px | `--spacing-18` | Margen lateral en móvil, espacio entre campos |
| 27 | 27px | `--spacing-27` | Espacio entre enlaces de navegación y columnas |
| 43 | 43px | `--spacing-43` | Margen lateral en escritorio, separación entre bloques |
| 78 | 78px | `--spacing-78` | Separación entre secciones, desplazamiento de la rejilla irregular |

- **Margen lateral (`--gutter`):** 43 px en escritorio y 18 px a partir de 700 px de ancho o menos.
- **Esquinas:** rectas en todo (botones, campos, marcos e imágenes). El logo ya es redondo y no se recorta.

## Componentes

### Franja del poste
Franja de 6 px arriba de la página con rayas rojas, marfil y azules en diagonal, como un poste de barbería. Aparece una sola vez.

### Aviso de prueba
Texto de 14 px en plata, centrado, sobre negro y debajo de la franja. Sin fondo ni borde.

### Barra de navegación
El logo va a la izquierda (72 px, o 56 px en celular) y lleva al inicio. A la derecha van cuatro enlaces en Inter 19 px marfil, separados 27 px. Al pasar el cursor se subrayan en dorado y el enlace activo se pinta de dorado. En celular los enlaces se esconden detrás de un botón "Menú".

### Titular display (hero)
Anton a 153 px en marfil, alineado a la izquierda. Lleva el logo entre paréntesis, del tamaño de una letra. Es solo decoración (`aria-hidden`). Arriba va un título pequeño en dorado. Abajo van los tres pasos (dos tercios del ancho) y el texto con los botones (un tercio). En pantallas chicas los botones van antes que los pasos.

### Pasos 01·02·03
Número en Anton 43 px oro, nombre en Inter 22 px marfil y descripción en 19 px plata. Sin marcos ni líneas.

### Botón fantasma (`.button.primary`)
Inter 500, 19 px, texto marfil, borde de 1 px dorado, sin relleno y 54 px de alto. Al pasar el cursor se rellena de dorado con texto negro. Solo hay uno por bloque.

### Enlace fantasma (`.button.secondary`)
Texto marfil con una flecha → dorada, sin borde ni relleno. Al pasar el cursor se subraya y la flecha se mueve 4 px. Se usa para acciones secundarias como "Ver sucursales" o "Cerrar sesión". Los enlaces que abren otra pestaña, como Google Maps, usan ↗.

### Pieza de servicio
El precio en Anton 96 px dorado va en lugar de una foto. Abajo van el nombre (22 px marfil), la descripción (19 px plata) y la duración. No lleva fondo ni borde.

### Pieza de sucursal
De arriba abajo: número 01 a 03 en Anton 96 px dorado, mapa, nombre en 22 px, horario, dirección y barberos en plata, y dos enlaces: "Elegir esta sucursal →" y "Cómo llegar ↗".

### Mapa de sucursal
Mapa de Google Maps cuadrado, a todo el ancho de la pieza, sin borde ni filtros. Va en lugar de una foto y le da color a la vista. Se arma con la dirección del servidor y solo se carga al abrir la vista Sucursales. "Cómo llegar" abre la ruta en Google Maps y también sale en la confirmación de la cita.

### Rejilla irregular
Servicios y sucursales en tres columnas. La columna de en medio baja 78 px para que no se vea todo alineado, como en una revista. Con una sola columna ya no baja.

### Campos de formulario
Etiqueta en mayúsculas de 14 px en plata. Campo de 54 px de alto, fondo negro, texto marfil de 19 px y borde de 1 px en dorado oscuro. Al pasar el cursor o al enfocarlo, el borde se pone dorado. Las casillas son doradas. Los pasos 01, 02 y 03 son cuadros de 43 px con número en Anton dorado.

### Mensaje de error
Texto marfil con una barra roja de 4 px a la izquierda. El rojo nunca se usa como color de texto.

### Panel de resumen
Es de los pocos elementos con marco: borde de 1 px en dorado oscuro y 27 px de relleno. El servicio va en Anton 43 px y debajo van la sucursal, el barbero, la duración y el precio. En computadora se queda fijo al bajar.

### Indicadores del panel
Cifra en Anton 96 px dorado y etiqueta en plata con el cuadro de color del estado.

### Tabla de citas
Encabezados en dorado con una línea abajo. Las filas se separan con una línea delgada y no cambian de fondo. Las columnas son cliente, sucursal, barbero, servicio, fecha, hora y estado. El estado lleva su cuadro de color.

### Pie
"BARBER 920" en Anton 27 px marfil a la izquierda y los créditos en 14 px plata a la derecha.

## Hacer y no hacer

### Hacer
- Usar solo negro `#000000` para rellenar áreas. El logo va sobre ese mismo negro.
- Reservar Anton para titulares y cifras, y mantener el titular del hero a 153 px en escritorio.
- Usar el oro como único acento: antetítulos, cifras, bordes de acción, foco y enlace activo.
- Mostrar el rojo y el azul del poste solo en señales pequeñas (franja, cuadros de estado, barra de error) y siempre acompañados de texto.
- Separar secciones con 78 px de negro, no con líneas ni bandas.
- Mantener todas las esquinas a 0 px.
- Bajar la columna de en medio en servicios y sucursales.

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

No hay sombras ni capas transparentes. La diferencia entre elementos se logra con el tamaño de la letra (153 px contra 19 px) y con los pocos marcos de 1 px.

## Imágenes

El logo es la única imagen nuestra. Está en `web/assets/logo920.jpg` (512 × 512) y aparece en tres lugares: el menú, el título del inicio y el ícono de la pestaña. Su fondo es negro como la página, así que no necesita marco.

Los mapas de cada sucursal hacen el papel de fotos: cuadrados y sin marco. Si después agregamos fotos de cortes o sucursales, deben ser cuadradas o de 3:4, sin marco y sin esquinas redondeadas.

## Composición

La página ocupa todo el ancho con márgenes de 43 px. En el inicio va el título gigante y abajo los pasos (dos tercios) junto al texto y los botones (un tercio). Luego vienen los servicios y un bloque final con el mismo reparto. Las demás vistas empiezan con un título pequeño, el título grande y una línea en plata. En Reservar, el formulario ocupa dos tercios y el resumen uno. Abajo de 900 px todo va en una columna. Abajo de 700 px el margen baja a 18 px y el menú se esconde.

## Accesibilidad

- Texto principal y secundario muy por encima de 4.5:1 (marfil 19:1, oro 12:1, plata 10.7:1).
- Bordes de campos en oro antiguo (4.4:1), por encima del mínimo de 3:1 para componentes.
- El color de estado siempre va junto a su texto, y los errores se escriben en marfil con barra roja.
- Foco visible: contorno de 2 px en oro con separación de 3 px en todo elemento interactivo.
- `color-scheme: dark` para que los controles nativos (fecha, listas) se rendericen oscuros.
- Con `prefers-reduced-motion` se desactivan transiciones y desplazamiento suave.

## Guía rápida para implementar

Referencia rápida de color:
- texto: `#faf4d8`
- fondo: `#000000`
- acento: `#e9bf59` (oro)
- borde: `#8a6f34` (campos, marcos) o `#3e3217` (separadores)
- texto secundario: `#bab9b6`
- señales: `#9b201b` (rojo poste) y `#0a6cb5` (azul poste), nunca como texto
- acción principal: borde oro sin relleno. Al pasar el mouse se rellena de oro con texto negro

Ejemplos de instrucciones para componentes:

1. **Titular hero:** fondo `#000000`. Texto en Anton 153 px, peso 400, interlineado 1, color `#faf4d8`, alineado a la izquierda y a todo el ancho. Incluir el logo como glifo entre paréntesis a 0.78 em. Antetítulo encima en Inter 500, 14 px, mayúsculas, 0.18 em de espaciado, color `#e9bf59`.
2. **Navegación:** fondo `#000000`, sello del logo de 72 px a la izquierda y cuatro enlaces a la derecha en Inter 19 px `#faf4d8`, separados 27 px. Al pasar el mouse se subrayan con 1 px `#e9bf59` a 6 px de la línea base. El enlace activo va en `#e9bf59`.
3. **Pieza de servicio:** sin fondo ni borde. Precio en Anton 96 px `#e9bf59`, nombre en Inter 500 22 px `#faf4d8`, descripción en Inter 19 px `#bab9b6`, duración como etiqueta de 14 px en mayúsculas `#bab9b6`. En tres columnas con la de en medio bajada 78 px.
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
- El servidor solo entrega los archivos que están en la lista `staticPaths` de [server/index.js](server/index.js). Si agregas uno nuevo en `web/assets/`, ponlo ahí y su tipo en `contentTypes`.
