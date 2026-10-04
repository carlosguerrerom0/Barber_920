# Sistema Web de Agendamiento y Sucursales · Barber 920

Proyecto académico de la Universidad Autónoma de Ciudad Juárez para consultar sucursales, reservar horarios y administrar citas.

> **Demostración:** sucursales, servicios, precios y horarios son simulados. Las reservas se guardan en una base de datos local para probar el flujo; no constituyen citas reales. Use datos ficticios, nunca información personal real.

## Estado al 3 de octubre de 2026

La primera versión navegable y sus documentos fueron aprobados por el cliente y el equipo según el registro de validación de septiembre. El avance del 29 de septiembre conectó las vistas con una API, SQLite y acceso al panel mediante contraseña. El 3 de octubre se entrevistó al dueño y se registraron datos y necesidades en una [minuta](docs/minuta-entrevista-cliente-2026-10-03.md). El código aún usa datos y reglas simuladas: la sustitución requiere confirmar detalles pendientes y revisar la versión conectada con el cliente.

| Actividad | Estado | Evidencia |
|---|---|---|
| Requerimientos, diagramas y flujo del prototipo | Terminada, aprobada en la revisión anterior | [Registro de validación](docs/validacion-cliente-equipo.md) |
| Interfaz adaptable y navegación | Terminada en prototipo | [Interfaz](web/index.html) |
| API de disponibilidad y reservas | Implementada para demostración | [Servidor](server/index.js) |
| Persistencia y panel con sesión | Implementados para demostración | [Pruebas](test/server.test.js) |
| Entrevista de operación | Realizada y documentada; respuestas incompletas identificadas | [Minuta y evidencia](docs/minuta-entrevista-cliente-2026-10-03.md) |
| Sustituir datos simulados y validar reglas definitivas | Pendiente | [Datos simulados](docs/datos-simulados.md) |
| Revisión del avance conectado y despliegue | Pendiente | [Seguimiento de septiembre](docs/avance-2026-09-29.md) |

## Ejecutar en local

Requiere **Node.js 24 o posterior**. No hay dependencias de npm por instalar.

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

Abra [http://127.0.0.1:3000](http://127.0.0.1:3000). La contraseña se establece al crear la base de datos por primera vez. No la suba a GitHub. El archivo `data/barber.sqlite` queda excluido de Git. Para pruebas automatizadas: `npm test`.

El prototipo se sirve desde Node; abrir `web/index.html` directamente ya no permite reservar. La dirección de escucha predeterminada es local. `PORT` y `HOST` permiten cambiarla, aunque todavía no se ha preparado un despliegue público.

## Funciones disponibles

- Consulta de tres sucursales y cuatro servicios simulados.
- Horarios disponibles calculados en el servidor, sin domingos ni citas pasadas.
- Reserva persistente con validación y bloqueo de horarios ocupados por sucursal.
- Acceso de administrador con contraseña, sesión y cierre de sesión.
- Filtros, indicadores y cambios de estado de citas en el panel.
- Pruebas de creación, colisiones, acceso, cancelación y persistencia.

## Documentación

- [Seguimiento del 29 de septiembre](docs/avance-2026-09-29.md)
- [Minuta de entrevista del 3 de octubre](docs/minuta-entrevista-cliente-2026-10-03.md)
- [Red PERT propuesta para actividades pendientes](docs/pert-fase2-pendiente.md)
- [Requerimientos](docs/requerimientos.md) · [Validación anterior](docs/validacion-cliente-equipo.md)
- [Arquitectura](docs/arquitectura-preliminar.md) · [Decisión tecnológica](docs/decision-tecnologica.md)
- [Casos de uso](docs/diagramas/casos-de-uso.md) · [Modelo preliminar](docs/diagramas/modelo-entidad-relacion.md)
- [Guía de entrevista](docs/entrevista-cliente.md) · [Datos simulados](docs/datos-simulados.md)
- [Organización del equipo](CONTRIBUTING.md)

El tablero de trabajo se lleva en [GitHub Issues](https://github.com/carlosguerrerom0/Barber_920/issues).
