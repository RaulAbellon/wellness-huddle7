# Wellness · Huddle7 — panel de seguimiento diario

Panel independiente para ver de forma gráfica las respuestas del formulario wellness de
las jugadoras: **fatiga física, molestias, calidad del sueño y regla**.

- **Versión:** 0.3 (26/11/2026) · publicada
- **Tecnología:** un único `index.html` (HTML + CSS + JavaScript, sin librerías externas).
- **Coste:** 0 €. No hay servidor propio ni base de datos en la nube.
- **Estilo:** tema oscuro, interfaz en español, sin emojis, alineado con Huddle7.
- **Enlace publicado:** <https://raulabellon.github.io/wellness-huddle7/>

---

## 1. Abrir el panel

Hay dos formas de abrirlo, con el mismo contenido:

1. **Enlace publicado (recomendado para el equipo):**
   <https://raulabellon.github.io/wellness-huddle7/>. Funciona en cualquier navegador y
   dispositivo, sin instalar nada.
2. **Archivo local:** doble clic en `index.html` (útil como copia de seguridad sin conexión).

La primera vez se cargan **datos de ejemplo** (equipo Cadete Femenino, 13 jugadoras durante
5 semanas) para que puedas probar todas las vistas sin configurar nada. Cuando quieras usar
tus datos reales: pestaña **Datos** → **Google Sheets** (recomendado) o **Archivo CSV**.

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
- **Nombres parecidos**: si una jugadora aparece con el nombre escrito de dos formas
  («Nuria Pascual» y «Nuria Pascual Hernández»), el panel lo detecta y ofrece un botón para
  unificarlas.
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

- **Cambiar el formulario no requiere volver a sincronizar**: el script lee la hoja en vivo.
  Si añades o quitas preguntas y aparece una columna nueva, revisa **Datos → Mapeo de columnas**
  (el panel la detecta sola en la mayoría de los casos).

### Seguridad de la URL

La URL de Apps Script permite leer la hoja a cualquiera que la tenga. **No la compartas**
fuera del cuerpo técnico y no la publiques. Si se filtra, crea otra implementación y pega
la nueva URL en el panel.

---

## 4. Compartir con el equipo técnico

Una vez conectada la hoja de Google (apartado 3), el panel puede generar un enlace para que
tus compañeros lo vean sin configurar nada:

1. Abre el panel publicado: <https://raulabellon.github.io/wellness-huddle7/>
2. Conecta tu hoja en **Datos → Google Sheets** (solo la primera vez en ese navegador).
3. En **Datos → Compartir con el equipo técnico**, pulsa **Copiar enlace**.
4. Manda ese enlace por un canal interno (WhatsApp del cuerpo técnico, correo del club…).

Quien abra el enlace verá el panel ya conectado a la hoja, con actualización automática cada
5 minutos. No tiene que configurar nada.

> **Importante:** ese enlace contiene la dirección privada de Apps Script. Cualquiera que lo
> tenga puede leer las respuestas de la hoja. No lo publiques en redes ni en grupos abiertos;
> si se filtra, crea una nueva implementación de Apps Script y genera un enlace nuevo.

El enlace *sin* datos (el del apartado 1) solo muestra los datos de ejemplo, así que también
puedes compartirlo sin riesgo para que vean cómo funciona el panel.

### Publicación y actualizaciones

El panel está publicado como sitio estático en GitHub Pages:
<https://raulabellon.github.io/wellness-huddle7/> (repositorio
<https://github.com/RaulAbellon/wellness-huddle7>). El repositorio es público y solo contiene
la aplicación, la plantilla y la documentación: **no contiene respuestas ni datos de
jugadoras**. Para actualizar el panel hay que subir el nuevo `index.html` a ese repositorio;
el enlace se actualiza solo en uno o dos minutos.

### Si más adelante queréis acceso restringido

Para que solo entren personas autorizadas (por ejemplo, con correo de Google) habría que
poner el panel detrás de un servicio de acceso (Cloudflare Access con un dominio propio) o
integrarlo en Huddle7, que ya será local. Se puede añadir cuando lo necesitéis.

---

## 5. Alternativa: cargar un CSV

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

## 6. Columnas que espera el panel

| Campo del panel | Nombres de columna que reconoce |
|---|---|
| Fecha / hora | `Marca temporal`, `Fecha`, `Timestamp` |
| Jugadora | `Nombre`, `Jugadora`, `Nombre y apellidos` |
| Fatiga física | `Fatiga física (1-10)`, `Fatiga`, `Nivel de fatiga`, y preguntas tipo «Indica cómo de cansada te encuentras físicamente…» |
| Molestias | `¿Tienes alguna molestia?`, `Molestias`, `Dolor` (admite Sí/No o texto libre) |
| Detalle de molestia | `Detalle de la molestia`, `¿Qué molestia?`, `Observaciones` |
| Calidad del sueño | `Calidad del sueño (1-5)`, `Sueño`, `Descanso` |
| Regla | `¿Tienes la regla?`, `Menstruación`, `Periodo` |

Reglas de lectura:

- **Fatiga**: primer número entre 1 y 10.
- **Sueño**: número entre 1 y 5; también acepta textos tipo «Muy mala … Muy buena».
- **Molestias**: sí/no; y si el formulario admite texto libre, cualquier respuesta que no sea
  «No», «Ninguna» o similar se cuenta como molestia y el texto se guarda como detalle
  («piernas y espalda», «rodilla derecha»…).
- **Regla**: sí/no (también `Sí, rodilla` → sí + detalle, si no hay columna aparte).
- **Fechas**: se admite el formato de Google Forms (`26/11/2026 8:32:05`).
- Si una jugadora responde dos veces el mismo día, se conserva **la última respuesta**.
- Los nombres se normalizan (espacios, mayúsculas) y se agrupan por nombre; si quedan
  variantes, el panel ofrece unificarlas.

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

## 7. Privacidad y datos sensibles

- Fatiga, molestias, sueño y **regla** son **datos de salud** (categoría especial, art. 9
  RGPD). La información de la regla es especialmente sensible.
- **Todo se queda en tu equipo**: el panel es un archivo local, sin servidor propio. La
  única nube es tu propia cuenta de Google, donde ya están las respuestas del formulario.
- **El panel publicado** es solo la aplicación (HTML): no lleva respuestas dentro. Los datos
  se leen en el navegador de cada persona desde tu hoja de Google. Aun así, el enlace de
  equipo del apartado 4 lleva dentro la dirección privada de la hoja.
- **Informa a las jugadoras** de qué se recoge, para qué, durante cuánto tiempo y quién lo
  ve; pide su consentimiento. Si hay menores, con el consentimiento de sus tutores.
- **Limita el acceso**: cuerpo técnico que lo necesite, URL de Apps Script privada, CSV fuera
  de correos y grupos.
- El panel guarda una **caché local** de los datos para poder abrirlo sin conexión. Con
  **Datos → Borrar configuración** se limpia.
- Consulta la guía de protección de datos de tu club/federación y las recomendaciones de la
  AEPD sobre datos de salud y deporte. Esto no es asesoramiento jurídico.

---

## 8. Límites conocidos de esta versión

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

## 9. Solución de problemas

| Síntoma | Comprobación |
|---|---|
| «No se pudo conectar con la hoja» | URL termina en `/exec`; implementación activa; acceso «Cualquier persona»; autorización hecha. |
| Conecta pero no aparecen los datos | La hoja tiene encabezados en la primera fila y respuestas debajo. |
| Acentos raros | Guardar el CSV en UTF-8. |
| Dos jugadoras aparecen por separado | El nombre está escrito distinto. El panel lo detecta en **Datos → Nombres parecidos** y ofrece **Unificar**. Mejor aún: lista desplegable en el formulario. |
| Cambio el formulario y aparece una columna nueva | No hay que volver a implementar nada: el script lee la hoja en vivo. Revisa **Datos → Mapeo de columnas**; si es la columna nueva del nombre, copia los nombres históricos a ella o avísame y lo ajusto. |
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

## 10. Siguiente paso: integrarlo en Huddle7

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

## 11. Archivos del proyecto

| Archivo | Contenido |
|---|---|
| `index.html` | El panel completo (único archivo necesario para usarlo). |
| `plantilla-wellness.csv` | Ejemplo de CSV con las columnas recomendadas (28 respuestas de 4 jugadoras). |
| `apps-script/Code.gs` | Script para pegar en Google Sheets y conectar la hoja. |
| `LEEME.md` | Esta guía. |
| `qa/test-panel.js` | Prueba funcional automática con Chrome headless. |
| `qa/test-publicado.js` | Prueba de la versión publicada en GitHub Pages y del enlace de equipo. |
| `qa/*.png` | Capturas de las vistas (Diario, Jugadoras, Datos, CSV y versión publicada). |

Versión publicada: <https://raulabellon.github.io/wellness-huddle7/> · repositorio:
<https://github.com/RaulAbellon/wellness-huddle7>. Los archivos de `qa/` son pruebas
internas de desarrollo y no forman parte del sitio publicado.

---

## 12. Historial de versiones

- **0.3 (26/11/2026)** — corrección de la lectura de datos: detección correcta de la pregunta
  de fatiga (aunque mencione el sueño), molestias con texto libre («piernas y espalda»,
  «rodilla derecha»…), elección de la columna más completa cuando hay columnas repetidas y
  unificación de nombres parecidos con un botón.
- **0.2.1 (26/11/2026)** — nombre del equipo por defecto: **Cadete Femenino** (se puede cambiar
  en Datos); el enlace de equipo incluye siempre el nombre del equipo.
- **0.2 (26/11/2026)** — publicación en GitHub Pages
  (<https://raulabellon.github.io/wellness-huddle7/>), enlace para compartir el panel conectado
  con el equipo técnico, carga automática de la fuente con `?fuente=`, guía ampliada y QA de
  la versión publicada.
- **0.1 (26/11/2026)** — primera entrega: panel independiente con datos de ejemplo, conexión
  a Google Sheets con actualización automática, importación y mapeo de CSV, dos vistas
  (equipo y jugadora), alertas configurable y documentación completa.
