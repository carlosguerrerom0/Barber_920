# Arquitectura preliminar

**Estado:** propuesta conceptual; las tecnologías aún no han sido seleccionadas.

## Componentes previstos

1. **Interfaz web:** permitirá al cliente consultar información, seleccionar sucursal y registrar una cita.
2. **Panel administrativo:** permitirá al personal autorizado consultar y administrar reservaciones.
3. **Backend:** aplicará las reglas del negocio, validará disponibilidad y procesará las reservaciones.
4. **Base de datos:** almacenará sucursales, servicios, horarios, usuarios autorizados y citas.

## Flujo principal

1. El cliente selecciona una sucursal.
2. El sistema consulta servicios y disponibilidad.
3. El cliente selecciona servicio, fecha y horario.
4. El sistema valida que el horario continúe disponible.
5. El cliente proporciona los datos requeridos.
6. El sistema registra y confirma la cita.
7. El personal consulta la reservación desde el panel administrativo.

## Entidades preliminares

| Entidad | Propósito |
|---|---|
| Sucursal | Guardar datos de cada establecimiento. |
| Servicio | Representar los servicios que pueden reservarse. |
| Barbero | Representar al personal, únicamente si el cliente confirma que debe seleccionarse. |
| Horario | Definir disponibilidad y bloqueos. |
| Cliente | Guardar los datos mínimos necesarios para la cita. |
| Cita | Relacionar sucursal, servicio, horario y cliente. |
| Usuario administrativo | Controlar el acceso al panel. |

## Decisiones pendientes

- Tecnologías de frontend, backend y base de datos.
- Hospedaje y dominio.
- Uso de cuentas para clientes.
- Selección de barbero.
- Envío de confirmaciones o recordatorios.
- Integración con mapas.
- Datos personales que se almacenarán.
- Reglas exactas para evitar conflictos de horario.

La arquitectura deberá actualizarse después de validar los requerimientos con el cliente.
