# Datos de la demostración

> Las direcciones y los horarios ya son los del negocio. Los servicios, los precios, la capacidad y las citas son de prueba.

Después de la [entrevista con el dueño](minuta-entrevista-cliente-2026-10-03.md) cargamos los horarios reales y la regla de dos horas de anticipación, y el equipo precisó las direcciones de las sucursales. Todavía faltan el catálogo completo, los barberos, sus descansos, los teléfonos y cuántas citas se pueden atender al mismo tiempo. Mientras tanto, cada sucursal muestra la etiqueta "Por validar con el cliente".

## Sucursales

| Sucursal | Horario | Dirección |
|---|---|---|
| SUC 1 | Lunes a sábado, 10:00–19:00; domingo, 10:00–16:00 | C. Durango 920, Morelos II, 32673 Juárez, Chih. |
| SUC 2 | Lunes a sábado, 10:00–19:00; domingo, 10:00–16:00 | Blvd. Zaragoza 104, Manuel Valdez, 32590 Juárez, Chih. |
| SUC 3 | Lunes a sábado, 10:00–19:00; domingo, 10:00–16:00 | Cerro del Crestón #6327; falta colonia y código postal |

Dentro del código las sucursales se siguen llamando `centro`, `norte` y `oriente` para no romper las citas que ya estaban guardadas. En la página aparecen como Sucursal 1, 2 y 3; esos nombres internos no dicen nada de su ubicación real.

## Servicios de prueba

| Servicio | Duración | Precio de prueba |
|---|---:|---:|
| Corte clásico | 45 minutos | $250 |
| Arreglo de barba | 30 minutos | $150 |
| Corte y barba | 60 minutos | $350 |
| Corte infantil | 40 minutos | $200 |

Los precios reales que nos dio el dueño (corte natural $120, barba $100 y desvanecido $180) los cargaremos cuando tengamos el catálogo completo.

## Reglas de la demostración

- Los horarios empiezan cada hora desde las 10:00. El último depende de cuánto dura el servicio y de la hora de cierre: 19:00 de lunes a sábado y 16:00 el domingo.
- Para reservar el mismo día se necesitan al menos dos horas de anticipación.
- Cada sucursal acepta una cita por horario.
- El cliente deja su nombre y su teléfono.
- Las citas nuevas empiezan como Pendiente y el administrador puede cambiarles el estado.
- No se envían mensajes ni recordatorios reales.

Antes de usar el sistema con clientes hay que completar esta información y revisar el flujo conectado con el dueño.
