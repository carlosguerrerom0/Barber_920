# Red PERT propuesta para el trabajo pendiente de Fase 2

**Fecha de preparación:** 29 de septiembre de 2026  
**Estado:** propuesta de planeación, pendiente de revisión por el equipo y el profesor. Las duraciones son estimaciones, no trabajo ya realizado ni fechas acordadas con el cliente.

**Seguimiento del 3 de octubre:** la actividad A (entrevista) ocurrió y quedó documentada en la [minuta](minuta-entrevista-cliente-2026-10-03.md). La duración de dos días en esta tabla era un supuesto inicial, no el tiempo real transcurrido. Las respuestas incompletas pueden cambiar B, C, D y la ruta crítica; el equipo debe actualizar los tiempos antes de utilizar la red como calendario.

El repositorio ya contiene un prototipo conectado con API, SQLite y panel administrativo. Esta red comienza con las actividades que faltan para adaptar esa demostración a información real y revisarla para la entrega de octubre. La fecha exacta de entrega no está registrada, por lo que se usan **días de trabajo relativos**, con el día 0 como inicio de la entrevista. La espera para conseguir cita con el cliente no está incluida.

## Actividades y precedencias

Las duraciones optimista, más probable y pesimista son supuestos para practicar PERT. En esta primera estimación son simétricas, por lo que el tiempo esperado `(O + 4M + P) / 6` coincide con M.

| Actividad | Trabajo pendiente | Predecesora | O | M | P | Esperado |
|---|---|---|---:|---:|---:|---:|
| A | Entrevistar al cliente sobre operación real | — | 1 | 2 | 3 | 2 |
| B | Registrar acuerdos y datos confirmados | A | 1 | 1 | 1 | 1 |
| C | Sustituir sucursales, servicios y contactos simulados | B | 1 | 2 | 3 | 2 |
| D | Definir capacidad, personal y reglas de reservación | B | 2 | 3 | 4 | 3 |
| E | Ajustar la interfaz a los datos confirmados | C | 1 | 2 | 3 | 2 |
| F | Adaptar API y disponibilidad a las reglas confirmadas | D | 3 | 4 | 5 | 4 |
| G | Ejecutar pruebas integrales con los cambios | E, F | 1 | 2 | 3 | 2 |
| H | Mostrar avance al equipo y al cliente, registrar observaciones | G | 1 | 1 | 1 | 1 |
| I | Corregir observaciones de la revisión | H | 1 | 2 | 3 | 2 |
| J | Preparar evidencia y documentación de la entrega | G | 1 | 2 | 3 | 2 |

La actividad C no significa que ya existan datos reales; depende de la entrevista #1. D y F modifican el sistema existente, no construyen de cero el backend que ya está implementado. El despliegue público se decidirá en #11 y no forma parte de esta red inicial.

## Red de actividades en flechas

La tabla de apoyo del equipo usa once eventos y dos actividades ficticias de duración cero. Se conserva aquí esa numeración para que las tablas del repositorio coincidan con el documento de Fase 2. E y F deben terminar antes de G; I y J deben terminar antes del cierre.

```mermaid
flowchart LR
    N1["1"] -- "A · 2" --> N2["2"]
    N2 -- "B · 1" --> N3["3"]
    N3 -- "C · 2" --> N4["4"]
    N3 -- "D · 3" --> N5["5"]
    N4 -- "E · 2" --> N6["6"]
    N6 -. "f1 · 0" .-> N7["7"]
    N5 -- "F · 4" --> N7
    N7 -- "G · 2" --> N8["8"]
    N8 -- "H · 1" --> N9["9"]
    N8 -- "J · 2" --> N10["10"]
    N9 -- "I · 2" --> N11["11"]
    N10 -. "f2 · 0" .-> N11
```

## Tiempos de eventos

El TMC se calcula de izquierda a derecha tomando el máximo en convergencias; el TML se calcula de derecha a izquierda tomando el mínimo en bifurcaciones. Para el último nodo, TML = TMC = 15.

| Nodo | TMC | TML |
|---:|---:|---:|
| 1 | 0 | 0 |
| 2 | 2 | 2 |
| 3 | 3 | 3 |
| 4 | 5 | 8 |
| 5 | 6 | 6 |
| 6 | 7 | 10 |
| 7 | 10 | 10 |
| 8 | 12 | 12 |
| 9 | 13 | 13 |
| 10 | 14 | 15 |
| 11 | 15 | 15 |

Por ejemplo, TMC del nodo 7 = `max(7 + 0, 6 + 4) = 10`. El TML del nodo 10 es **15**, ya que f2 llega al nodo 11 con duración cero. En la hoja del equipo ese TML figuraba como 14; también faltaba identificar la segunda llegada al nodo 7.

## Holguras y ruta crítica

Con la fórmula usada en clase, `Hᵢⱼ = Lⱼ − (Cᵢ + Tᵢⱼ)`, se obtiene:

| Actividad | Flecha | Cᵢ | Tᵢⱼ | Lⱼ | Holgura |
|---|---|---:|---:|---:|---:|
| A | 1 → 2 | 0 | 2 | 2 | 0 |
| B | 2 → 3 | 2 | 1 | 3 | 0 |
| C | 3 → 4 | 3 | 2 | 8 | 3 |
| D | 3 → 5 | 3 | 3 | 6 | 0 |
| E | 4 → 6 | 5 | 2 | 10 | 3 |
| F | 5 → 7 | 6 | 4 | 10 | 0 |
| f1 | 6 → 7 | 7 | 0 | 10 | 3 |
| G | 7 → 8 | 10 | 2 | 12 | 0 |
| H | 8 → 9 | 12 | 1 | 13 | 0 |
| I | 9 → 11 | 13 | 2 | 15 | 0 |
| J | 8 → 10 | 12 | 2 | 15 | 1 |
| f2 | 10 → 11 | 14 | 0 | 15 | 1 |

**Ruta crítica propuesta:** A → B → D → F → G → H → I, con **15 días de trabajo estimados** desde que empieza A. Las actividades C, E y f1 tienen tres días de holgura; J y f2 tienen uno. La suma de las duraciones de A a J es 21 días, pero no representa la duración del proyecto porque hay trabajo en paralelo.

Antes de usar esta red como compromiso de entrega, el equipo debe revisar duraciones, disponibilidad del cliente, responsables y la fecha límite. Si se decide incluir despliegue público, habrá que agregar actividades y recalcular la ruta crítica.
