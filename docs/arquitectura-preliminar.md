# Arquitectura del avance de Fase 2

**Actualizada:** 3 de octubre de 2026. Parte de las reglas del negocio continúan pendientes de validación con Barber 920.

## Componentes implementados

1. **Interfaz:** HTML, CSS y JavaScript en `web/`.
2. **API y servidor de archivos:** Node.js 24, módulo `node:http` en `server/index.js`.
3. **Persistencia local:** SQLite mediante `node:sqlite`, con citas, cuenta administrativa y sesiones en `data/barber.sqlite`. El archivo no se versiona.
4. **Acceso:** contraseña administrativa con hash scrypt y sal; cookie de sesión HTTP-only, SameSite Strict; cierre de sesión y limitación básica de intentos.

El navegador consulta `/api/config` y `/api/availability`. Al reservar envía `POST /api/appointments`; el servidor valida datos, fecha y horario, y registra la cita en una transacción. El panel inicia sesión y consulta `/api/admin/appointments` para filtrar y modificar estados. Una cita cancelada libera su horario y no se reactiva.

El modelo de ocupación de la demostración admite **una cita simultánea por sucursal**. Los inicios comienzan cada hora desde las 10:00, de lunes a domingo, y se filtran según duración y cierre (lunes a sábado 19:00, domingo 16:00), zona `America/Ciudad_Juarez`. Para citas del mismo día se exigen dos horas de anticipación. La capacidad y disponibilidad por barbero siguen pendientes; el diagrama entidad-relación original incluye barberos y otras entidades futuras que aún no se implementan.

## Pendiente

- Completar información de la tercera sucursal y validar con el cliente el personal, servicios, precios, duración y reglas de cancelación.
- Sustituir datos simulados y ajustar modelo para capacidad real por barbero.
- Revisión del nuevo avance con cliente y equipo, pruebas de interfaz en distintos dispositivos y decisión de hospedaje seguro antes de usar datos reales.
- Confirmaciones y recordatorios, si se aprueban.

Consulte el [modelo preliminar](diagramas/modelo-entidad-relacion.md) y el [seguimiento](avance-2026-09-29.md).
