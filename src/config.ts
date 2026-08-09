// ─────────────────────────────────────────────────────────────────────────────
// Wedding invitation — configuration
// ─────────────────────────────────────────────────────────────────────────────
//
// 1) GOOGLE SHEET SETUP
//    a. Create a new Google Sheet.
//    b. Extensions → Apps Script, paste the script at the bottom of this file.
//    c. Deploy → New deployment → type "Web app".
//       - Execute as: Me
//       - Who has access: Anyone
//    d. Copy the /exec Web app URL and paste it into SHEET_URL below.
//
// 2) WHATSAPP
//    Set WHATSAPP_NUMBER to the host number in international format,
//    digits only, no "+" (e.g. 15551234567).

export const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbx0-NMmlSDsG4AV0V5LcfUiLzClse0ajtDqFynUaL97N_Xm0GGO1JaH-bXx3U8POL6s/exec";

export const WHATSAPP_NUMBER = "94711371983";

// Couple / event details
export const WEDDING = {
  groom: "Kasun",
  bride: "Nimesha",
  dateLabel: "Saturday, the fourteenth of February",
  year: "2026",
  timeLabel: "Half past nine in the morning",
  venue: "Cinnamon Grand",
  location: "Colombo, Sri Lanka",
  mapUrl: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
};

// Message pre-filled into WhatsApp after a successful RSVP.
export function buildWhatsAppMessage(name: string) {
  return (
    `Hello! This is ${name}. ` +
    `I just confirmed my RSVP for ${WEDDING.groom} & ${WEDDING.bride}'s wedding. ` +
    `Looking forward to celebrating with you!`
  );
}

// Message pre-filled into WhatsApp by the Admin to confirm the RSVP.
export function buildAdminConfirmationMessage(name: string, cancelLink: string) {
  return (
    `Hi ${name}, we're so excited you can make it to our wedding! ` +
    `We have received your RSVP. If your plans change, you can cancel your RSVP here: ${cancelLink}`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE APPS SCRIPT — paste this into the Apps Script editor, then deploy.
// ─────────────────────────────────────────────────────────────────────────────
/*
function doGet(e) {
  const action = (e.parameter.action || 'list');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (action === 'list') {
    const values = sheet.getDataRange().getValues();
    const rows = values.slice(1).map(function (r, i) {
      return {
        row: i + 2, // 1-based sheet row (accounts for header)
        timestamp: r[0],
        name: r[1],
        whatsapp: r[2],
        mobile: r[3],
        attending: r[4],
        message: r[5],
      };
    });
    return json({ success: true, rows: rows });
  }
  if (action === 'delete') {
    sheet.deleteRow(parseInt(e.parameter.row, 10));
    return json({ success: true });
  }
  return json({ success: false, error: 'unknown action' });
}

function doPost(e) {
  const p = e.parameter;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'WhatsApp', 'Mobile', 'Attending', 'Message']);
  }
  sheet.appendRow([new Date(), p.name, p.whatsapp, p.mobile, p.attending, p.message]);
  return json({ success: true });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
*/
