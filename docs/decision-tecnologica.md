# Selección de tecnologías

**Decisión inicial:** 1 de septiembre de 2026. **Revisada:** 29 de septiembre de 2026, al implementar el servidor.

## Qué comparamos

| Capa | Opción 1 | Opción 2 | Lo que elegimos al inicio |
|---|---|---|---|
| Interfaz | HTML, CSS y JavaScript | React | HTML, CSS y JavaScript |
| Backend | Node.js con Express | Python con Flask | Node.js con Express |
| Base de datos | SQLite | PostgreSQL | SQLite para desarrollo |
| Publicación | GitHub Pages para el prototipo | Servicio que ejecute la aplicación completa | GitHub Pages para el prototipo |

Al final la versión conectada quedó con **Node.js 24, `node:http` y `node:sqlite`**, sin dependencias externas. Habíamos pensado en Express, pero para una demostración local no lo necesitamos. GitHub Pages solo sirve páginas estáticas, así que no puede ejecutar la API ni la base de datos; publicar la versión conectada sigue pendiente.

## Por qué

Empezamos con HTML, CSS y JavaScript porque nos permitía tener rápido una versión navegable sin complicarnos. Así pudimos revisar primero el flujo de sucursales, reservación y administración.

Ahora la API aplica las reglas del negocio y SQLite nos deja desarrollar y enseñar el sistema con muy poca configuración. Cuando el cliente valide el alcance, tendremos que pensar en una base de datos y un alojamiento para varios usuarios a la vez.

## Etapas

### Etapa 1: prototipo

- Interfaz adaptable.
- Navegación entre secciones.
- Formulario de reservación con validación básica.
- Datos guardados solo en el navegador, para demostrar.
- Panel administrativo simulado.

### Etapa 2: sistema conectado

- [x] API con Node.js.
- [x] Base de datos SQLite.
- [x] Acceso administrativo para la demostración local.
- [x] Disponibilidad calculada en el servidor y validación de choques de horario.
- [x] Pruebas automáticas del flujo principal.
- [ ] Publicación y revisión del avance conectado con el cliente.

## Una advertencia

Los servicios, los precios y la capacidad de la demostración siguen siendo de prueba. No uses datos personales reales al probarla.
