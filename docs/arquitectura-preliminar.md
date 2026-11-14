# Arquitectura del sistema

**Actualizada el 4 de octubre de 2026.** Algunas reglas del negocio todavía están por confirmar con Barber 920.

## Cómo está armado

1. **Interfaz:** HTML, CSS y JavaScript en `web/`. El logo y las fuentes Anton e Inter se sirven desde `web/assets/`.
2. **Servidor y API:** Node.js 24 con el módulo `node:http`, en `server/index.js`. El mismo servidor entrega los archivos de la página.
3. **Base de datos:** SQLite con `node:sqlite`. Guarda las citas, la cuenta del administrador y las sesiones en `data/barber.sqlite`, que no se sube al repositorio.
4. **Acceso al panel:** la contraseña se guarda con hash scrypt y sal. La sesión usa una cookie HTTP-only con SameSite Strict, hay cierre de sesión y un límite básico de intentos.

## Cómo fluye una reserva

El navegador pide `/api/config` para cargar sucursales y servicios, y `/api/availability` para saber qué horarios están libres. Al reservar manda `POST /api/appointments`; el servidor revisa los datos, la fecha y el horario, y guarda la cita dentro de una transacción para que dos personas no aparten el mismo lugar. El panel inicia sesión y usa `/api/admin/appointments` para filtrar citas y cambiarles el estado. Una cita cancelada libera su horario y ya no se puede reactivar.

En la demostración cada sucursal atiende **una cita a la vez**. Los horarios empiezan cada hora desde las 10:00, todos los días, y solo se ofrecen los que alcanzan a terminar antes del cierre: 19:00 de lunes a sábado y 16:00 el domingo, en hora de Ciudad Juárez. Para citas del mismo día se piden dos horas de anticipación.

La vista Sucursales muestra un mapa de Google Maps por sede y el enlace "Cómo llegar". La política de seguridad del servidor solo deja cargar recursos propios, con una excepción: los mapas de `https://www.google.com`.

El modelo de datos completo, con barberos y clientes, está en el [diagrama entidad-relación](diagramas/modelo-entidad-relacion.md). Por ahora el servidor solo implementa citas, administrador y sesiones; la agenda por barbero está en la propuesta para la siguiente fase.

## Lo que falta

- Completar los datos de la tercera sucursal y confirmar con el cliente el personal, los servicios, los precios, las duraciones y las reglas de cancelación.
- Cambiar los datos simulados y ajustar el modelo para la capacidad real de cada barbero.
- Revisar la versión conectada con el cliente y el equipo, probarla en distintos dispositivos y decidir un alojamiento seguro antes de manejar datos reales.
- Confirmaciones y recordatorios, si el negocio decide usarlos.

Más detalle en el [avance del 29 de septiembre](avance-2026-09-29.md) y en la [planificación](planificacion-fase2-2026-10-04.md).
