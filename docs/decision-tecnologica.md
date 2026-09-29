# Selección tecnológica preliminar

**Fecha:** 1 de septiembre de 2026  
**Estado:** decisión inicial; implementación revisada el 29 de septiembre de 2026.

## Alternativas consideradas

| Capa | Alternativa 1 | Alternativa 2 | Decisión inicial |
|---|---|---|---|
| Interfaz | HTML, CSS y JavaScript | React | HTML, CSS y JavaScript |
| Backend | Node.js con Express | Python con Flask | Node.js con Express |
| Base de datos | SQLite | PostgreSQL | SQLite para desarrollo |
| Despliegue | GitHub Pages para prototipo | Servicio de aplicación completo | GitHub Pages para prototipo |

La versión conectada implementada utiliza **Node.js 24 con `node:http` y `node:sqlite`**, sin dependencias externas. Express se había propuesto inicialmente, pero para este avance local no fue necesario. GitHub Pages puede mostrar una versión estática, pero no puede ejecutar esta API ni la base de datos: el despliegue de la versión conectada sigue pendiente.

## Justificación

Para la primera versión se eligió HTML, CSS y JavaScript porque permite mostrar un avance navegable sin agregar complejidad innecesaria. El equipo puede validar primero el flujo de sucursales, reservación y administración.

La API ahora aplica reglas de negocio y SQLite permite desarrollar y demostrar el sistema con una configuración sencilla; un diseño de despliegue multiusuario deberá evaluarse cuando se valide el alcance.

## Arquitectura por etapas

### Etapa 1: prototipo funcional

- Interfaz adaptable.
- Navegación entre secciones.
- Formulario de reservación.
- Validación básica.
- Almacenamiento local únicamente para demostración.
- Panel administrativo simulado.

### Etapa 2: sistema conectado

- [x] API con Node.js.
- [x] Base de datos SQLite.
- [x] Autenticación administrativa para demostración local.
- [x] Disponibilidad calculada desde el servidor y validación de conflictos.
- [x] Pruebas automatizadas del flujo principal.
- [ ] Despliegue y revisión del avance conectado.

## Limitación importante

La nueva interfaz usa SQLite en el servidor. Los datos de sucursales, precios y horarios aún son simulados; no se deben utilizar datos personales reales en esta demostración.
