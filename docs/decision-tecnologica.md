# Selección tecnológica preliminar

**Fecha:** 1 de septiembre de 2026  
**Estado:** decisión del equipo para construir el primer avance; puede ajustarse al validar el alcance.

## Alternativas consideradas

| Capa | Alternativa 1 | Alternativa 2 | Decisión inicial |
|---|---|---|---|
| Interfaz | HTML, CSS y JavaScript | React | HTML, CSS y JavaScript |
| Backend | Node.js con Express | Python con Flask | Node.js con Express |
| Base de datos | SQLite | PostgreSQL | SQLite para desarrollo |
| Despliegue | GitHub Pages para prototipo | Servicio de aplicación completo | GitHub Pages para prototipo |

## Justificación

Para la primera versión se eligió HTML, CSS y JavaScript porque permite mostrar un avance navegable sin agregar complejidad innecesaria. El equipo puede validar primero el flujo de sucursales, reservación y administración.

En una etapa posterior se propone Node.js con Express para aplicar reglas de negocio y exponer una API. SQLite permite desarrollar y demostrar el sistema con una configuración sencilla; PostgreSQL sería una alternativa si se requiere un despliegue multiusuario.

## Arquitectura por etapas

### Etapa 1: prototipo funcional

- Interfaz adaptable.
- Navegación entre secciones.
- Formulario de reservación.
- Validación básica.
- Almacenamiento local únicamente para demostración.
- Panel administrativo simulado.

### Etapa 2: sistema conectado

- API con Node.js y Express.
- Base de datos.
- Autenticación administrativa.
- Disponibilidad calculada desde el servidor.
- Validaciones para impedir conflictos.
- Pruebas y despliegue.

## Limitación importante

`localStorage` se utilizará solamente en el prototipo. No es adecuado para guardar reservaciones reales porque los datos permanecen en el navegador del usuario y no se comparten entre dispositivos.
