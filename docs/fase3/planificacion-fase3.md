# Planificación de la Fase 3

**Actualizado el 8 de noviembre de 2026.**

Aquí está cómo van las actividades O a W que propusimos al cerrar la Fase 2, cómo cambió el calendario y cuánto cuesta el proyecto. Los costos usan la misma tarifa supuesta de $80 MXN por hora. Sirven para medir el esfuerzo, no son pagos ni cobros.

## Cómo van las actividades O a W

| ID | Actividad | Responsable en el plan | TE (jornadas) | Fechas del plan | Estado al 8 de noviembre | Evidencia |
|---|---|---|---:|---|---|---|
| O | Completar acuerdos y datos | Alison | 1 | 5 oct. | Pendiente. Depende del dueño | [Guía de la revisión](revision-con-el-dueno.md) |
| P | Completar catálogo y sucursales | Alison | 2 | 6 y 7 oct. | En parte. Ya están los tres precios de la entrevista | [Servidor](../../server/index.js) |
| Q | Definir personal y reglas | Dante | 3 | 6 al 8 oct. | En parte. Las reglas funcionan con barberos de prueba | [Servidor](../../server/index.js) |
| R | Ajustar interfaz con datos confirmados | Carlos | 2 | 8 y 9 oct. | Hecha el 8 de noviembre | [Capturas](evidencias/) |
| S | Adaptar API y disponibilidad | Jesús | 4 | 9 al 14 oct. | Hecha el 8 de noviembre | [Servidor](../../server/index.js) |
| T | Ejecutar pruebas integrales | Jesús | 2 | 15 y 16 oct. | Hecha el 8 de noviembre. Pasan 4 de 4 | [Pruebas](pruebas-integrales.md) |
| U | Revisar versión con cliente y equipo | Carlos | 1 | 19 oct. | Pendiente | [Guía de la revisión](revision-con-el-dueno.md) |
| V | Corregir observaciones | Carlos | 2 | 20 y 21 oct. | Pendiente. Depende de U | — |
| W | Preparar evidencia de la iteración | Luis | 2 | 19 y 20 oct. | Hecha el 8 de noviembre | [Capturas](evidencias/) |

Carlos hizo R, S, T y W el 8 de noviembre con ayuda de Claude, un asistente de IA de Anthropic. Todo quedó en la rama `feature/fase3-agenda-barberos`.

Esto es lo que cambió en el sistema:

- **Barberos:** cada sucursal tiene dos barberos de prueba y cada uno descansa un día. El cliente puede elegir uno o dejar "Sin preferencia".
- **Horarios:** ahora se calculan por barbero. Un barbero ocupado ya no bloquea a su compañero.
- **Servicios:** quedaron los tres que nos dio el dueño: corte natural ($120, 20 min), desvanecido ($180, 30 min) y barba ($100, 20 min).
- **Citas viejas:** las que se guardaron antes no tienen barbero. Siguen apartando su horario para que nadie se empalme.
- **Panel:** muestra el barbero de cada cita y deja filtrar por barbero.

Lo que falta depende del dueño: los nombres de los barberos y su día de descanso, el precio y la duración de ceja y diseños, la colonia y el código postal de SUC 3 y su opinión sobre esta versión. Cuando nos dé los datos, solo hay que cambiar las listas `services` y `barbers` en `server/index.js`.

## Cambios al calendario

- **Fechas:** el plan ponía O a W del 5 al 21 de octubre. No se cumplió. Entre el 5 de octubre y el 7 de noviembre no subimos cambios al repositorio.
- **Orden:** hicimos R, S y T antes que O, P y Q. Usamos barberos de prueba para no esperar los datos del dueño.
- **Recursos:** no cambiaron. Somos los mismos cinco y usamos las computadoras e internet que ya teníamos.
- **Costos:** no cambiaron. No gastamos nada.

Este es el nuevo orden para lo que falta. Sigue el mismo calendario de dos horas por jornada. La fecha de la reunión la tenemos que acordar con el dueño.

| Paso | Actividades | Jornadas | Cuándo |
|---|---|---:|---|
| 1 | U y O: revisar la versión con el dueño y pedirle los datos | 1 | Día de la reunión |
| 2 | P y Q: cargar el catálogo, SUC 3 y los barberos reales | 3 | Después de la reunión |
| 3 | V: corregir lo que pida el dueño y repetir las pruebas | 2 | Después del paso 2 |

Con esto faltan unas seis jornadas a partir de la reunión. La ruta crítica queda O–Q–V, porque Q necesita los datos que se piden en O. U se hace en la misma reunión que O.

## Costos

**Gasto real: $0 MXN.** No compramos nada ni contratamos servicios. La página corre en nuestras computadoras.

Este es el valor estimado del trabajo con la tarifa supuesta de $80 MXN por hora:

| Fase | Actividades | Horas | Costo base | Reserva del 10 % | Total |
|---|---|---:|---:|---:|---:|
| Fase 2 | A a N | 64 | $5,120 | $512 | $5,632 |
| Fase 3 | O a W | 38 | $3,040 | $304 | $3,344 |
| **Total** | | **102** | **$8,160** | **$816** | **$8,976** |

Las horas de la Fase 3 son las del plan: O 2, P 4, Q 6, R 4, S 8, T 4, U 2, V 4 y W 4. Según el plan, R, S, T y W valen 20 horas ($1,600). No medimos las horas reales.

Hay costos que podrían aparecer si el negocio decide publicar la página: dominio, alojamiento y avisos por WhatsApp o correo. No los hemos cotizado y no entran en el total.

## Duración

- **Inicio:** 13 de agosto de 2026, cuando formalizamos el proyecto.
- **Fase 2:** del 18 de agosto al 3 de octubre. La ruta crítica duró 21 jornadas.
- **Fase 3 en el plan:** 13 jornadas, del 5 al 21 de octubre.
- **Hasta hoy:** del 13 de agosto al 8 de noviembre van 87 días.
- **Lo que falta:** unas seis jornadas a partir de la reunión con el dueño.

El seguimiento está en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).
