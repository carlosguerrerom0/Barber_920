# Barber 920 · Sistema web de citas y sucursales

Proyecto de la materia Administración y Evaluación de Proyectos de Tecnologías de Información (UACJ). Es una página para que los clientes de Barber 920 vean sus tres sucursales y agenden una cita, y para que el negocio administre esas citas desde un panel.

> **Es un prototipo escolar.** Las direcciones, los horarios y los precios son los del negocio. No trae registros de ejemplo: los barberos los da de alta el administrador desde el panel.

## Cómo quedó (13 de noviembre de 2026)

- **Fase 1:** elegimos a Barber 920, definimos la idea y formalizamos el inicio el 13 de agosto.
- **Fase 2:** del 18 de agosto al 3 de octubre hicimos los requisitos, el boceto, el servidor con base de datos, el panel y la entrevista con el dueño.
- **Fase 3:** el 8 de noviembre agregamos la agenda por barbero y cargamos los precios que nos dio el dueño. El 9 de noviembre agregamos el perfil de administrador de Junior Solis, que da de alta a los barberos, el resumen de citas del día, la semana y el mes, y el cambio de precios. El 11 de noviembre el cliente revisó la página y firmó la entrega. El 13 de noviembre publicamos el [video de entrega](https://www.youtube.com/watch?v=vJqg3n_dd30).

**El proyecto está terminado.** Las actividades O a W de la Fase 3 quedaron cerradas. El detalle está en la [planificación de la Fase 3](docs/fase3/planificacion-fase3.md) y en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).

| Parte | Estado | Dónde verlo |
|---|---|---|
| Requisitos y diagramas | Hechos | [Requerimientos](docs/requerimientos.md) |
| Boceto e interfaz | Hechos | [Interfaz](web/index.html) · [Diseño](DESIGN.md) |
| Servidor, base de datos y panel | Hechos | [Servidor](server/index.js) · [Pruebas](test/server.test.js) |
| Entrevista con el dueño | Hecha el 3 de octubre | [Minuta](docs/minuta-entrevista-cliente-2026-10-03.md) |
| Agenda por barbero | Hecha el 8 de noviembre | [Pruebas de la Fase 3](docs/fase3/pruebas-integrales.md) |
| Administrador y trabajadores | Hecho el 9 de noviembre | [Servidor](server/index.js) |
| Revisión y firma del cliente | Hecha el 11 de noviembre | [Guía de la revisión](docs/fase3/revision-con-el-dueno.md) |
| Video de entrega | Publicado el 13 de noviembre | [YouTube](https://www.youtube.com/watch?v=vJqg3n_dd30) |

## Cómo correrlo en tu computadora

Necesitas Node.js 24 o más reciente. No hay que instalar paquetes.

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

En PowerShell:

```powershell
$env:BARBER_ADMIN_PASSWORD = 'una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

Luego abre <http://127.0.0.1:3000>. Si el puerto está ocupado, usa otro con la variable `PORT`, por ejemplo 3001.

La primera vez que se crea la base de datos, `data/barber.sqlite`, se crea el perfil de administrador de **Junior Solis**. Su usuario es `junior` y su contraseña es la de `BARBER_ADMIN_PASSWORD`. Desde el panel, Junior da de alta a cada barbero con su usuario, su contraseña, su sucursal y su día de descanso. La base de datos no se sube a GitHub. Las pruebas se corren con `npm test`.

La página necesita el servidor. Si abres `web/index.html` directo, no vas a poder reservar.

## Qué hace hoy

- **Sucursales:** muestra las tres con su horario, su mapa y el enlace "Cómo llegar".
- **Barberos:** son los trabajadores que da de alta el administrador. Cada uno tiene su sucursal y su día de descanso. Si una sucursal no tiene barberos, la página lo avisa y no muestra horarios.
- **Horarios:** calcula los horarios libres de cada barbero cada 30 minutos. Abre de lunes a sábado de 10:00 a 19:00 y el domingo de 10:00 a 16:00, y pide dos horas de anticipación.
- **Reservas:** guarda las citas en SQLite y no deja apartar a un barbero que ya está ocupado. Con "Sin preferencia" se asigna el primero que esté libre.
- **Panel:** cada quien entra con su usuario. Todos ven las citas, las filtran por sucursal, barbero y fecha, y les cambian el estado. También ven cuántas citas hay hoy, esta semana y este mes. Solo el administrador da de alta o de baja a los barberos y cambia los precios.
- **Pruebas:** revisan reservas, choques de horario, descansos, inicio de sesión, permisos del administrador y de los trabajadores, cancelación, precios y que los datos se guarden.

## Documentos

- **Fase 3:** [planificación](docs/fase3/planificacion-fase3.md) · [pruebas integrales](docs/fase3/pruebas-integrales.md) · [riesgos y Pareto](docs/fase3/riesgos.md) · [guía de la revisión con el dueño](docs/fase3/revision-con-el-dueno.md) · [plan de desarrollo para Project](docs/Barber_920_Plan_Desarrollo.xml)
- **Fase 2:** [planificación](docs/planificacion-fase2-2026-10-04.md) · [red PERT del 29 de septiembre](docs/pert-fase2-pendiente.md) · [roles](docs/roles-fase2.md) · [FODA y Porter](docs/analisis-fase2.md)
- **Cliente y requisitos:** [requerimientos](docs/requerimientos.md) · [guía de entrevista](docs/entrevista-cliente.md) · [minuta de la entrevista](docs/minuta-entrevista-cliente-2026-10-03.md) · [estado del boceto](docs/validacion-cliente-equipo.md) · [avance del 29 de septiembre](docs/avance-2026-09-29.md)
- **Diseño técnico:** [arquitectura](docs/arquitectura-preliminar.md) · [tecnologías](docs/decision-tecnologica.md) · [casos de uso](docs/diagramas/casos-de-uso.md) · [modelo de datos](docs/diagramas/modelo-entidad-relacion.md) · [datos de prueba](docs/datos-simulados.md)
- **Equipo:** [forma de trabajo](CONTRIBUTING.md)

## Equipo

| Integrante | GitHub | Rol |
|---|---|---|
| Luis Uziel Cruz Martínez | — | Líder y enlace con el cliente |
| Alison Aguirre Hernández | [@AH-afk3](https://github.com/AH-afk3) | Análisis e interfaz inicial |
| Carlos Guerrero Morales | [@carlosguerrerom0](https://github.com/carlosguerrerom0) | Diseño y revisión del flujo |
| Dante Uriel Ramírez Márquez | [@Danterm2003](https://github.com/Danterm2003) | Requisitos y arquitectura |
| Jesús Alberto González Martínez | [@jesus453](https://github.com/jesus453) | Servidor, pruebas y PERT |

Profesor: Abraham López Nájera. El trabajo se lleva en [GitHub Issues](https://github.com/carlosguerrerom0/Barber_920/issues).
