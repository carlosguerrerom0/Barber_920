# Requerimientos del sistema

**Estado:** validados por el cliente y el equipo para el alcance actual de la Fase 2.  
**Fecha de validación registrada:** 2 de septiembre de 2026.

Este documento define los requerimientos aceptados para el prototipo y orienta la siguiente etapa de desarrollo. Los datos operativos reales de sucursales y servicios se administran por separado en el Issue #5.

## Actores

| Actor | Descripción |
|---|---|
| Cliente | Persona que consulta sucursales, disponibilidad y registra una cita. |
| Administrador | Personal autorizado que consulta y administra reservaciones. |

## Requerimientos funcionales validados

| ID | Requerimiento | Prioridad | Estado |
|---|---|---|---|
| RF-01 | El sistema mostrará información general de Barber 920. | Media | Validado |
| RF-02 | El sistema mostrará las sucursales con su dirección, horario y medios de contacto. | Alta | Validado |
| RF-03 | El cliente podrá seleccionar una sucursal. | Alta | Validado |
| RF-04 | El sistema mostrará los servicios disponibles. | Alta | Validado |
| RF-05 | El cliente podrá seleccionar un servicio, una fecha y un horario disponible. | Alta | Validado |
| RF-06 | El sistema impedirá registrar dos citas incompatibles en el mismo horario. | Alta | Validado |
| RF-07 | El cliente podrá registrar una cita proporcionando nombre y teléfono. | Alta | Validado |
| RF-08 | El sistema mostrará una confirmación después de registrar la cita. | Alta | Validado |
| RF-09 | El administrador podrá consultar las reservaciones registradas. | Alta | Validado |
| RF-10 | El administrador podrá filtrar las reservaciones por fecha y sucursal. | Media | Validado |
| RF-11 | El administrador podrá actualizar el estado de una cita. | Media | Validado |
| RF-12 | El administrador podrá cancelar una reservación. | Media | Validado |

## Requerimientos no funcionales validados

| ID | Requerimiento | Comprobación | Estado |
|---|---|---|---|
| RNF-01 | La interfaz será adaptable a computadora y celular. | Probar las vistas en diferentes anchos de pantalla. | Validado |
| RNF-02 | La navegación utilizará textos claros y pasos sencillos. | Prueba de uso con usuarios y cliente. | Validado |
| RNF-03 | Los datos de administración requerirán acceso autorizado. | Intentar ingresar sin una sesión válida en la versión conectada. | Validado |
| RNF-04 | El sistema validará los datos obligatorios antes de registrar una cita. | Probar formularios incompletos o incorrectos. | Validado |
| RNF-05 | El sistema protegerá los datos personales recopilados. | Revisar permisos, exposición y almacenamiento. | Validado |
| RNF-06 | Las funciones principales responderán en un máximo de 3 segundos bajo condiciones normales. | Medir carga de vistas, consulta y registro. | Validado |
| RNF-07 | El código y la documentación permitirán realizar mantenimiento. | Revisar estructura, nombres y documentación. | Validado |
| RNF-08 | La interfaz considerará contraste, etiquetas y navegación comprensible. | Revisión básica de accesibilidad. | Validado |

## Información operativa pendiente

La aprobación del alcance no sustituye la recopilación de datos reales. Todavía deben confirmarse:

- Direcciones, teléfonos y horarios reales.
- Servicios, precios y duraciones reales.
- Nombres y disponibilidad de barberos, si se utilizarán.
- Reglas definitivas de cancelaciones, retardos y modificaciones.
- Días festivos, cierres y bloqueos.
- Material visual autorizado.

Estos pendientes se concentran en los Issues #1 y #5.

## Registro de aprobación

El usuario responsable del repositorio confirmó que el cliente y el equipo están de acuerdo con los requerimientos y prototipos existentes. La constancia del alcance aprobado está disponible en [validacion-cliente-equipo.md](validacion-cliente-equipo.md).
