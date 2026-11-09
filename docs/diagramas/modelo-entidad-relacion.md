# Modelo entidad-relación preliminar

Es el modelo que propusimos el 1 de septiembre. Hoy la base de datos guarda las citas (con su barbero desde el 8 de noviembre), la cuenta del administrador y las sesiones. Los barberos, los clientes y los servicios tendrán su propia tabla cuando el dueño nos pase los datos reales.

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

- **Cita:** pertenece a una sucursal, un servicio y un cliente.
- **Barbero:** cada cita nueva tiene uno. Las citas guardadas antes del 8 de noviembre no tienen.
- **Sin choques:** un barbero no puede tener dos citas al mismo tiempo.
- **Estados:** Pendiente, Confirmada, Realizada y Cancelada.
- **Contraseñas:** nunca se guardan como texto.
