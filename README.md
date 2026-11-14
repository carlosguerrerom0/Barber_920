# Barber 920 · Sistema web de citas y sucursales

Proyecto de la materia Administración y Evaluación de Proyectos de Tecnologías de Información (UACJ). Estamos construyendo una página para que los clientes de Barber 920 consulten sus tres sucursales y agenden una cita, y para que el negocio administre esas citas desde un panel.

> **Es una demostración.** Las direcciones y los horarios ya son los del negocio, pero los servicios, los precios y la capacidad todavía son de prueba. Las citas que se registren aquí no son reales: usa siempre datos inventados.

## Cómo vamos (4 de octubre de 2026)

Ya terminamos todas las actividades de la Fase 2; el documento se entrega el 5 de octubre.

- **1 y 2 de septiembre.** Documentamos los requisitos, los casos de uso y el modelo de datos, y armamos el boceto con una primera versión navegable. El cliente vio el boceto y no nos pidió cambios.
- **29 de septiembre.** Conectamos la página a un servidor en Node.js con base de datos SQLite y un panel de administración protegido con contraseña.
- **3 de octubre.** Entrevistamos al propietario, Miguel Solís. Con sus respuestas cargamos los horarios reales y, después, las direcciones de las sucursales ([minuta](docs/minuta-entrevista-cliente-2026-10-03.md)).
- **4 de octubre.** Estrenamos el diseño con el logo, las tipografías Anton e Inter y un mapa por sucursal con su enlace "Cómo llegar".

Para la siguiente fase queda lo que depende del negocio: la colonia y el código postal de SUC 3, el catálogo real de servicios, los barberos con sus descansos y, sobre todo, enseñarle al dueño la versión conectada para que nos dé su opinión. Lo propusimos del 5 al 21 de octubre en la [planificación](docs/planificacion-fase2-2026-10-04.md) y lo seguimos en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).

| Parte | Estado | Dónde verlo |
|---|---|---|
| Requisitos y diagramas | Hecho; las reglas que dependen del negocio pasan a la siguiente fase | [Requerimientos](docs/requerimientos.md) |
| Boceto e interfaz | Hecho; el cliente conoce el boceto | [Interfaz](web/index.html) · [Diseño](DESIGN.md) |
| API, SQLite y panel con sesión | Hecho (demostración local) | [Servidor](server/index.js) · [Pruebas](test/server.test.js) |
| Entrevista con el propietario | Hecho (3 de octubre) | [Minuta](docs/minuta-entrevista-cliente-2026-10-03.md) |
| Datos reales del negocio | Hecho: direcciones y horarios reales cargados; el catálogo y el personal pasan a la siguiente fase | [Datos de la demostración](docs/datos-simulados.md) |
| Planeación | Hecho: plan A–N; propuesta O–W para la siguiente fase | [Planificación](docs/planificacion-fase2-2026-10-04.md) |
| Revisión con el cliente y publicación | Siguiente fase | [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18) |

## Cómo correrlo en tu computadora

Necesitas Node.js 24 o más reciente. No hay paquetes que instalar.

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

En PowerShell:

```powershell
$env:BARBER_ADMIN_PASSWORD = 'una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

Después abre <http://127.0.0.1:3000>. Si ese puerto ya está ocupado, define otro con la variable `PORT` (por ejemplo, 3001).

La contraseña del panel se guarda la primera vez que se crea la base de datos, `data/barber.sqlite`. Ni ese archivo ni la contraseña se suben a GitHub. Para correr las pruebas automáticas usa `npm test`.

La página necesita el servidor: si abres `web/index.html` directo en el navegador, no vas a poder reservar. Por ahora el servidor solo escucha en tu computadora; todavía no lo publicamos en internet.

## Qué hace hoy

- Muestra las tres sucursales con su horario, su mapa y el enlace "Cómo llegar".
- Calcula en el servidor los horarios libres: de lunes a sábado de 10:00 a 19:00 y el domingo de 10:00 a 16:00, con al menos dos horas de anticipación.
- Guarda las citas en SQLite y no deja apartar un horario que ya está ocupado en la misma sucursal.
- Tiene un panel con contraseña para ver las citas, filtrarlas y cambiar su estado.
- Incluye pruebas automáticas de reservas, choques de horario, inicio de sesión, cancelación y persistencia.

## Documentos

- **Planeación:** [planificación de la Fase 2](docs/planificacion-fase2-2026-10-04.md) · [red PERT del 29 de septiembre](docs/pert-fase2-pendiente.md) · [roles](docs/roles-fase2.md) · [FODA y Porter](docs/analisis-fase2.md)
- **Cliente y requisitos:** [requerimientos](docs/requerimientos.md) · [guía de entrevista](docs/entrevista-cliente.md) · [minuta de la entrevista](docs/minuta-entrevista-cliente-2026-10-03.md) · [estado del boceto](docs/validacion-cliente-equipo.md) · [avance del 29 de septiembre](docs/avance-2026-09-29.md)
- **Diseño técnico:** [arquitectura](docs/arquitectura-preliminar.md) · [decisión tecnológica](docs/decision-tecnologica.md) · [casos de uso](docs/diagramas/casos-de-uso.md) · [modelo de datos](docs/diagramas/modelo-entidad-relacion.md) · [datos de la demostración](docs/datos-simulados.md)
- **Equipo:** [forma de trabajo](CONTRIBUTING.md)

## Equipo

| Integrante | GitHub | Rol |
|---|---|---|
| Luis Uziel Cruz Martínez | — | Líder y enlace con el cliente |
| Alison Aguirre Hernández | [@AH-afk3](https://github.com/AH-afk3) | Análisis e interfaz inicial |
| Carlos Guerrero Morales | [@carlosguerrerom0](https://github.com/carlosguerrerom0) | Diseño y revisión del flujo |
| Dante Uriel Ramírez Márquez | [@Danterm2003](https://github.com/Danterm2003) | Requisitos y arquitectura |
| Jesús Alberto González Martínez | [@jesus453](https://github.com/jesus453) | Servidor, pruebas y PERT |

Profesor: Abraham López Nájera. El trabajo del equipo se lleva en [GitHub Issues](https://github.com/carlosguerrerom0/Barber_920/issues).
