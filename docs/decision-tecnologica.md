# Tecnologías

**Decisión inicial:** 1 de septiembre de 2026. **Revisada:** 29 de septiembre de 2026, cuando hicimos el servidor.

## Qué comparamos

| Parte | Opción 1 | Opción 2 | Lo que elegimos al inicio |
|---|---|---|---|
| Interfaz | HTML, CSS y JavaScript | React | HTML, CSS y JavaScript |
| Servidor | Node.js con Express | Python con Flask | Node.js con Express |
| Base de datos | SQLite | PostgreSQL | SQLite para desarrollo |
| Publicación | GitHub Pages | Un servicio que corra la aplicación completa | GitHub Pages |

Al final usamos **Node.js 24 con `node:http` y `node:sqlite`**, sin paquetes externos. Express no hizo falta para una versión local. GitHub Pages solo sirve páginas estáticas y no puede correr la base de datos, así que la publicación queda para después.

## Por qué

Empezamos con HTML, CSS y JavaScript para tener rápido una versión que se pudiera navegar. Así revisamos primero cómo se ven las sucursales, la reservación y el panel.

Ahora el servidor aplica las reglas del negocio y SQLite funciona casi sin configuración. Cuando el dueño apruebe el sistema, habrá que elegir una base de datos y un alojamiento para varios usuarios.

## Etapas

### Etapa 1: prototipo

- Interfaz adaptable al celular.
- Navegación entre secciones.
- Formulario de reservación con validaciones básicas.
- Datos guardados solo en el navegador.
- Panel de prueba.

### Etapa 2: sistema conectado

- [x] Servidor con Node.js.
- [x] Base de datos SQLite.
- [x] Acceso con contraseña al panel.
- [x] Horarios libres calculados en el servidor.
- [x] Pruebas automáticas.
- [x] Agenda por barbero (8 de noviembre).
- [x] Administrador y alta de barberos desde el panel (9 de noviembre).
- [x] Revisión con el dueño. El cliente firmó la entrega el 12 de noviembre.

La publicación en internet no entró en la entrega. La página corre en local. Es un prototipo escolar, así que no uses datos personales reales.
