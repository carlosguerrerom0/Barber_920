# Borrador de requerimientos

**Estado:** propuesta inicial pendiente de validación con el cliente.

Este documento convierte el alcance preliminar de la Fase 1 en requerimientos verificables. Los detalles marcados como pendientes deben resolverse durante la entrevista con el representante de Barber 920.

## Actores preliminares

| Actor | Descripción |
|---|---|
| Cliente | Persona que consulta sucursales, disponibilidad y registra una cita. |
| Administrador | Personal autorizado que consulta y administra reservaciones. |

## Requerimientos funcionales

| ID | Requerimiento | Prioridad inicial | Estado |
|---|---|---|---|
| RF-01 | El sistema mostrará información general de Barber 920. | Media | Propuesto |
| RF-02 | El sistema mostrará las sucursales con su dirección, horario y medios de contacto. | Alta | Propuesto |
| RF-03 | El cliente podrá seleccionar una sucursal. | Alta | Propuesto |
| RF-04 | El sistema mostrará los servicios disponibles. | Alta | Propuesto |
| RF-05 | El cliente podrá seleccionar un servicio, una fecha y un horario disponible. | Alta | Propuesto |
| RF-06 | El sistema impedirá registrar dos citas incompatibles en el mismo horario. | Alta | Propuesto |
| RF-07 | El cliente podrá registrar una cita proporcionando los datos requeridos. | Alta | Propuesto |
| RF-08 | El sistema mostrará una confirmación después de registrar la cita. | Alta | Propuesto |
| RF-09 | El administrador podrá consultar las reservaciones registradas. | Alta | Propuesto |
| RF-10 | El administrador podrá filtrar las reservaciones por fecha y sucursal. | Media | Propuesto |
| RF-11 | El administrador podrá actualizar el estado de una cita. | Media | Propuesto |
| RF-12 | El administrador podrá cancelar una reservación. | Media | Propuesto |

## Requerimientos no funcionales

| ID | Requerimiento | Comprobación preliminar | Estado |
|---|---|---|---|
| RNF-01 | La interfaz será adaptable a computadora y celular. | Probar las vistas en diferentes anchos de pantalla. | Propuesto |
| RNF-02 | La navegación utilizará textos claros y pasos sencillos. | Prueba de uso con usuarios y cliente. | Propuesto |
| RNF-03 | Los datos de administración requerirán acceso autorizado. | Intentar ingresar sin una sesión válida. | Propuesto |
| RNF-04 | El sistema validará los datos obligatorios antes de registrar una cita. | Probar formularios incompletos o incorrectos. | Propuesto |
| RNF-05 | El sistema protegerá los datos personales recopilados. | Revisar permisos, exposición de datos y almacenamiento. | Propuesto |
| RNF-06 | Las funciones principales tendrán tiempos de respuesta aceptables. | Definir y medir el límite con el cliente. | Pendiente de métrica |
| RNF-07 | El código y la documentación permitirán realizar mantenimiento. | Revisar estructura, nombres y documentación. | Propuesto |
| RNF-08 | La interfaz considerará contraste, etiquetas y navegación comprensible. | Revisión básica de accesibilidad. | Propuesto |

## Información pendiente de confirmar

- Direcciones, teléfonos y horarios de las tres sucursales.
- Servicios, precios y duración de cada servicio.
- Si el cliente seleccionará barbero o únicamente sucursal y horario.
- Datos obligatorios para realizar una reservación.
- Reglas para cancelaciones, retardos y modificaciones.
- Intervalos disponibles y tiempo entre citas.
- Forma de confirmar o recordar una cita.
- Cantidad y tipo de usuarios administrativos.
- Días festivos, cierres y bloqueos de horarios.
- Políticas para el tratamiento de datos personales.

## Criterio para aprobar este documento

El borrador se considerará validado cuando el cliente revise los requerimientos, indique correcciones y confirme mediante una minuta la versión aceptada.
