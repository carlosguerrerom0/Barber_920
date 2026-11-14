# Interfaz web

La página usa la API del servidor de este repositorio. Para verla, desde la raíz del proyecto corre:

```bash
export BARBER_ADMIN_PASSWORD='una-clave-de-prueba-de-12-caracteres-o-mas'
npm start
```

y abre <http://127.0.0.1:3000>. Necesitas Node.js 24 o más reciente. Esa contraseña es la del administrador, Junior Solis (usuario `junior`), y se guarda la primera vez que se crea la base de datos.

La página muestra las direcciones y los horarios del negocio y los precios que nos dio el dueño. Los barberos los da de alta Junior desde el panel. El cliente elige sucursal, servicio, barbero y fecha, y solo ve los horarios libres. En el panel se pueden filtrar las citas y cambiarles el estado. Una cita cancelada no se puede reactivar, hay que registrar otra.

Si abres `index.html` como archivo, o con un servidor de archivos estáticos, la reserva y el panel no funcionan.

## Diseño

El diseño está en [DESIGN.md](../DESIGN.md) y usa los colores del logo. En `assets/` están el logo (`logo920.jpg`, de 512 px) y las fuentes Anton e Inter en WOFF2, con sus licencias SIL OFL. Las sirve nuestro propio servidor porque su política de seguridad no deja cargar archivos de otros sitios. Si agregas un archivo a `assets/`, agrégalo también a `staticPaths` en `server/index.js`.

## Mapas

La vista Sucursales muestra un mapa de Google Maps por sucursal y el enlace "Cómo llegar". Ese enlace también aparece al confirmar una cita. Los dos se arman con la dirección de `/api/config` y no necesitan clave de API. Los mapas se cargan hasta que alguien abre la vista Sucursales. Cuando el negocio nos confirme la ubicación de cada sede, hay que revisar que el marcador quede en el lugar correcto.
