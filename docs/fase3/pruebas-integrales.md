# Pruebas integrales de la Fase 3

**8 de noviembre de 2026.**

Probamos la agenda por barbero de dos formas. Primero con las pruebas automáticas de `test/server.test.js`, que levantan el servidor y hacen reservas de verdad contra una base de datos temporal. Después recorrimos la página en el navegador y guardamos capturas.

## Pruebas automáticas

Pasaron las 4 pruebas, sin fallas.

| Prueba | Qué revisa | Resultado |
|---|---|---|
| Configuración | Las tres direcciones, los tres servicios con su precio y duración, dos barberos por sucursal, el logo, las fuentes y la política de seguridad de la página | Pasa |
| Horarios | Horarios de 10:00 a 18:30 entre semana, cierre a las 16:00 el domingo y que un barbero no tenga horarios en su día de descanso. También que no se pueda pedir un barbero de otra sucursal | Pasa |
| Reservas | Que no se pueda reservar a un barbero ocupado o que descansa, que "Sin preferencia" asigne al otro barbero libre, el inicio y cierre de sesión del panel, la cancelación y que las citas sigan ahí al reiniciar el servidor | Pasa |
| Citas viejas | Que una cita guardada antes de la Fase 3, sin barbero, siga apartando su horario después de actualizar la base de datos | Pasa |

Para correrlas:

```bash
npm test
```

El proyecto pide Node.js 24. Nosotros las corrimos con Node.js 22.23.4, que necesita una opción extra para usar SQLite:

```bash
node --experimental-sqlite --test
```

## Recorrido en el navegador

Abrimos la página en Chrome con el servidor corriendo y datos inventados. Las capturas están en [evidencias](evidencias/).

| Captura | Qué se ve |
|---|---|
| [01-inicio.png](evidencias/01-inicio.png) | La página de inicio con el aviso de prueba arriba |
| [02-descanso-barbero.png](evidencias/02-descanso-barbero.png) | Un barbero en su día de descanso, sin horarios |
| [03-reservacion-barbero.png](evidencias/03-reservacion-barbero.png) | El formulario con el barbero elegido y el resumen de la cita |
| [04-confirmacion.png](evidencias/04-confirmacion.png) | La confirmación con el nombre del barbero |
| [05-panel-barberos.png](evidencias/05-panel-barberos.png) | El panel con la columna de barbero |
| [06-filtro-barbero.png](evidencias/06-filtro-barbero.png) | El panel filtrado por un barbero |
| [07-celular-reservar.png](evidencias/07-celular-reservar.png) | La reserva en tamaño de celular |

## Lo que no probamos

- **Datos reales:** los barberos y sus descansos son de prueba hasta que el dueño nos dé los suyos.
- **Mapas:** no revisamos que carguen los mapas de Google, porque la computadora donde tomamos las capturas no tenía acceso a ese sitio.
- **Opinión del dueño:** eso es la actividad U. La guía está en [revision-con-el-dueno.md](revision-con-el-dueno.md).
