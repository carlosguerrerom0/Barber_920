# Requerimientos del sistema

**Registro inicial:** 2 de septiembre de 2026. **Actualizado:** 4 de octubre de 2026, con lo que nos dijo el propietario en la entrevista.

Aquí está el alcance del sistema: lo que definimos al principio y lo que agregamos después de hablar con el dueño. Las respuestas completas de la entrevista, con los minutos del video de donde salen, están en la [minuta](minuta-entrevista-cliente-2026-10-03.md). Varias reglas todavía dependen de datos que el negocio nos tiene que mandar; esos datos los seguimos en la propuesta para la siguiente fase y en el Issue #18.

## Actores

| Actor | Descripción |
|---|---|
| Cliente | Persona que consulta las sucursales y la disponibilidad, y registra una cita. |
| Administrador | Personal autorizado que consulta y administra las reservaciones. |

## Requerimientos funcionales iniciales

| ID | Requerimiento | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El sistema mostrará información general de Barber 920. | Media | Documentado |
| RF-02 | El sistema mostrará las sucursales con su dirección, horario y medios de contacto. | Alta | Documentado |
| RF-03 | El cliente podrá seleccionar una sucursal. | Alta | Documentado |
| RF-04 | El sistema mostrará los servicios disponibles. | Alta | Documentado |
| RF-05 | El cliente podrá seleccionar un servicio, una fecha y un horario disponible. | Alta | Documentado |
| RF-06 | El sistema impedirá registrar dos citas incompatibles en el mismo horario. | Alta | Documentado |
| RF-07 | El cliente podrá registrar una cita con su nombre y teléfono. | Alta | Documentado |
| RF-08 | El sistema mostrará una confirmación después de registrar la cita. | Alta | Documentado |
| RF-09 | El administrador podrá consultar las reservaciones registradas. | Alta | Documentado |
| RF-10 | El administrador podrá filtrar las reservaciones por fecha y sucursal. | Media | Documentado |
| RF-11 | El administrador podrá actualizar el estado de una cita. | Media | Documentado |
| RF-12 | El administrador podrá cancelar una reservación. | Media | Documentado |

## Requerimientos no funcionales iniciales

| ID | Requerimiento | Cómo lo comprobamos | Estado |
|---|---|---|---|
| RNF-01 | La interfaz se adaptará a computadora y celular. | Revisar las vistas en distintos anchos de pantalla. | Documentado |
| RNF-02 | La navegación usará textos claros y pasos sencillos. | Prueba de uso con usuarios y con el cliente. | Documentado |
| RNF-03 | La administración requerirá acceso autorizado. | Intentar entrar al panel sin una sesión válida. | Documentado |
| RNF-04 | El sistema validará los datos obligatorios antes de registrar una cita. | Enviar formularios incompletos o con errores. | Documentado |
| RNF-05 | El sistema protegerá los datos personales que recopile. | Revisar permisos, exposición y almacenamiento. | Documentado |
| RNF-06 | Las funciones principales responderán en máximo 3 segundos en condiciones normales. | Medir la carga de vistas, la consulta y el registro. | Documentado |
| RNF-07 | El código y la documentación facilitarán el mantenimiento. | Revisar estructura, nombres y documentación. | Documentado |
| RNF-08 | La interfaz cuidará el contraste, las etiquetas y una navegación comprensible. | Revisión básica de accesibilidad. | Documentado |

## Lo que agregamos después de la entrevista (3 de octubre)

Estas necesidades entraron al backlog. Las que dependen de datos que todavía no tenemos no están listas para usarse con clientes reales.

| ID | Necesidad | Estado |
|---|---|---|
| RF-13 | Elegir barbero y ver su disponibilidad, respetando su día de descanso. | Falta saber nombres, sucursales y descansos |
| RF-14 | Pedir al menos dos horas de anticipación para reservar. | Ya funciona en la demo; falta la revisión integral |
| RF-15 | Mostrar el horario de lunes a sábado de 10:00 a 19:00 y domingo de 10:00 a 16:00 en las tres sedes. | Ya aparece en la demo; falta confirmar la última hora para reservar |
| RF-16 | Reservar como invitado y, si se define, también con cuenta de cliente. | Falta definir los datos y el flujo de la cuenta |
| RF-17 | Enviar confirmaciones y recordatorios al cliente y al negocio. | Falta definir el canal, los datos de contacto y el momento |
| RF-18 | Que el cliente pueda cambiar o cancelar su cita con anticipación. | Falta el plazo exacto |
| RF-19 | Que el personal acepte o rechace citas y administre precios y horarios según sus permisos. | Falta definir roles y flujo |
| RF-20 | Generar resúmenes diarios, semanales y mensuales. | Falta definir qué medir |
| RF-21 | Mostrar mapas, la experiencia de los barberos y contemplar calificaciones. | Los mapas y "Cómo llegar" ya están en la demo; faltan perfiles y calificaciones |

**Otra regla que mencionó el dueño:** hay cinco minutos de tolerancia y se recomienda llegar diez minutos antes. Falta definir cómo afecta eso al estado de la cita y a los turnos. Además, cuando preguntamos por citas simultáneas nos dijo que atienden unas 15 a 20 citas al día; con ese dato todavía no sabemos cuántas pueden atender al mismo tiempo.

## Datos que nos faltan

La entrevista nos dio las tres direcciones, los horarios generales y los precios de algunos servicios. Todavía tenemos que confirmar:

- La colonia y el código postal de SUC 3, los teléfonos, que los mapas marquen el lugar correcto y la última hora para reservar.
- El catálogo completo, con precio y duración de ceja y diseños, y la duración exacta de la barba.
- Los barberos de cada sucursal, sus descansos y cuántas citas pueden atender al mismo tiempo.
- El plazo para cancelar o cambiar una cita y qué hacer cuando el cliente no llega.
- Los días festivos, los cierres y quién puede bloquear horarios.
- Los datos mínimos que pediremos al cliente, el canal de avisos y el material visual autorizado.

## Estado del boceto

El cliente conocía el boceto y no nos hizo comentarios, así que lo dimos por terminado. Eso no confirma las reglas de operación ni la versión conectada; el detalle está en [validacion-cliente-equipo.md](validacion-cliente-equipo.md).
