# Datos simulados para el prototipo

> **Aviso:** los servicios, precios, capacidad y reservas de la aplicación son de demostración. Las direcciones se basan en la corrección enviada por el equipo después de la entrevista; falta validar la versión conectada con el cliente.

**Actualización:** la [entrevista al dueño](minuta-entrevista-cliente-2026-10-03.md) registró horarios y precios de algunos servicios; después, el equipo precisó las direcciones. La aplicación muestra esas direcciones y horarios, y aplica dos horas mínimas de anticipación. Aún faltan catálogo completo, barberos, descansos, teléfonos, enlaces de mapa y capacidad simultánea.

## Sucursales mostradas en el prototipo

| Sucursal | Horario informado | Dirección facilitada por el equipo |
|---|---|---|
| SUC 1 | Lunes a sábado, 10:00–19:00; domingo, 10:00–16:00 | C. Durango 920, Morelos II, 32673 Juárez, Chih. |
| SUC 2 | Lunes a sábado, 10:00–19:00; domingo, 10:00–16:00 | Blvd. Zaragoza 104, Manuel Valdez, 32590 Juárez, Chih. |
| SUC 3 | Lunes a sábado, 10:00–19:00; domingo, 10:00–16:00 | Cerro del Crestón #6327; colonia y CP pendientes |

Los identificadores internos `centro`, `norte` y `oriente` se conservan para no invalidar las reservas ya almacenadas; las etiquetas públicas son SUC 1, 2 y 3. Los nombres geográficos de esos identificadores no describen ubicaciones confirmadas.

## Servicios simulados

| Servicio | Duración | Precio de demostración |
|---|---:|---:|
| Corte clásico | 45 minutos | $250 |
| Arreglo de barba | 30 minutos | $150 |
| Corte y barba | 60 minutos | $350 |
| Corte infantil | 40 minutos | $200 |

## Reglas simuladas

- Se ofrecen inicios cada hora desde las 10:00. La última opción depende de la duración del servicio y de la hora de cierre: 19:00 de lunes a sábado y 16:00 el domingo.
- Se exige una anticipación mínima de dos horas para reservar el mismo día.
- Para la demostración se acepta una cita por sucursal y horario.
- El cliente registra nombre y teléfono.
- Las citas nuevas comienzan con estado Pendiente.
- El administrador puede cambiar el estado.
- No se envían mensajes ni recordatorios reales.

Antes de usar el sistema con clientes, debe completarse la información pendiente y validarse el flujo conectado.
