# Arquitectura del sistema

**Actualizada el 8 de noviembre de 2026.**

## Cómo está armado

1. **Interfaz:** HTML, CSS y JavaScript en `web/`. El logo y las fuentes están en `web/assets/`.
2. **Servidor:** Node.js 24 con `node:http`, en `server/index.js`. El mismo servidor entrega la página.
3. **Base de datos:** SQLite con `node:sqlite`. Guarda las citas, la cuenta del administrador y las sesiones en `data/barber.sqlite`, que no se sube al repositorio.
4. **Acceso al panel:** la contraseña se guarda cifrada con scrypt. La sesión usa una cookie protegida, se puede cerrar sesión y hay un límite de intentos.

## Cómo funciona una reserva

1. La página pide `/api/config` para cargar sucursales, servicios y barberos.
2. Con `/api/availability` pregunta qué horarios tiene libres el barbero elegido. Si el cliente elige "Sin preferencia", el servidor junta los horarios de todos los barberos de esa sucursal.
3. Al reservar se manda `POST /api/appointments`. El servidor revisa los datos y vuelve a confirmar que el horario siga libre antes de guardar. Así dos personas no apartan el mismo lugar.
4. El panel usa `/api/admin/appointments` para listar las citas y cambiarles el estado. Una cita cancelada libera su horario y ya no se puede reactivar.

## Reglas de horario

- **Por barbero:** cada barbero atiende una cita a la vez y no trabaja en su día de descanso.
- **Cada 30 minutos:** los horarios empiezan a las 10:00. Solo se ofrecen los que terminan antes del cierre, a las 19:00 de lunes a sábado y a las 16:00 el domingo.
- **Anticipación:** para citas del mismo día se piden dos horas.
- **Citas viejas:** las que se guardaron antes de la Fase 3 no tienen barbero. Esas bloquean su horario para todos los barberos de la sucursal.

La vista Sucursales muestra un mapa de Google Maps por sede. Es lo único de otro sitio que deja cargar la política de seguridad del servidor.

El modelo de datos completo está en el [diagrama entidad-relación](diagramas/modelo-entidad-relacion.md). Por ahora los barberos y los servicios viven en el código, no en tablas propias.

## Lo que falta

- **Datos reales:** nombres de los barberos, sus descansos, el catálogo completo y las reglas de cancelación.
- **Revisión:** enseñarle la versión al dueño y corregir lo que pida.
- **Publicación:** elegir un alojamiento seguro antes de recibir citas reales.
- **Avisos:** confirmaciones y recordatorios, si el negocio decide usarlos.
