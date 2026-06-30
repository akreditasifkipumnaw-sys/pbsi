const SPREADSHEET_ID = '1sRqwOHwodD_uReBOMy3k0MjtGWGrdl6UgkxxFV9FRn4';
const ADMIN_PASSWORD = 'unggul'; 

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Sistem Informasi Akreditasi FKIP UMN')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSheetNames() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheets().map(s => s.getName());
}

function getData(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if(!sheet) return [];
  const data = sheet.getDataRange().getValues();
  data.shift(); 
  return data.map((r, index) => ({
    row: index + 2,
    keterangan: r[0],
    link: r[1]
  }));
}

function checkLogin(pass) {
  return pass === ADMIN_PASSWORD;
}

function addData(sheetName, keterangan, link) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  sheet.appendRow([keterangan, link]);
  return "Data berhasil ditambah";
}

function updateData(sheetName, row, keterangan, link) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  sheet.getRange(row, 1).setValue(keterangan);
  sheet.getRange(row, 2).setValue(link);
  return "Data berhasil diperbarui";
}

function deleteData(sheetName, row) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  sheet.deleteRow(row);
  return "Data berhasil dihapus";
}
