# Modelo entidad-relación preliminar

Es el modelo que propusimos el 1 de septiembre. La demostración actual solo guarda citas, la cuenta del administrador y las sesiones; barberos, clientes y servicios como tablas propias llegarán cuando tengamos los datos reales.

```mermaid
erDiagram
    SUCURSAL ||--o{ BARBERO : tiene
    SUCURSAL ||--o{ CITA : recibe
    SERVICIO ||--o{ CITA : corresponde
    CLIENTE ||--o{ CITA : solicita
    BARBERO o|--o{ CITA : atiende
    USUARIO_ADMIN ||--o{ CITA : administra

    SUCURSAL {
        int id_sucursal PK
        string nombre
        string direccion
        string telefono
        string horario
        boolean activa
    }

    SERVICIO {
        int id_servicio PK
        string nombre
        int duracion_minutos
        decimal precio
        boolean activo
    }

    BARBERO {
        int id_barbero PK
        int id_sucursal FK
        string nombre
        boolean activo
    }

    CLIENTE {
        int id_cliente PK
        string nombre
        string telefono
        string correo
    }

    CITA {
        int id_cita PK
        int id_sucursal FK
        int id_servicio FK
        int id_cliente FK
        int id_barbero FK
        datetime fecha_hora
        string estado
        datetime fecha_registro
    }

    USUARIO_ADMIN {
        int id_usuario PK
        string nombre
        string correo
        string password_hash
        string rol
    }
```

## Reglas del modelo

- Una cita pertenece a una sucursal, servicio y cliente.
- El barbero es opcional en la cita hasta que el negocio confirme cómo asignarlo.
- Dos citas no pueden traslaparse en el mismo recurso: por ahora la sucursal y, más adelante, el barbero.
- Los estados propuestos son: Pendiente, Confirmada, Completada y Cancelada.
- Las contraseñas nunca se guardan como texto plano.
