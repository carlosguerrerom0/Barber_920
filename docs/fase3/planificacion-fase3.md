# Planificación de la Fase 3

**Actualizado el 13 de noviembre de 2026.**

Aquí está cómo quedaron las actividades O a W que propusimos al cerrar la Fase 2, cómo cambió el calendario y cuánto costó el proyecto. Los costos usan la misma tarifa supuesta de $80 MXN por hora. Sirven para medir el esfuerzo, no son pagos ni cobros.

**La Fase 3 quedó terminada el 12 de noviembre de 2026.** Ese día el cliente firmó la entrega del proyecto. También grabamos el video de entrega.

## Cómo quedaron las actividades O a W

| ID | Actividad | Responsable en el plan | TE (jornadas) | Fechas del plan | Estado | Evidencia |
|---|---|---|---:|---|---|---|
| O | Completar acuerdos y datos | Alison | 1 | 5 oct. | Terminada el 12 de noviembre. El cliente firmó la entrega | Firma del cliente · [Guía de la revisión](revision-con-el-dueno.md) |
| P | Completar catálogo y sucursales | Alison | 2 | 6 y 7 oct. | Terminada el 9 de noviembre. Están los precios de la entrevista y el administrador puede cambiarlos | [Servidor](../../server/index.js) |
| Q | Definir personal y reglas | Dante | 3 | 6 al 8 oct. | Terminada el 9 de noviembre. El administrador da de alta a cada barbero con su sucursal y su descanso | [Servidor](../../server/index.js) |
| R | Ajustar interfaz con datos confirmados | Carlos | 2 | 8 y 9 oct. | Terminada el 8 de noviembre | [Capturas](evidencias/) |
| S | Adaptar API y disponibilidad | Jesús | 4 | 9 al 14 oct. | Terminada el 8 de noviembre | [Servidor](../../server/index.js) |
| T | Ejecutar pruebas integrales | Jesús | 2 | 15 y 16 oct. | Terminada el 8 de noviembre. Pasan 5 de 5 | [Pruebas](pruebas-integrales.md) |
| U | Revisar versión con cliente y equipo | Carlos | 1 | 19 oct. | Terminada el 12 de noviembre. El cliente revisó la versión y la firmó | Firma del cliente |
| V | Corregir observaciones | Carlos | 2 | 20 y 21 oct. | Terminada el 12 de noviembre. Se cerró con la firma del cliente | Firma del cliente |
| W | Preparar evidencia de la iteración | Luis | 2 | 19 y 20 oct. | Terminada. Capturas del 8 de noviembre y video de entrega | [Capturas](evidencias/) · Video de entrega |

Carlos hizo R, S, T y W el 8 de noviembre con ayuda de Claude, un asistente de IA de Anthropic. P y Q se terminaron el 9 de noviembre. O, U y V se cerraron el 12 de noviembre con la firma del cliente.

Esto es lo que cambió en el sistema:

- **Barberos:** cada barbero tiene su sucursal y su día de descanso. El cliente puede elegir uno o dejar "Sin preferencia".
- **Horarios:** ahora se calculan por barbero. Un barbero ocupado ya no bloquea a su compañero.
- **Servicios:** quedaron los tres que nos dio el dueño: corte natural ($120, 20 min), desvanecido ($180, 30 min) y barba ($100, 20 min).
- **Citas viejas:** las que se guardaron antes no tienen barbero. Siguen apartando su horario para que nadie se empalme.
- **Panel:** muestra el barbero de cada cita y deja filtrar por barbero.
- **Datos de la entrevista (9 de noviembre):** la página ya dice que hay que llegar 10 minutos antes, que hay 5 minutos de tolerancia y que si no llegas se cancela la cita. También menciona ceja y diseños. El estado "Completada" ahora se llama "Realizada", como lo dijo el dueño.
- **Panel (9 de noviembre):** muestra cuántas citas hay hoy, esta semana y este mes, y deja cambiar los precios de los servicios. El dueño pidió las dos cosas en la entrevista.
- **Administrador (9 de noviembre):** Junior Solis entra con su usuario y da de alta o de baja a los barberos. Los barberos entran al panel a ver sus citas.

## Cambios al calendario

- **Fechas:** el plan ponía O a W del 5 al 21 de octubre. No se cumplió. Entre el 5 de octubre y el 7 de noviembre no subimos cambios al repositorio. Hicimos las actividades del 8 al 12 de noviembre.
- **Orden:** hicimos R, S y T antes que O, P y Q. Usamos barberos de prueba para no esperar los datos del dueño. Después cambiamos eso por el alta de barberos desde el panel.
- **Recursos:** no cambiaron. Somos los mismos cinco y usamos las computadoras e internet que ya teníamos.
- **Costos:** no cambiaron. No gastamos nada.

Así quedó el calendario real comparado con el plan:

| ID | Plan | Real |
|---|---|---|
| R, S, T y W | 8 al 20 de octubre | 8 de noviembre |
| P y Q | 6 al 8 de octubre | 8 y 9 de noviembre |
| O, U y V | 5, 19, 20 y 21 de octubre | 12 de noviembre |

La Fase 3 terminó 22 días después de lo que decía el plan (21 de octubre contra 12 de noviembre).

## Costos

**Gasto real: $0 MXN.** No compramos nada ni contratamos servicios. La página corre en nuestras computadoras.

Este es el valor estimado del trabajo con la tarifa supuesta de $80 MXN por hora:

| Fase | Actividades | Horas | Costo base | Reserva del 10 % | Total |
|---|---|---:|---:|---:|---:|
| Fase 2 | A a N | 64 | $5,120 | $512 | $5,632 |
| Fase 3 | O a W | 38 | $3,040 | $304 | $3,344 |
| **Total** | | **102** | **$8,160** | **$816** | **$8,976** |

Las horas de la Fase 3 son las del plan: O 2, P 4, Q 6, R 4, S 8, T 4, U 2, V 4 y W 4. Las nueve actividades están terminadas, así que se cuentan las 38 horas ($3,040). No medimos las horas reales.

Hay costos que podrían aparecer si el negocio decide publicar la página: dominio, alojamiento y avisos por WhatsApp o correo. No los hemos cotizado y no entran en el total.

## Duración

- **Inicio:** 13 de agosto de 2026, cuando formalizamos el proyecto.
- **Fase 2:** del 18 de agosto al 3 de octubre. La ruta crítica duró 21 jornadas.
- **Fase 3 en el plan:** 13 jornadas, del 5 al 21 de octubre.
- **Fase 3 real:** del 8 al 12 de noviembre.
- **Total:** del 13 de agosto al 12 de noviembre fueron 91 días.

El plan de Project con las fechas reales y la línea base del plan está en [Barber_920_Plan_Continuidad.xml](../Barber_920_Plan_Continuidad.xml). El seguimiento está en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).
