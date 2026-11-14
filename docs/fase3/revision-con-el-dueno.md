# Guía para la revisión con el dueño

Esta guía es para las actividades U y O. La idea es enseñarle a Miguel Solís la agenda por barbero, escuchar qué le cambiaría y pedirle los datos que faltan. Debe durar unos 30 minutos.

**Estado: terminada.** El 12 de noviembre de 2026 el cliente revisó la versión y firmó la entrega del proyecto. Con eso quedaron cerradas U y O. Esta guía se queda como la preparamos.

## Antes de la reunión

- **Fecha:** proponerle dos opciones de día y hora. Puede ser en la barbería o por videollamada.
- **Página:** dejar el servidor corriendo en una laptop y abrir la página también en un celular.
- **Citas:** borrar las citas de prueba viejas para que el panel se vea limpio.
- **Grabación:** preguntarle si podemos grabar, como en la entrevista del 3 de octubre.
- **Equipo:** Carlos enseña la página. Luis toma la minuta. Alison anota los datos.

## Qué le vamos a enseñar

1. **Inicio y sucursales:** las tres sucursales con su horario y el mapa.
2. **Reservar:** elegir sucursal, servicio y barbero. Enseñarle que un barbero no tiene horarios en su día de descanso.
3. **Sin preferencia:** reservar sin elegir barbero y ver a quién se le asigna.
4. **Confirmación:** el mensaje final con el nombre del barbero.
5. **Panel:** entrar con la contraseña, filtrar por barbero y cambiar el estado de una cita.

## Qué le vamos a preguntar

- ¿Se entiende cómo reservar? ¿Qué le quitaría o le agregaría?
- ¿Le sirve el panel así? ¿Quién lo usaría, él o cada barbero?
- ¿Cómo quiere que se vea el nombre de cada barbero?
- ¿Algo de lo que ve no es como trabaja la barbería?

## Datos que le vamos a pedir

| Dato | Para qué lo usamos | Actividad |
|---|---|---|
| Nombre de cada barbero y en qué sucursal trabaja | Cambiar los barberos de prueba | Q |
| Día de descanso de cada barbero | Quitar sus horarios ese día | Q |
| Precio y duración de ceja y diseños | Completar el catálogo | P |
| Colonia y código postal de SUC 3 | Completar la dirección | P |
| Con cuánto tiempo se puede cancelar o cambiar una cita | Regla de cancelación | O |
| Qué datos del cliente son obligatorios | Ajustar el formulario | O |

## Minuta para llenar ese día

Se llena solo con lo que pase en la reunión. Si algo no se dijo, se deja vacío.

```text
MINUTA No. ___
Revisión de la agenda por barbero con el dueño

Fecha:
Lugar o medio:
Convocada por: Equipo de trabajo
Propósito: Revisar la agenda por barbero y pedir los datos que faltan.
Participantes:

Puntos clave
1.
2.
3.

Observaciones del dueño
-

Datos que nos dio
-

Problemas
-

Líneas de acción
-
```

## Después de la reunión

- **Minuta:** subirla a `docs/fase3/` el mismo día.
- **Datos:** cargarlos en las listas `services` y `barbers` de `server/index.js` (actividades P y Q).
- **Cambios:** hacer lo que pida el dueño y repetir las pruebas con `npm test` (actividad V).
- **Seguimiento:** marcar U y O en el [Issue #18](https://github.com/carlosguerrerom0/Barber_920/issues/18).
