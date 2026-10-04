# Requerimientos del sistema

**Estado:** requerimientos iniciales documentados el 2 de septiembre; entrevista operativa realizada el 3 de octubre. Las reglas y datos reales aún requieren confirmación y revisión en la versión conectada.
**Fecha del registro inicial:** 2 de septiembre de 2026.

Este documento define el alcance preliminar del prototipo y orienta la siguiente etapa de desarrollo. Los datos operativos reales de sucursales y servicios se administran por separado en el Issue #5.

La [minuta de entrevista](minuta-entrevista-cliente-2026-10-03.md) documenta las respuestas del dueño, sus fuentes y las dudas. El video no constituye una aceptación de la versión conectada.

## Actores

| Actor | Descripción |
|---|---|
| Cliente | Persona que consulta sucursales, disponibilidad y registra una cita. |
| Administrador | Personal autorizado que consulta y administra reservaciones. |

## Requerimientos funcionales iniciales

| ID | Requerimiento | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El sistema mostrará información general de Barber 920. | Media | Documentado |
| RF-02 | El sistema mostrará las sucursales con su dirección, horario y medios de contacto. | Alta | Documentado |
| RF-03 | El cliente podrá seleccionar una sucursal. | Alta | Documentado |
| RF-04 | El sistema mostrará los servicios disponibles. | Alta | Documentado |
| RF-05 | El cliente podrá seleccionar un servicio, una fecha y un horario disponible. | Alta | Documentado |
| RF-06 | El sistema impedirá registrar dos citas incompatibles en el mismo horario. | Alta | Documentado |
| RF-07 | El cliente podrá registrar una cita proporcionando nombre y teléfono. | Alta | Documentado |
| RF-08 | El sistema mostrará una confirmación después de registrar la cita. | Alta | Documentado |
| RF-09 | El administrador podrá consultar las reservaciones registradas. | Alta | Documentado |
| RF-10 | El administrador podrá filtrar las reservaciones por fecha y sucursal. | Media | Documentado |
| RF-11 | El administrador podrá actualizar el estado de una cita. | Media | Documentado |
| RF-12 | El administrador podrá cancelar una reservación. | Media | Documentado |

## Requerimientos no funcionales iniciales

| ID | Requerimiento | Comprobación | Estado |
|---|---|---|---|
| RNF-01 | La interfaz será adaptable a computadora y celular. | Probar las vistas en diferentes anchos de pantalla. | Documentado |
| RNF-02 | La navegación utilizará textos claros y pasos sencillos. | Prueba de uso con usuarios y cliente. | Documentado |
| RNF-03 | Los datos de administración requerirán acceso autorizado. | Intentar ingresar sin una sesión válida en la versión conectada. | Documentado |
| RNF-04 | El sistema validará los datos obligatorios antes de registrar una cita. | Probar formularios incompletos o incorrectos. | Documentado |
| RNF-05 | El sistema protegerá los datos personales recopilados. | Revisar permisos, exposición y almacenamiento. | Documentado |
| RNF-06 | Las funciones principales responderán en un máximo de 3 segundos bajo condiciones normales. | Medir carga de vistas, consulta y registro. | Documentado |
| RNF-07 | El código y la documentación permitirán realizar mantenimiento. | Revisar estructura, nombres y documentación. | Documentado |
| RNF-08 | La interfaz considerará contraste, etiquetas y navegación comprensible. | Revisión básica de accesibilidad. | Documentado |

## Información operativa pendiente

La entrevista aportó tres direcciones, horarios generales y precios de algunos servicios. Todavía deben confirmarse:

- Escritura completa de direcciones, teléfonos, mapas y hora de última cita.
- Catálogo completo, precio y duración de ceja y diseños, y duración de barba.
- Barberos por sucursal, descansos y capacidad de citas simultáneas.
- Plazo exacto para cancelar o modificar y procedimiento de inasistencia.
- Días festivos, cierres y permisos para bloquear horarios.
- Datos personales mínimos, canal de avisos y material visual autorizado.

Estos datos pendientes se concentran en el Issue #5 y las nuevas funciones se desglosan en el tablero.

## Necesidades registradas en la entrevista del 3 de octubre

Estas necesidades se agregan al backlog para análisis e implementación. Las reglas que dependen de datos faltantes no se consideran listas para producción.

| ID | Necesidad registrada | Estado |
|---|---|---|
| RF-13 | Permitir seleccionar barbero y consultar su disponibilidad, respetando su día de descanso. | Pendiente de nombres, sucursales y descansos |
| RF-14 | Aplicar un mínimo de dos horas entre la reserva y el inicio de la cita. | Implementado en demo; pendiente de revisión integral |
| RF-15 | Mostrar horarios de lunes a sábado 10:00–19:00 y domingo 10:00–16:00 para las tres sedes. | Mostrado en demo; confirmar último horario reservable |
| RF-16 | Permitir reservación como invitado y, si se define su alcance, mediante cuenta de cliente. | Pendiente de definir datos y flujo de cuenta |
| RF-17 | Enviar confirmaciones y recordatorios a cliente y negocio. | Pendiente de canal, datos de contacto y momento |
| RF-18 | Permitir al cliente modificar o cancelar con anticipación. | Pendiente de plazo exacto |
| RF-19 | Permitir al personal aceptar o rechazar citas y administrar precios y horarios según permisos. | Pendiente de roles y flujo |
| RF-20 | Generar resúmenes diarios, semanales y mensuales. | Pendiente de métricas |
| RF-21 | Mostrar mapa, experiencia de barberos y contemplar calificaciones. | Pendiente de contenido y reglas de valoración |

**Regla operativa adicional:** tolerancia de cinco minutos y recomendación de llegar diez minutos antes. Su efecto exacto sobre estados y reasignación de turnos requiere confirmación. La respuesta de “15–20 citas al día” no permite inferir capacidad simultánea.

## Estado del boceto

El cliente conocía el boceto y no comunicó observaciones. El equipo dio por terminada esa propuesta inicial; seguía pendiente la entrevista para obtener datos reales. El detalle está en [validacion-cliente-equipo.md](validacion-cliente-equipo.md). La ausencia de comentarios no confirma las reglas operativas ni la versión conectada.
