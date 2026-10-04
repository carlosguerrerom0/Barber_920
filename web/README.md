# Interfaz web

La interfaz usa la API del servidor de este repositorio. Desde la raíz del proyecto, ejecute:

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

Abra http://127.0.0.1:3000. Requiere Node.js 24 o posterior. La contraseña se define al crear la base de datos por primera vez; use datos ficticios.

La aplicación muestra las direcciones facilitadas por el equipo, los horarios relatados en la entrevista y servicios y precios simulados. Consulta la disponibilidad del servidor, registra reservas en SQLite y permite filtrarlas y cambiar su estado desde el panel protegido. No se pueden reactivar citas canceladas: registre una nueva.

Esta es una demostración local y no acepta citas reales. Abrir `index.html` como archivo o servir esta carpeta con un servidor estático no ofrece las funciones conectadas.

## Diseño

El sistema visual está descrito en [DESIGN.md](../DESIGN.md) y usa los colores del logo. La carpeta `assets/` contiene el logo (`logo920.jpg`, 512 px) y las fuentes Anton e Inter en WOFF2, con sus licencias SIL OFL. Se sirven desde el propio servidor porque su política de seguridad no permite recursos de otros dominios. Para agregar un archivo a `assets/`, inclúyalo también en `staticPaths` dentro de `server/index.js`.

## Mapas

La vista Sucursales incrusta un mapa de Google Maps por sucursal y ofrece el enlace "Cómo llegar", que también aparece al confirmar una cita. Ambos se generan a partir de la dirección que entrega `/api/config`, sin la nota entre paréntesis. No requieren clave de API. La política de seguridad del servidor solo permite marcos de `https://www.google.com`. Los mapas se cargan hasta que se abre la vista Sucursales. Cuando el cliente confirme los enlaces oficiales de cada sede, conviene revisar que el marcador coincida.
