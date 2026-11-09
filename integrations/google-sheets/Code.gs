/**
 * Devs Recipe website forms -> this Google Sheet.
 *
 * Paste into Extensions > Apps Script of the sheet, then deploy as a web app
 * (see README.md next to this file). Every form submission becomes one row;
 * each form gets its own tab (Contact, Newsletter, Applications), created on
 * first use with a header row. Uploaded files (CVs) are saved to a Drive
 * folder and linked in the sheet.
 */

/** Email to notify on every submission. Leave "" for no emails. */
const NOTIFY_EMAIL = "devsrecipe@gmail.com";

/** Drive folder for uploaded files (created if missing). */
const UPLOAD_FOLDER = "Devs Recipe website uploads";

/** Safety limits. */
const MAX_FIELD_LENGTH = 5000;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const params = Object.assign({}, (e && e.parameter) || {});

    // Spam trap: real visitors never fill this field.
    if (params._gotcha) return reply({ ok: true });

    const tab = cleanTabName(params._form);
    const files = saveFiles(params);

    // Keep only the visitor's own fields (internal ones start with "_").
    const fields = {};
    Object.keys(params).forEach(function (key) {
      if (key.charAt(0) === "_" || /_(name|type|data)$/.test(key)) return;
      fields[label(key)] = safeCell(params[key]);
    });
    Object.keys(files).forEach(function (key) {
      fields[label(key)] = files[key];
    });

    appendRow(tab, fields);
    notify(tab, fields, params.email);
    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

/** A quick check that the deployment works: open the web app URL in a browser. */
function doGet() {
  return reply({ ok: true, message: "Devs Recipe form endpoint is running." });
}

function appendRow(tab, fields) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(tab) || book.insertSheet(tab);

  let headers = sheet.getLastColumn() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
  if (headers.length === 0) {
    headers = ["Received"];
    sheet.getRange(1, 1).setValue("Received");
    sheet.setFrozenRows(1);
    sheet.getRange("1:1").setFontWeight("bold");
  }

  // New fields get a new column at the end, so nothing is ever lost.
  const missing = Object.keys(fields).filter(function (name) {
    return headers.indexOf(name) === -1;
  });
  if (missing.length) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]).setFontWeight("bold");
    headers = headers.concat(missing);
  }

  const row = headers.map(function (name) {
    if (name === "Received") return new Date();
    return Object.prototype.hasOwnProperty.call(fields, name) ? fields[name] : "";
  });
  sheet.appendRow(row);
}

/** Saves `<name>_data` (base64) uploads to Drive and returns { name: link }. */
function saveFiles(params) {
  const links = {};
  Object.keys(params).forEach(function (key) {
    const match = key.match(/^(.*)_data$/);
    if (!match) return;
    const field = match[1];
    const bytes = Utilities.base64Decode(params[key]);
    if (bytes.length > MAX_FILE_BYTES) {
      links[field] = "(file too large, not saved)";
      return;
    }
    const name = String(params[field + "_name"] || field).slice(0, 120);
    const type = String(params[field + "_type"] || "application/octet-stream");
    const blob = Utilities.newBlob(bytes, type, new Date().toISOString().slice(0, 10) + " " + name);
    links[field] = uploadFolder().createFile(blob).getUrl();
  });
  return links;
}

function uploadFolder() {
  const found = DriveApp.getFoldersByName(UPLOAD_FOLDER);
  return found.hasNext() ? found.next() : DriveApp.createFolder(UPLOAD_FOLDER);
}

function notify(tab, fields, replyTo) {
  if (!NOTIFY_EMAIL) return;
  const body = Object.keys(fields)
    .map(function (name) {
      return name + ": " + fields[name];
    })
    .join("\n\n");
  const options = { to: NOTIFY_EMAIL, subject: "New " + tab + " submission from the website", body: body };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(replyTo || ""))) options.replyTo = replyTo;
  MailApp.sendEmail(options);
}

/** "businessType" -> "Business type". */
function label(key) {
  if (key === "cv") return "CV";
  const words = String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Stops formula injection: a value like =HYPERLINK(...) would otherwise run as
 * a formula when the sheet is opened. A leading apostrophe stores it as text.
 */
function safeCell(value) {
  const text = String(value == null ? "" : value).slice(0, MAX_FIELD_LENGTH);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function cleanTabName(name) {
  const clean = String(name || "")
    .replace(/[^\w &-]/g, "")
    .trim()
    .slice(0, 40);
  return clean || "Submissions";
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
