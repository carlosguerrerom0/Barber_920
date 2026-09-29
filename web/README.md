# Interfaz web

La interfaz usa la API del servidor de este repositorio. Desde la raíz del proyecto, ejecute:

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

Abra http://127.0.0.1:3000. Requiere Node.js 24 o posterior. La contraseña se define al crear la base de datos por primera vez; use datos ficticios.

La aplicación consulta sucursales y servicios simulados, muestra la disponibilidad del servidor, registra reservas en SQLite y permite filtrarlas y cambiar su estado desde el panel protegido. No se pueden reactivar citas canceladas: registre una nueva.

Esta es una demostración local y no acepta citas reales. Abrir `index.html` como archivo o servir esta carpeta con un servidor estático no ofrece las funciones conectadas.
