# Planificación de continuidad de Fase 2

**Corte: 4 de octubre de 2026.** Propuesta académica; no constituye aceptación del cliente.

## WBS y responsables

| WBS | Paquete | Responsable | Resultado |
|---|---|---|---|
| 1.1 | Seguimiento del tablero y acuerdos | Luis | Tablero y seguimiento |
| 1.2 | Minutas y reportes de la fase | Luis | 14 minutas y 7 reportes |
| 2.1 | Entrevista con el propietario | Carlos | Entrevista del 3 oct. (#1) |
| 2.2 | Requisitos y acuerdos completos | Alison | Lista de requisitos y pendientes (#2, #5) |
| 2.3 | Catálogo y datos de sucursales | Alison | Datos confirmados (#5) |
| 2.4 | Personal y reglas de disponibilidad | Dante | Reglas por barbero (#14) |
| 3.1 | Análisis FODA | Alison | FODA y estrategias (#12) |
| 3.2 | Cinco fuerzas de Porter | Alison | Análisis de las cinco fuerzas |
| 4.1 | Tiempos y red PERT | Jesús | TE, TMC, TML y holguras (#13) |
| 4.2 | Planificación y recursos | Jesús | Calendario, Project y costos |
| 5.1 | Modelo y arquitectura | Dante | Diagramas y decisión técnica (#3, #4, #9) |
| 5.2 | Demostración conectada | Jesús | API, SQLite y panel (#7) |
| 5.3 | Interfaz y sucursales | Carlos | Boceto, reserva, diseño y mapas (#6, #8, #10, #17) |
| 5.4 | Disponibilidad por barbero | Jesús | Adaptación de API y agenda (#14) |
| 6.1 | Pruebas integrales | Jesús | Resultados y defectos encontrados |
| 6.2 | Revisión con el cliente | Carlos | Observaciones del avance conectado (#11) |
| 6.3 | Corrección de observaciones | Carlos | Versión corregida y comprobada |
| 7.1 | Entrega documental de Fase 2 | Luis | Documento del 5 de octubre |
| 7.2 | Evidencia de la siguiente iteración | Luis | Capturas y resultados posteriores |

## Calendario y tiempos esperados

La entrevista A se realizó el 3 de octubre. Su TE original de 2 días se conserva como estimación histórica, no como duración medida. La red original A–J dura 15 jornadas. Este archivo programa solamente el trabajo restante B–J. B completa los datos que siguen pendientes tras la entrevista.

Archivo: [Barber_920_Plan_Project.xml](Barber_920_Plan_Project.xml). Importar y comprobar en Project/ProjectLibre antes de capturar evidencias. No se atribuye ejecución en la aplicación a la generación del XML.

Calendario propuesto: lunes a viernes, 18:30–20:30, America/Ciudad_Juarez. 120 minutos por día, 600 por semana, fines de semana no laborables. Evita lunes y miércoles 16:00–18:00. Fechas posteriores al corte, sujetas a datos y disponibilidad del cliente.

| Act. | WBS | Trabajo | Responsable | TE días | Anterior | Inicio | Fin | Horas | Costo MXN |
|---|---|---|---|---:|---|---|---|---:|---:|
| B | 2.2 | Completar acuerdos y datos | Alison Aguirre Hernández | 1 | A realizada | 2026-10-05 | 2026-10-05 | 2 | 160 |
| C | 2.3 | Completar catálogo y sucursales | Alison Aguirre Hernández | 2 | B | 2026-10-06 | 2026-10-07 | 4 | 320 |
| D | 2.4 | Definir personal y reglas | Dante Uriel Ramírez Márquez | 3 | B | 2026-10-06 | 2026-10-08 | 6 | 480 |
| E | 5.3 | Ajustar interfaz con datos confirmados | Carlos Guerrero Morales | 2 | C | 2026-10-08 | 2026-10-09 | 4 | 320 |
| F | 5.4 | Adaptar API y disponibilidad | Jesús Alberto González Martínez | 4 | D | 2026-10-09 | 2026-10-14 | 8 | 640 |
| G | 6.1 | Ejecutar pruebas integrales | Jesús Alberto González Martínez | 2 | E, F | 2026-10-15 | 2026-10-16 | 4 | 320 |
| H | 6.2 | Revisar versión con cliente y equipo | Carlos Guerrero Morales | 1 | G | 2026-10-19 | 2026-10-19 | 2 | 160 |
| I | 6.3 | Corregir observaciones | Carlos Guerrero Morales | 2 | H | 2026-10-20 | 2026-10-21 | 4 | 320 |
| J | 7.2 | Preparar evidencia de la iteración | Luis Uziel Cruz Martínez | 2 | G | 2026-10-19 | 2026-10-20 | 4 | 320 |

**Ruta crítica restante:** B–D–F–G–H–I, 13 jornadas, del 5 al 21 de octubre. Holguras: C y E, 3 jornadas; J, 1. La suma de duraciones es 19 jornadas y el esfuerzo 38 horas; no equivale a duración del proyecto. Un responsable por tarea, sin solapamientos individuales.

La entrega documental de Fase 2 sigue siendo el 5 de octubre. J reúne evidencia de la iteración posterior; no representa esa entrega. Recordatorios, cuentas de cliente, permisos ampliados y despliegue público requieren alcance y estimación adicionales.

## Recursos y costos

Tarifa académica supuesta uniforme de $80 MXN/h, no sueldo acordado ni pago real. Costo base: 38 h × $80 = $3,040. Reserva del 10 % por separado: $304. Presupuesto con reserva: $3,344. Project registra $3,040 para no duplicar la reserva. Equipo, internet y software disponibles: $0 de desembolso adicional previsto; no se afirma que carezcan de costo económico. No incluye licencias nuevas, alojamiento, dominio ni mensajería.

## Estado y evidencias

Los Issues #1–#17 estaban cerrados al corte del 4 de octubre, aunque varios conservan criterios sin verificar. No se infiere que sus funciones estén implementadas. El seguimiento de continuidad debe conservar los pendientes y adjuntar resultados verificables.

El commit 3e4192d incorpora logo, Anton/Inter, rediseño, mapas y Cómo llegar. Aún faltan verificación de marcadores, datos completos y perfiles; no prueba aceptación del cliente.

Evidencias pendientes: calendario y equivalencia de jornada; vista de tareas con TE, fechas, dependencias y responsables; resumen de 13 días/38 h/$3,040; hoja de recursos; costos por tarea; seguimiento de GitHub; sucursales y confirmación con mapas.

Abrir XML y comprobar: si la aplicación muestra 8 horas por día, cambiar la conversión a 2 horas antes de comparar duraciones. Mantener la jornada 18:30–20:30. Guardar el archivo nativo y tomar capturas reales. La coevaluación debe completarla cada integrante conforme al formato del profesor; no sustituirla por la tabla de responsables.
