import "server-only";
import nodemailer from "nodemailer";
import { env } from "./env";

type Mail = { to: string; subject: string; text: string; html: string };

/** Sends through SMTP when SMTP_HOST is set; otherwise prints the mail to the server log (development). */
export async function sendMail(mail: Mail): Promise<void> {
  const smtp = env.smtp;
  if (!smtp.host) {
    console.info(
      `\n[mail] SMTP_HOST is not set, so this email was not sent:\nTo: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.text}\n`,
    );
    return;
  }
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
  });
  await transport.sendMail({ from: smtp.from, ...mail });
}
