# Arquitectura preliminar

**Estado:** arquitectura por etapas seleccionada para el primer avance. Las reglas del negocio continúan pendientes de validación.

## Componentes

1. **Interfaz web:** HTML, CSS y JavaScript para las vistas del cliente y del administrador.
2. **Almacenamiento del prototipo:** `localStorage`, únicamente para demostración en un navegador.
3. **Backend propuesto:** Node.js con Express para la segunda etapa.
4. **Base de datos propuesta:** SQLite durante desarrollo; PostgreSQL si el despliegue requiere varios usuarios simultáneos.

## Flujo principal

1. El cliente selecciona una sucursal.
2. El sistema presenta servicios y horarios.
3. El cliente selecciona servicio, fecha y horario.
4. El prototipo valida el día y evita duplicar sucursal, fecha y hora en el almacenamiento local.
5. El cliente proporciona nombre y teléfono de demostración.
6. El sistema registra y confirma la cita local.
7. El panel administrativo permite consultar y actualizar el estado.

## Entidades

| Entidad | Propósito |
|---|---|
| Sucursal | Guardar datos de cada establecimiento. |
| Servicio | Representar los servicios disponibles. |
| Barbero | Representar al personal si el cliente confirma esta función. |
| Cliente | Guardar los datos mínimos necesarios. |
| Cita | Relacionar sucursal, servicio, horario y cliente. |
| Usuario administrativo | Controlar el acceso al panel en la versión conectada. |

Consulte el [modelo entidad-relación](diagramas/modelo-entidad-relacion.md) para conocer los campos y relaciones propuestos.

## Limitaciones actuales

- No existe servidor ni base de datos compartida.
- No existe autenticación.
- Las reservaciones permanecen solamente en el navegador.
- No se envían confirmaciones.
- Los datos de sucursales, servicios, precios y horarios son simulados.

## Decisiones pendientes de validación

- Selección obligatoria u opcional de barbero.
- Cuentas para clientes.
- Recordatorios y canal de envío.
- Integración con mapas.
- Reglas exactas de disponibilidad, duración y cancelación.
- Datos personales autorizados.
- Hospedaje definitivo y dominio.

La arquitectura se actualizará cuando el cliente valide los requerimientos.
