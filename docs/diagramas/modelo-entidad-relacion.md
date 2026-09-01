# Modelo entidad-relación preliminar

**Estado:** propuesta inicial pendiente de validación.

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

## Reglas preliminares

- Una cita pertenece a una sucursal, servicio y cliente.
- La asignación de barbero será opcional hasta confirmar esa función.
- Dos citas no podrán ocupar el mismo recurso en un horario incompatible.
- Los estados propuestos son: Pendiente, Confirmada, Completada y Cancelada.
- Las contraseñas nunca se almacenarán como texto sin protección.
