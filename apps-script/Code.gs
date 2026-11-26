/**
 * Wellness · Huddle7 — fuente de datos para el panel
 *
 * 1. Abre la hoja de respuestas del formulario.
 * 2. Extensiones > Apps Script. Borra lo que haya y pega este código.
 * 3. Guarda y implementa: Implementar > Nueva implementación > Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 4. Copia la URL que termina en /exec y pégala en el panel.
 *
 * La URL es privada: quien la tenga puede leer las respuestas.
 */
function doGet(e) {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var nombre = (e && e.parameter && e.parameter.sheet) || '';
  var hoja = nombre ? libro.getSheetByName(nombre) : libro.getSheets()[0];
  if (!hoja) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Hoja no encontrada' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var valores = hoja.getDataRange().getDisplayValues();
  var payload = JSON.stringify({
    ok: true,
    updatedAt: new Date().toISOString(),
    values: valores
  });
  var cb = e && e.parameter && e.parameter.callback;
  if (cb) {
    return ContentService
      .createTextOutput(cb + '(' + payload + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}
