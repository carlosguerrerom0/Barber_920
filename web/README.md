# Interfaz web

La página trabaja con la API del servidor de este repositorio. Para verla, desde la raíz del proyecto corre:

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

y abre <http://127.0.0.1:3000>. Necesitas Node.js 24 o más reciente. La contraseña se define la primera vez que se crea la base de datos; usa siempre datos inventados.

La página muestra las direcciones que precisó el equipo, los horarios que nos dio el dueño en la entrevista y servicios y precios de prueba. Consulta la disponibilidad en el servidor, guarda las reservas en SQLite y deja filtrarlas y cambiarles el estado desde el panel protegido. Una cita cancelada no se puede reactivar: hay que registrar una nueva.

Es una demostración local y no acepta citas reales. Si abres `index.html` como archivo, o sirves esta carpeta con un servidor estático, las funciones conectadas no van a funcionar.

## Diseño

El sistema visual está en [DESIGN.md](../DESIGN.md) y usa los colores del logo. En `assets/` están el logo (`logo920.jpg`, de 512 px) y las fuentes Anton e Inter en WOFF2, con sus licencias SIL OFL. Las servimos desde nuestro propio servidor porque su política de seguridad no permite cargar recursos de otros dominios. Si agregas un archivo a `assets/`, inclúyelo también en `staticPaths` dentro de `server/index.js`.

## Mapas

La vista Sucursales muestra un mapa de Google Maps por sucursal y el enlace "Cómo llegar", que también aparece cuando se confirma una cita. Los dos se arman con la dirección que entrega `/api/config`, sin la nota entre paréntesis, y no necesitan clave de API. La política de seguridad solo permite marcos de `https://www.google.com`, y los mapas se cargan hasta que alguien abre la vista Sucursales. Cuando el negocio nos confirme la ubicación oficial de cada sede, hay que revisar que el marcador coincida.
