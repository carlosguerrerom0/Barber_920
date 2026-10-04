# Sistema Web de Agendamiento y Sucursales · Barber 920

Proyecto académico de la Universidad Autónoma de Ciudad Juárez para consultar sucursales, reservar horarios y administrar citas.

> **Demostración:** las direcciones fueron precisadas por el equipo y los horarios se basan en la entrevista. Servicios, precios, capacidad y reservas siguen siendo de prueba; no constituyen citas reales. Use datos ficticios, nunca información personal real.

## Estado al 3 de octubre de 2026

El cliente ya conocía el boceto inicial y no comunicó observaciones; el equipo dio por terminada esa propuesta visual. Aún faltaba la entrevista para obtener los datos reales. El avance del 29 de septiembre conectó las vistas con una API, SQLite y acceso al panel mediante contraseña. El 3 de octubre se entrevistó al dueño y se registraron datos y necesidades en una [minuta](docs/minuta-entrevista-cliente-2026-10-03.md). Después el equipo precisó las direcciones de las tres sucursales: están incorporadas junto con los horarios y la anticipación mínima. Quedan por completar los datos de SUC 3, servicios y disponibilidad por barbero, y por revisar la versión conectada con el cliente.

| Actividad | Estado | Evidencia |
|---|---|---|
| Requerimientos y diagramas iniciales | Documentados; datos reales pendientes | [Estado del boceto](docs/validacion-cliente-equipo.md) |
| Boceto, interfaz adaptable y flujo inicial | Terminados por el equipo; cliente enterado sin observaciones | [Interfaz](web/index.html) |
| API de disponibilidad y reservas | Implementada para demostración | [Servidor](server/index.js) |
| Persistencia y panel con sesión | Implementados para demostración | [Pruebas](test/server.test.js) |
| Entrevista de operación | Realizada y documentada; respuestas incompletas identificadas | [Minuta y evidencia](docs/minuta-entrevista-cliente-2026-10-03.md) |
| Completar catálogo, personal y reglas definitivas | En progreso; sedes y horarios incorporados | [Datos de demostración](docs/datos-simulados.md) |
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

- Consulta de tres sucursales informadas por el equipo y cuatro servicios simulados.
- Horarios disponibles calculados en el servidor, incluidos domingos y dos horas mínimas de anticipación.
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
- [Organización del equipo](CONTRIBUTING.md) · [Roles y asignaciones de Fase 2](docs/roles-fase2.md) · [FODA y Porter](docs/analisis-fase2.md)

El tablero de trabajo se lleva en [GitHub Issues](https://github.com/carlosguerrerom0/Barber_920/issues).
