# Barber 920 · Sistema web de citas y sucursales

Proyecto de la materia Administración y Evaluación de Proyectos de Tecnologías de Información (UACJ). Es una página para que los clientes de Barber 920 vean sus tres sucursales y agenden una cita, y para que el negocio administre esas citas desde un panel.

> **Es un prototipo.** Las direcciones, los horarios y los precios de tres servicios son los del negocio. Los barberos y las citas son de prueba, así que usa siempre datos inventados.

## Cómo vamos (8 de noviembre de 2026)

- **Fase 1:** elegimos a Barber 920, definimos la idea y formalizamos el inicio el 13 de agosto.
- **Fase 2:** del 18 de agosto al 3 de octubre hicimos los requisitos, el boceto, el servidor con base de datos, el panel y la entrevista con el dueño.
- **Fase 3:** el 8 de noviembre agregamos la agenda por barbero. Ahora el cliente elige barbero, cada barbero tiene su día de descanso y el panel filtra por barbero. También cargamos los precios que nos dio el dueño y corrimos las pruebas.

Lo que sigue es enseñarle esta versión al dueño y pedirle los nombres de sus barberos, sus descansos y el resto del catálogo. Todo eso está en la [planificación de la Fase 3](docs/fase3/planificacion-fase3.md) y en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).

| Parte | Estado | Dónde verlo |
|---|---|---|
| Requisitos y diagramas | Hechos | [Requerimientos](docs/requerimientos.md) |
| Boceto e interfaz | Hechos | [Interfaz](web/index.html) · [Diseño](DESIGN.md) |
| Servidor, base de datos y panel | Hechos | [Servidor](server/index.js) · [Pruebas](test/server.test.js) |
| Entrevista con el dueño | Hecha el 3 de octubre | [Minuta](docs/minuta-entrevista-cliente-2026-10-03.md) |
| Agenda por barbero | Hecha el 8 de noviembre, con barberos de prueba | [Pruebas de la Fase 3](docs/fase3/pruebas-integrales.md) |
| Revisión con el dueño | Pendiente | [Guía de la revisión](docs/fase3/revision-con-el-dueno.md) |

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

La contraseña del panel se guarda la primera vez que se crea la base de datos, `data/barber.sqlite`. Ese archivo no se sube a GitHub. Las pruebas se corren con `npm test`.

La página necesita el servidor. Si abres `web/index.html` directo, no vas a poder reservar.

## Qué hace hoy

- **Sucursales:** muestra las tres con su horario, su mapa y el enlace "Cómo llegar".
- **Barberos:** cada sucursal tiene dos barberos de prueba, cada uno con su día de descanso.
- **Horarios:** calcula los horarios libres de cada barbero cada 30 minutos. Abre de lunes a sábado de 10:00 a 19:00 y el domingo de 10:00 a 16:00, y pide dos horas de anticipación.
- **Reservas:** guarda las citas en SQLite y no deja apartar a un barbero que ya está ocupado. Con "Sin preferencia" se asigna el primero que esté libre.
- **Panel:** con contraseña, deja ver las citas, filtrarlas por sucursal, barbero y fecha, y cambiarles el estado.
- **Pruebas:** revisan reservas, choques de horario, descansos, inicio de sesión, cancelación y que los datos se guarden.

## Documentos

- **Fase 3:** [planificación](docs/fase3/planificacion-fase3.md) · [pruebas integrales](docs/fase3/pruebas-integrales.md) · [riesgos y Pareto](docs/fase3/riesgos.md) · [guía de la revisión con el dueño](docs/fase3/revision-con-el-dueno.md)
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
