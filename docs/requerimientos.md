# Requerimientos del sistema

**Registro inicial:** 2 de septiembre de 2026. **Actualizado:** 9 de noviembre de 2026.

Aquí está lo que debe hacer el sistema. Primero lo que definimos al inicio y después lo que agregamos con la entrevista del 3 de octubre ([minuta](minuta-entrevista-cliente-2026-10-03.md)). Lo que depende de datos del negocio lo seguimos en el Issue #18.

## Actores

| Actor | Descripción |
|---|---|
| Cliente | Persona que consulta las sucursales y la disponibilidad, y registra una cita. |
| Administrador | Personal autorizado que consulta y administra las reservaciones. |

## Requerimientos funcionales iniciales

| ID | Requerimiento | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El sistema mostrará información general de Barber 920. | Media | Hecho |
| RF-02 | El sistema mostrará las sucursales con su dirección, horario y medios de contacto. | Alta | Hecho, sin teléfonos |
| RF-03 | El cliente podrá seleccionar una sucursal. | Alta | Hecho |
| RF-04 | El sistema mostrará los servicios disponibles. | Alta | Hecho |
| RF-05 | El cliente podrá seleccionar un servicio, una fecha y un horario disponible. | Alta | Hecho |
| RF-06 | El sistema impedirá registrar dos citas incompatibles en el mismo horario. | Alta | Hecho |
| RF-07 | El cliente podrá registrar una cita con su nombre y teléfono. | Alta | Hecho |
| RF-08 | El sistema mostrará una confirmación después de registrar la cita. | Alta | Hecho |
| RF-09 | El administrador podrá consultar las reservaciones registradas. | Alta | Hecho |
| RF-10 | El administrador podrá filtrar las reservaciones por fecha y sucursal. | Media | Hecho (también por barbero desde el 8 de noviembre) |
| RF-11 | El administrador podrá actualizar el estado de una cita. | Media | Hecho |
| RF-12 | El administrador podrá cancelar una reservación. | Media | Hecho |

## Requerimientos no funcionales iniciales

| ID | Requerimiento | Cómo lo comprobamos | Estado |
|---|---|---|---|
| RNF-01 | La interfaz se adaptará a computadora y celular. | Revisar las vistas en distintos anchos de pantalla. | Revisado el 8 de noviembre en computadora y celular |
| RNF-02 | La navegación usará textos claros y pasos sencillos. | Prueba de uso con usuarios y con el cliente. | Por revisar |
| RNF-03 | La administración requerirá acceso autorizado. | Intentar entrar al panel sin una sesión válida. | Probado |
| RNF-04 | El sistema validará los datos obligatorios antes de registrar una cita. | Enviar formularios incompletos o con errores. | Probado |
| RNF-05 | El sistema protegerá los datos personales que recopile. | Revisar permisos, exposición y almacenamiento. | Por revisar |
| RNF-06 | Las funciones principales responderán en máximo 3 segundos en condiciones normales. | Medir la carga de vistas, la consulta y el registro. | Por revisar |
| RNF-07 | El código y la documentación facilitarán el mantenimiento. | Revisar estructura, nombres y documentación. | Por revisar |
| RNF-08 | La interfaz cuidará el contraste, las etiquetas y una navegación comprensible. | Revisión básica de accesibilidad. | Por revisar |

## Lo que agregamos después de la entrevista

Estas necesidades salieron de la entrevista del 3 de octubre.

| ID | Necesidad | Estado |
|---|---|---|
| RF-13 | Elegir barbero y ver su disponibilidad, respetando su día de descanso. | Hecho el 8 de noviembre con barberos de prueba. Faltan los nombres y descansos reales |
| RF-14 | Pedir al menos dos horas de anticipación para reservar. | Hecho y probado |
| RF-15 | Mostrar el horario de lunes a sábado de 10:00 a 19:00 y domingo de 10:00 a 16:00 en las tres sucursales. | Hecho. Falta confirmar la última hora para reservar |
| RF-16 | Reservar como invitado y, si se decide, con cuenta de cliente. | Falta definir los datos y la cuenta |
| RF-17 | Mandar confirmaciones y recordatorios al cliente y al negocio. | Falta definir por dónde y cuándo |
| RF-18 | Que el cliente pueda cambiar o cancelar su cita con anticipación. | Falta el plazo. La página ya avisa la tolerancia de 5 minutos |
| RF-19 | Que el personal acepte o rechace citas y cambie precios y horarios. | En parte. Desde el 9 de noviembre el panel cambia el estado de las citas y los precios. Faltan los horarios |
| RF-20 | Hacer resúmenes diarios, semanales y mensuales. | Hecho el 9 de noviembre: el panel cuenta las citas de hoy, de la semana y del mes, sin las canceladas |
| RF-21 | Mostrar mapas, la experiencia de los barberos y calificaciones. | Los mapas ya están. Faltan perfiles y calificaciones |

El dueño también dijo que hay cinco minutos de tolerancia, que si el cliente no llega se cancela la cita y que prefieren que llegue diez minutos antes. Desde el 9 de noviembre la página lo avisa en el resumen y en la confirmación.

## Datos que nos faltan

- **Sucursal 3:** colonia y código postal. También los teléfonos de las tres y la última hora para reservar.
- **Catálogo:** precio y duración de ceja y diseños. La barba tarda de 15 a 20 minutos y en la página usamos 20.
- **Barberos:** nombres por sucursal y su día de descanso.
- **Cancelaciones:** el plazo y qué hacer cuando el cliente no llega.
- **Cierres:** en la entrevista dijo que no hay días de cierre especiales. Falta definir cómo se bloquean horarios. Según los apuntes, todos podrán hacerlo.
- **Cliente:** qué datos pedirle, por dónde avisarle y qué material visual podemos usar.
