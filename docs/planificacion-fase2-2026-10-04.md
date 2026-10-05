# Planificación de la Fase 2

**Actualizado el 4 de octubre de 2026.**

Aquí juntamos la planeación de la fase: cómo dividimos el trabajo (WBS), el plan que seguimos del 18 de agosto al 3 de octubre, con todas sus actividades terminadas, y nuestra propuesta para la siguiente fase. Los costos están calculados con una tarifa académica supuesta de $80 MXN por hora. Sirven para dimensionar el esfuerzo; no son pagos ni cobros al cliente.

## WBS y responsables

El número antes del punto es el grupo de trabajo y el de después, el paquete. Cada paquete tiene un responsable que le da seguimiento, aunque en varios colaboramos más personas. Los paquetes 2.4, 5.4, 6.1, 6.2, 6.3 y 7.2 corresponden a la siguiente fase, y 2.2, 2.3 y 5.3 continúan en ella con nuevas actividades.

| WBS | Paquete | Responsable | Resultado |
|---|---|---|---|
| 1.1 | Seguimiento del tablero y acuerdos | Luis | Tablero y seguimiento |
| 1.2 | Minutas y reportes de la fase | Luis | 14 minutas y 7 reportes |
| 2.1 | Entrevista con el propietario | Carlos | Entrevista del 3 oct. (#1) |
| 2.2 | Requisitos y acuerdos completos | Alison | Casos de uso, guía de entrevista y acuerdos pendientes (#3, #15) |
| 2.3 | Catálogo y datos de sucursales | Alison | Datos confirmados (#5) |
| 2.4 | Personal y reglas de disponibilidad | Dante | Reglas por barbero (#14) |
| 3.1 | Análisis FODA | Alison | FODA y estrategias (#12) |
| 3.2 | Cinco fuerzas de Porter | Alison | Análisis de las cinco fuerzas |
| 4.1 | Tiempos y red PERT | Jesús | TE, TMC, TML y holguras (#13) |
| 4.2 | Planificación y recursos | Jesús | Calendario, Project y costos |
| 5.1 | Modelo y arquitectura | Dante | Requisitos, diagramas y decisión técnica (#2, #4, #9) |
| 5.2 | Demostración conectada | Jesús | API, SQLite y panel (#7, #16) |
| 5.3 | Interfaz y sucursales | Carlos | Boceto, reserva, diseño y mapas (#6, #8, #17); versión navegable con Alison (#10) |
| 5.4 | Disponibilidad por barbero | Jesús | Adaptación de API y agenda (#14) |
| 6.1 | Pruebas integrales | Jesús | Resultados y defectos encontrados |
| 6.2 | Revisión con el cliente | Carlos | Observaciones del avance conectado (#11) |
| 6.3 | Corrección de observaciones | Carlos | Versión corregida y comprobada |
| 7.1 | Entrega documental de Fase 2 | Luis | Documento del 5 de octubre |
| 7.2 | Evidencia de la siguiente iteración | Luis | Capturas y resultados posteriores |

## Plan de la Fase 2: actividades A a N (18 de agosto al 3 de octubre)

Es el plan que presentamos en el documento de la Fase 2. Las catorce actividades siguen las reuniones de las minutas 5 a 18 y ya están terminadas. Archivo para Project o ProjectLibre: [Barber_920_Plan_Project.xml](Barber_920_Plan_Project.xml).

Trabajamos de lunes a viernes de 18:30 a 20:30, hora de Ciudad Juárez, para no chocar con la clase de los lunes y miércoles de 16:00 a 18:00. Cada jornada es de dos horas (120 minutos por día y 600 por semana). El sábado 3 de octubre lo marcamos como laborable porque ese día fue la entrevista.

| ID | WBS | Actividad | Responsable | TE (jornadas) | Anterior | Inicio | Fin | Horas | Costo MXN |
|---|---|---|---|---:|---|---|---|---:|---:|
| A | 1.1 | Organizar WBS y tablero en GitHub | Luis | 2 | — | 18 ago. | 19 ago. | 4 | 320 |
| B | 2.3 | Reunir datos de sucursales y servicios | Alison | 2 | A | 25 ago. | 26 ago. | 4 | 320 |
| C | 5.1 | Documentar requisitos, casos de uso y modelo | Dante | 4 | A | 27 ago. | 1 sep. | 8 | 640 |
| D | 5.3 | Cerrar boceto e interfaz inicial | Carlos | 1 | C | 2 sep. | 2 sep. | 2 | 160 |
| E | 1.1 | Revisar tablero y entregables cerrados | Luis | 2 | D | 3 sep. | 4 sep. | 4 | 320 |
| F | 2.2 | Preparar guía de entrevista | Alison | 2 | B, E | 7 sep. | 8 sep. | 4 | 320 |
| G | 5.2 | Plantear API, base de datos y acceso | Jesús | 2 | C | 14 sep. | 15 sep. | 4 | 320 |
| H | 5.2 | Implementar API, SQLite y sesión | Jesús | 5 | G | 16 sep. | 22 sep. | 10 | 800 |
| I | 5.2 | Probar el flujo principal | Jesús | 3 | H | 23 sep. | 25 sep. | 6 | 480 |
| J | 5.3 | Integrar interfaz con la API | Carlos | 2 | I | 28 sep. | 29 sep. | 4 | 320 |
| K | 4.1 | Calcular tiempos y red PERT | Jesús | 2 | I | 28 sep. | 29 sep. | 4 | 320 |
| L | 2.2 | Ordenar guía final de entrevista | Alison | 2 | F | 30 sep. | 1 oct. | 4 | 320 |
| M | 2.1 | Entrevista con el propietario | Carlos | 2 | J, K, L | 2 oct. | 3 oct. | 4 | 320 |
| N | 2.2 | Registrar direcciones de sucursales | Alison | 1 | M (fin a fin) | 3 oct. | 3 oct. | 2 | 160 |

La ruta crítica es **A–C–G–H–I–J–M–N** y dura 21 jornadas, o sea 42 horas de calendario. K corre en paralelo con J y también tiene holgura cero. B tiene 10 jornadas de holgura y D, E, F y L tienen 5. Si sumamos todas las actividades salen 32 jornadas y 64 horas de trabajo; el proyecto dura menos porque varias se hicieron al mismo tiempo. N va ligada a M fin a fin porque las direcciones se registraron el mismo día de la entrevista.

| Integrante | Actividades | Horas | Costo MXN |
|---|---|---:|---:|
| Luis Uziel Cruz Martínez | A, E | 8 | 640 |
| Alison Aguirre Hernández | B, F, L, N | 14 | 1,120 |
| Carlos Guerrero Morales | D, J, M | 10 | 800 |
| Dante Uriel Ramírez Márquez | C | 8 | 640 |
| Jesús Alberto González Martínez | G, H, I, K | 24 | 1,920 |
| **Total** | | **64** | **5,120** |

Con una reserva del 10 % ($512) el presupuesto estimado queda en $5,632 MXN. En la práctica no gastamos nada: usamos nuestras computadoras, nuestro internet y herramientas gratuitas.

## Propuesta para la siguiente fase: actividades O a W (5 al 21 de octubre)

Las actividades A a N de la Fase 2 quedaron terminadas el 3 de octubre. Para la siguiente fase proponemos completar los datos del negocio, ajustar la página y la API, probar todo y enseñarle la versión conectada al dueño. Las letras siguen después de la N para no repetirlas. Archivo: [Barber_920_Plan_Continuidad.xml](Barber_920_Plan_Continuidad.xml).

Este plan sale de la [red PERT que estimamos el 29 de septiembre](pert-fase2-pendiente.md). En esa red la entrevista era la actividad A y lo demás iba de la B a la J; aquí la O corresponde a la B, la P a la C, y así hasta la W, que era la J. Usamos el mismo calendario de dos horas diarias.

| ID | WBS | Actividad | Responsable | TE (jornadas) | Anterior | Inicio | Fin | Horas | Costo MXN |
|---|---|---|---|---:|---|---|---|---:|---:|
| O | 2.2 | Completar acuerdos y datos | Alison | 1 | M (plan A–N) | 5 oct. | 5 oct. | 2 | 160 |
| P | 2.3 | Completar catálogo y sucursales | Alison | 2 | O | 6 oct. | 7 oct. | 4 | 320 |
| Q | 2.4 | Definir personal y reglas | Dante | 3 | O | 6 oct. | 8 oct. | 6 | 480 |
| R | 5.3 | Ajustar interfaz con datos confirmados | Carlos | 2 | P | 8 oct. | 9 oct. | 4 | 320 |
| S | 5.4 | Adaptar API y disponibilidad | Jesús | 4 | Q | 9 oct. | 14 oct. | 8 | 640 |
| T | 6.1 | Ejecutar pruebas integrales | Jesús | 2 | R, S | 15 oct. | 16 oct. | 4 | 320 |
| U | 6.2 | Revisar versión con cliente y equipo | Carlos | 1 | T | 19 oct. | 19 oct. | 2 | 160 |
| V | 6.3 | Corregir observaciones | Carlos | 2 | U | 20 oct. | 21 oct. | 4 | 320 |
| W | 7.2 | Preparar evidencia de la iteración | Luis | 2 | T | 19 oct. | 20 oct. | 4 | 320 |

La ruta crítica propuesta es **O–Q–S–T–U–V** y dura 13 jornadas. P y R tienen 3 jornadas de holgura y W tiene 1. En total son 19 jornadas y 38 horas de trabajo, con un costo base de $3,040 MXN; con la reserva del 10 % ($304) quedan $3,344.

Las fechas dependen de que el negocio nos mande el catálogo y los datos del personal, y la revisión del 19 de octubre todavía hay que acordarla con el dueño. W junta la evidencia de la siguiente fase; la entrega documental de la Fase 2 es el 5 de octubre. Los recordatorios, las cuentas de cliente, los permisos por rol y la publicación en internet no entran en este plan: primero tenemos que definir su alcance (#15 y #16).

## Abrir los archivos en Project o ProjectLibre

1. Abre el XML desde el programa (Archivo → Abrir).
2. En las opciones de calendario del proyecto pon **2 horas por día y 10 por semana**. Si no, el programa cuenta días de 8 horas y verás duraciones como "0.5 días" en lugar de 2 jornadas.
3. Revisa que el proyecto use el calendario de 18:30 a 20:30. En el plan A–N, el sábado 3 de octubre debe aparecer como laborable; si no aparece, márcalo a mano en "Cambio de tiempo laborable". Sin ese día, M y N terminan el lunes 5 de octubre y el proyecto ya no cierra el 3.
4. Guarda el archivo en el formato del programa y toma las capturas desde ahí.

## Issues

Los Issues #1 a #17 los cerramos al terminar la Fase 2, el 4 de octubre. Cerrar un Issue significa que el equipo terminó esa tarea, no que el cliente ya la aprobó. Las actividades O a W de la siguiente fase las seguimos en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).

El rediseño y los mapas llegaron en el commit `3e4192d` del 4 de octubre. Falta confirmar con el negocio que cada mapa marque el lugar correcto y agregar los perfiles de los barberos cuando tengamos su información.
