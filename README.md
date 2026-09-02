# Sistema Web de Agendamiento y Sucursales - Barber 920

Proyecto académico para analizar, diseñar y desarrollar un sistema web que facilite la consulta de sucursales y el agendamiento de citas de Barber 920.

> **Aviso:** la primera versión utiliza datos simulados y almacenamiento local. No registra citas reales.

## Estado del proyecto

**Fase 2: requerimientos y prototipos aprobados; desarrollo de la versión conectada pendiente.**

El cliente y el equipo aprobaron los requerimientos, diagramas, arquitectura, flujo de agendamiento, panel de demostración y primera versión navegable. La información operativa real, el backend, la base de datos y la autenticación continúan pendientes.

## Objetivo general

Desarrollar un sistema web adaptable a computadoras y celulares que permita consultar sucursales, revisar disponibilidad, registrar citas y administrar reservaciones de forma básica.

## Avance de la Fase 2

- [x] Creación y organización del repositorio.
- [x] Requerimientos funcionales y no funcionales.
- [x] Validación y priorización de requerimientos.
- [x] Backlog inicial en GitHub Issues.
- [x] Diagrama de casos de uso.
- [x] Modelo entidad-relación preliminar.
- [x] Selección tecnológica inicial.
- [x] Prototipo adaptable de inicio y sucursales.
- [x] Prototipo del flujo de agendamiento.
- [x] Panel administrativo de demostración.
- [x] Primera versión navegable con almacenamiento local.
- [x] Revisión y aprobación del cliente y del equipo.
- [ ] Entrevista para recopilar información operativa real.
- [ ] Sustitución de datos simulados por información confirmada.
- [ ] Backend, base de datos y autenticación.
- [ ] Pruebas de la versión conectada.

## Probar la primera versión

La aplicación está en la carpeta [web](web/).

1. Descargar o clonar el repositorio.
2. Abrir `web/index.html` en un navegador.
3. Registrar una cita de demostración.
4. Abrir la sección Administración para consultar o cambiar su estado.

También puede servirse localmente:

```bash
cd web
python -m http.server 8000
```

Después abra `http://localhost:8000`.

## Funciones implementadas en el prototipo

- Interfaz adaptable a computadora y celular.
- Consulta de tres sucursales simuladas.
- Catálogo de servicios y precios de demostración.
- Registro local de citas.
- Validación de domingos y horarios ocupados.
- Confirmación visual.
- Panel con filtros, indicadores y cambio de estado.
- Carga opcional de citas de demostración.

## Documentación

- [Requerimientos validados](docs/requerimientos.md)
- [Registro de validación](docs/validacion-cliente-equipo.md)
- [Guía de entrevista](docs/entrevista-cliente.md)
- [Casos de uso](docs/diagramas/casos-de-uso.md)
- [Modelo entidad-relación](docs/diagramas/modelo-entidad-relacion.md)
- [Arquitectura preliminar](docs/arquitectura-preliminar.md)
- [Selección tecnológica](docs/decision-tecnologica.md)
- [Datos simulados](docs/datos-simulados.md)
- [Forma de trabajo](CONTRIBUTING.md)

## Organización del trabajo

Las actividades se registran mediante GitHub Issues. Cada tarea indica su propósito, criterios de aceptación y evidencia esperada.

## Proyecto académico

Universidad Autónoma de Ciudad Juárez  
Materia: Administración y Evaluación de Proyectos de Tecnologías de Información  
Periodo: agosto-octubre de 2026
