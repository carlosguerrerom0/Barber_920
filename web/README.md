# Prototipo web

Primera versión navegable del proyecto Barber 920.

## Ejecutar

No requiere instalar dependencias. Abra `index.html` en un navegador moderno.

Para servirlo localmente desde esta carpeta también puede utilizar:

```bash
python -m http.server 8000
```

Después abra `http://localhost:8000`.

## Funciones incluidas

- Navegación adaptable.
- Consulta de sucursales y servicios simulados.
- Formulario de reservación.
- Validación de domingos y horarios duplicados.
- Guardado local de citas de demostración.
- Panel administrativo con filtros y cambio de estado.
- Carga opcional de datos demo.

## Limitaciones

- No existe backend ni base de datos compartida.
- No hay autenticación.
- Los datos se guardan en `localStorage`.
- No se deben introducir datos personales reales.
- Sucursales, precios, servicios y reglas están pendientes de validación.
