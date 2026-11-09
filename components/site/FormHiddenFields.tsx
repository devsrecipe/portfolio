/**
 * Fields every website form sends besides what the visitor types:
 * `_form` names the Google Sheets tab it lands in, `_subject` is the email
 * subject for form services, and `_gotcha` is a spam trap that people never
 * see but bots fill in (those submissions are dropped).
 */
export function FormHiddenFields({ form, subject }: { form: string; subject: string }) {
  return (
    <>
      <input type="hidden" name="_form" value={form} />
      <input type="hidden" name="_subject" value={subject} />
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}
