# Sistema Web de Agendamiento y Sucursales - Barber 920

Proyecto académico para analizar, diseñar y desarrollar un sistema web que facilite la consulta de sucursales y el agendamiento de citas de Barber 920.

> **Aviso:** la primera versión utiliza datos simulados y almacenamiento local. No registra citas reales.

## Estado del proyecto

**Fase 2: requerimientos, diseño y primera versión navegable.**

El alcance y los requisitos continúan pendientes de revisión con el representante de Barber 920. El prototipo permite demostrar el flujo y obtener retroalimentación antes de implementar el backend.

## Objetivo general

Desarrollar un sistema web adaptable a computadoras y celulares que permita consultar sucursales, revisar disponibilidad, registrar citas y administrar reservaciones de forma básica.

## Avance de la Fase 2

- [x] Creación y organización del repositorio.
- [x] Borrador de requerimientos funcionales y no funcionales.
- [x] Guía para entrevista con el cliente.
- [x] Backlog inicial en GitHub Issues.
- [x] Diagrama de casos de uso.
- [x] Modelo entidad-relación preliminar.
- [x] Selección tecnológica inicial.
- [x] Prototipo adaptable de inicio, sucursales y reservación.
- [x] Panel administrativo de demostración.
- [x] Primera versión navegable con almacenamiento local.
- [ ] Entrevista de requerimientos con el cliente.
- [ ] Validación y priorización de requerimientos.
- [ ] Sustitución de datos simulados por información confirmada.
- [ ] Backend, base de datos y autenticación.
- [ ] Pruebas con el cliente.

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

- [Borrador de requerimientos](docs/requerimientos.md)
- [Guía de entrevista](docs/entrevista-cliente.md)
- [Casos de uso](docs/diagramas/casos-de-uso.md)
- [Modelo entidad-relación](docs/diagramas/modelo-entidad-relacion.md)
- [Arquitectura preliminar](docs/arquitectura-preliminar.md)
- [Selección tecnológica](docs/decision-tecnologica.md)
- [Datos simulados](docs/datos-simulados.md)
- [Forma de trabajo](CONTRIBUTING.md)

## Organización del trabajo

Las actividades se registran mediante GitHub Issues. Cada tarea indica su propósito, criterios de aceptación y evidencia esperada. Los cambios importantes del alcance o funcionamiento deberán validarse con el cliente antes de considerarse definitivos.

## Proyecto académico

Universidad Autónoma de Ciudad Juárez  
Materia: Administración y Evaluación de Proyectos de Tecnologías de Información  
Periodo: agosto-octubre de 2026
