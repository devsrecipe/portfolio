# Website forms → Google Sheet

The site is static, so its forms post straight from the browser to a URL. This
folder turns a Google Sheet into that URL with a small Apps Script. Each
submission becomes a row: Contact, Newsletter and Applications each get their
own tab, CVs are saved to a Google Drive folder and linked in the sheet, and
you get an email for every submission.

## Set up (about 5 minutes, once)

1. Create a new Google Sheet, for example "Devs Recipe website".
2. In the sheet: **Extensions → Apps Script**.
3. Delete the sample code, paste in everything from [`Code.gs`](./Code.gs), and
   save. Change `NOTIFY_EMAIL` at the top if notifications should go elsewhere
   (or set it to `""` to turn emails off).
4. **Deploy → New deployment**, click the gear next to "Select type" and pick
   **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then **Authorize access** and allow it. Google warns that
   the app is unverified because you wrote it yourself: choose
   **Advanced → Go to … (unsafe)** to continue.
6. Copy the **Web app URL** (it ends in `/exec`). Opening it in a browser should
   show `"Devs Recipe form endpoint is running."`
7. In `content/site-content.json`, paste that URL into the forms you want to
   connect:

   ```json
   "forms": {
     "contact":     { "endpoint": "https://script.google.com/macros/s/…/exec", … },
     "newsletter":  { "endpoint": "https://script.google.com/macros/s/…/exec", … },
     "application": { "endpoint": "https://script.google.com/macros/s/…/exec", … }
   }
   ```

8. Rebuild and redeploy the site. Send one test message from each form; the
   tabs appear in the sheet on the first submission.

## Changing the script later

After editing the code: **Deploy → Manage deployments → ✏️ → Version: New
version → Deploy**. This keeps the same URL, so the website needs no change.

## Good to know

- "Anyone" access is required so visitors' browsers can send to it; it does
  not give anyone access to the sheet itself, which stays private to you.
- Spam: the forms include a hidden trap field that bots fill in; those
  submissions are dropped. If spam still gets through, add a captcha later.
- Values that start with `=`, `+`, `-` or `@` are stored as plain text, so a
  submission can never run as a formula in your sheet.
- Free Gmail accounts can send about 100 notification emails a day.
