# Wellness · Huddle7 — panel de seguimiento diario

Panel independiente para ver de forma gráfica las respuestas del formulario wellness de
las jugadoras: **fatiga física, molestias, calidad del sueño y regla**.

- **Versión:** 0.1 (26/11/2026)
- **Tecnología:** un único `index.html` (HTML + CSS + JavaScript, sin librerías externas).
- **Coste:** 0 €. No hay servidor propio ni base de datos en la nube.
- **Estilo:** tema oscuro, interfaz en español, sin emojis, alineado con Huddle7.

---

## 1. Abrir el panel

1. Haz doble clic en `index.html` (se abre en el navegador; funciona sin instalación).
2. La primera vez se cargan **datos de ejemplo** (13 jugadoras durante 5 semanas) para que
   puedas probar todas las vistas sin configurar nada.
3. Cuando quieras usar tus datos reales: pestaña **Datos** → **Google Sheets** (recomendado)
   o **Archivo CSV**.

> El panel no modifica la hoja de respuestas: solo lee.

---

## 2. Qué incluye

### Diario del equipo

- **KPIs del periodo**: fatiga media, calidad del sueño, % de molestias, jugadoras con la
  regla por día y participación de hoy, con comparación con el periodo anterior.
- **Parte del día**: para una fecha concreta, quién ha respondido, sus valores, hora de
  respuesta y las jugadoras que faltan. Incluye avisos automáticos (fatiga alta, sueño bajo,
  molestias y, si se activa, regla).
- **Evolución del equipo**: dos gráficas de líneas, fatiga media y sueño medio, con umbrales.
- **Mapa diario**: matriz jugadora × día con cambio de métrica (fatiga, sueño, molestias,
  regla). Una celda = una jugadora un día; al pulsarla se abre su ficha.
- **Resumen por jugadora**: respuestas, medias, molestias, días de regla, última respuesta y
  una mini-evolución.

### Jugadoras

- Lista con buscador, resumen y mini-gráfica de cada jugadora.
- Ficha individual: KPIs, **fatiga diaria** con zonas de color, marcas de molestia y días de
  regla, `media del equipo` opcional, **calidad del sueño** en barras, historial de molestias
  y tarjeta de **ciclo y regla** (últimos inicios, duración, ciclo medio y próxima estimación).

### Datos

- Fuente: demo, Google Sheets (actualización automática) o CSV.
- **Mapeo de columnas**: si el formulario cambia de nombre o de orden los campos, se corrige
  aquí con desplegables. El mapeo se guarda para la próxima vez.
- **Umbrales de aviso** configurables.
- Nombre del equipo, exportación a JSON y borrado de la configuración.
- Nota de privacidad y datos sensibles.

---

## 3. Conectar Google Forms / Google Sheets (recomendado)

Requisito: el formulario guarda las respuestas en una hoja de Google. En Google Forms se
consigue en **Respuestas → Ver en Hojas de cálculo** (si no existe, se crea).

### Paso a paso

1. Abre la hoja de respuestas del formulario.
2. **Extensiones → Apps Script**.
3. Borra el contenido del editor y pega el código de `apps-script/Code.gs`
   (también está disponible y se puede copiar desde el panel: **Datos → Google Sheets →
   Cómo conectar tu Google Sheet**).
4. Guarda el proyecto.
5. **Implementar → Nueva implementación → Aplicación web**:
   - **Ejecutar como:** Yo.
   - **Quién tiene acceso:** Cualquier persona.
6. Autoriza los permisos e implementa. Copia la **URL que termina en `/exec`**.
7. En el panel: **Datos → Google Sheets**, pega la URL y pulsa **Conectar**.

A partir de ahí el panel lee la hoja. Si más adelante cambias el script, hay que crear una
nueva versión de la implementación (**Implementar → Gestionar implementaciones → Editar**).

### Actualización automática

- Al abrir el panel se lee la hoja.
- Mientras el panel está abierto, se actualiza cada **5 minutos** (configurable: manual,
  1, 5, 15 o 30 minutos) y con el botón **Actualizar**.
- No hay que exportar nada: cada respuesta del formulario aparece en la hoja y el panel la
  recoge en la siguiente lectura.
- Al cerrar el panel no queda nada ejecutándose; al volver a abrirlo se actualiza otra vez.
  **En la integración con Huddle7** esto será automático también en segundo plano.

### Seguridad de la URL

La URL de Apps Script permite leer la hoja a cualquiera que la tenga. **No la compartas**
fuera del cuerpo técnico y no la publiques. Si se filtra, crea otra implementación y pega
la nueva URL en el panel.

---

## 4. Alternativa: cargar un CSV

- Google Sheets: **Archivo → Descargar → Valores separados por comas (.csv)**.
- Excel: guardar la hoja como CSV.
- En el panel: **Datos → Archivo CSV** → arrastrar el archivo o hacer clic para elegirlo.

La primera fila debe contener los encabezados. El panel detecta las columnas solo; si algo
no coincide, se corrige en **Mapeo de columnas**. Se aceptan separadores `,` y `;` y fechas
`26/11/2026` o `2026-11-26`.

La actualización es manual: al cargar el archivo se sustituyen los datos en memoria. Los
datos quedan guardados como caché en el navegador hasta la siguiente carga.

### Si usas Microsoft Forms / Excel

No hay una conexión automática gratuita y sencilla. Opciones:

1. Exportar las respuestas a CSV/Excel y arrastrarlas al panel cuando quieras actualizar.
2. Migrar el formulario a Google Forms (gratis) para tener actualización automática.
3. Explorar más adelante Power Automate + Excel en la nube o la integración directa en
   Huddle7.

---

## 5. Columnas que espera el panel

| Campo del panel | Nombres de columna que reconoce |
|---|---|
| Fecha / hora | `Marca temporal`, `Fecha`, `Timestamp` |
| Jugadora | `Nombre`, `Jugadora`, `Nombre y apellidos` |
| Fatiga física | `Fatiga física (1-10)`, `Fatiga`, `Nivel de fatiga` |
| Molestias | `¿Tienes alguna molestia?`, `Molestias`, `Dolor` |
| Detalle de molestia | `Detalle de la molestia`, `¿Qué molestia?`, `Observaciones` |
| Calidad del sueño | `Calidad del sueño (1-5)`, `Sueño`, `Descanso` |
| Regla | `¿Tienes la regla?`, `Menstruación`, `Periodo` |

Reglas de lectura:

- **Fatiga**: primer número entre 1 y 10.
- **Sueño**: número entre 1 y 5; también acepta textos tipo «Muy mala … Muy buena».
- **Molestias / regla**: sí/no (también `Sí, rodilla` → sí + detalle, si no hay columna aparte).
- **Fechas**: se admite el formato de Google Forms (`26/11/2026 8:32:05`).
- Si una jugadora responde dos veces el mismo día, se conserva **la última respuesta**.
- Los nombres se normalizan (espacios, mayúsculas) y se agrupan por nombre.

### Formulario recomendado

Si creas o revisas el formulario, con estos campos el panel funciona sin tocar el mapeo:

1. **Nombre** (lista desplegable con las jugadoras, no texto libre: evita duplicados).
2. **Fatiga física** (escala 1-10).
3. **¿Tienes alguna molestia?** (Sí / No).
4. **¿Qué molestia?** (texto, solo si la anterior es Sí).
5. **Calidad del sueño** (escala 1-5).
6. **¿Tienes la regla?** (Sí / No).

`Marca temporal` la añade Google Forms automáticamente.

---

## 6. Privacidad y datos sensibles

- Fatiga, molestias, sueño y **regla** son **datos de salud** (categoría especial, art. 9
  RGPD). La información de la regla es especialmente sensible.
- **Todo se queda en tu equipo**: el panel es un archivo local, sin servidor propio. La
  única nube es tu propia cuenta de Google, donde ya están las respuestas del formulario.
- **Informa a las jugadoras** de qué se recoge, para qué, durante cuánto tiempo y quién lo
  ve; pide su consentimiento. Si hay menores, con el consentimiento de sus tutores.
- **Limita el acceso**: cuerpo técnico que lo necesite, URL de Apps Script privada, CSV fuera
  de correos y grupos.
- El panel guarda una **caché local** de los datos para poder abrirlo sin conexión. Con
  **Datos → Borrar configuración** se limpia.
- Consulta la guía de protección de datos de tu club/federación y las recomendaciones de la
  AEPD sobre datos de salud y deporte. Esto no es asesoramiento jurídico.

---

## 7. Límites conocidos de esta versión

- No es multiusuario ni sincroniza entre dispositivos: vive en el navegador de un equipo.
- Solo lectura: no se puede editar una respuesta desde el panel (se corrige en la hoja).
- La predicción del ciclo es **orientativa** y depende de los «sí» registrados; no sustituye
  la información de la jugadora.
- La actualización automática requiere el panel abierto (en Huddle7 será en segundo plano).
- Una URL de CSV **publicada** puede fallar por CORS al abrir el panel como archivo local;
  el método de Apps Script evita ese problema.
- Si la hoja crece mucho (varios meses), el panel sigue funcionando pero conviene usar el
  periodo «Todo» con moderación.

---

## 8. Solución de problemas

| Síntoma | Comprobación |
|---|---|
| «No se pudo conectar con la hoja» | URL termina en `/exec`; implementación activa; acceso «Cualquier persona»; autorización hecha. |
| Conecta pero no aparecen los datos | La hoja tiene encabezados en la primera fila y respuestas debajo. |
| Acentos raros | Guardar el CSV en UTF-8. |
| Dos jugadoras aparecen por separado | El nombre está escrito distinto (mayúsculas, tildes, apellido). Mejor lista desplegable en el formulario. |
| No detecta la fecha | Ir al mapeo y asignar manualmente la columna a **Fecha / hora**. |
| Quiero empezar de cero | **Datos → Borrar configuración**. |

Para comprobar que la copia descargada funciona al 100 %:

```powershell
cd C:\ruta\al\panel
node qa/test-panel.js
```

El test abre Chrome en modo headless, recorre las tres vistas, selecciona jugadoras, navega
días, cambia el mapa y carga el CSV de ejemplo. Debe terminar sin errores.

---

## 9. Siguiente paso: integrarlo en Huddle7

Este panel es la primera entrega (independiente) acordada antes de tocar Huddle7. La
integración propuesta:

1. **Página `WellnessPage.tsx`** en el rail de Huddle7, con las mismas dos vistas: diario del
   equipo y global por jugadora.
2. **Modelo de datos** en `Documentos\Huddle7\data.json`:

```json
{
  "schema": 2,
  "wellnessEntries": [
    {
      "id": "lucia-ferrer|2026-11-26",
      "playerId": "lucia-ferrer",
      "date": "2026-11-26",
      "fatigue": 9,
      "sleep": 2,
      "discomfort": 1,
      "discomfortNote": "Dolor en rodilla derecha",
      "period": 0,
      "source": "google-sheets",
      "importedAt": "2026-11-26T08:10:00Z"
    }
  ]
}
```

3. **Importación**: en Electron la lectura de la hoja no tiene CORS; el proceso principal
   puede leer directamente la URL de Apps Script o el CSV publicado. El CSV y el JSON
   exportado por este panel sirven como importación manual.
4. **Gráficas**: reutilizar las funciones SVG (equipo y jugadora) como componentes, o migrar
   al sistema visual del shell.
5. **Avisos**: los umbrales se mueven a Ajustes y pueden aparecer en Inicio («3 jugadoras
   con fatiga alta hoy»).
6. **Privacidad**: local-first, sin nube; exportar/borrar desde Ajustes.

Criterios de aceptación para esa fase: `npx tsc --noEmit` y `npm run build` limpios, QA de
navegador pasando, y los datos de wellness sobreviven al reinicio sin romper
`library.json` ni `data.json`.

---

## 10. Archivos del proyecto

| Archivo | Contenido |
|---|---|
| `index.html` | El panel completo (único archivo necesario para usarlo). |
| `plantilla-wellness.csv` | Ejemplo de CSV con las columnas recomendadas (28 respuestas de 4 jugadoras). |
| `apps-script/Code.gs` | Script para pegar en Google Sheets y conectar la hoja. |
| `LEEME.md` | Esta guía. |
| `qa/test-panel.js` | Prueba funcional automática con Chrome headless. |
| `qa/*.png` | Capturas de las vistas (Diario, Jugadoras, Datos y pruebas de CSV). |

---

## 11. Historial de versiones

- **0.1 (26/11/2026)** — primera entrega: panel independiente con datos de ejemplo, conexión
  a Google Sheets con actualización automática, importación y mapeo de CSV, dos vistas
  (equipo y jugadora), alertas configurable y documentación completa.
