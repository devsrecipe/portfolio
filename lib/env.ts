import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}. See .env.example.`);
  return value;
}

export const env = {
  get databaseUrl() {
    return required("DATABASE_URL");
  },
  get dbName() {
    return required("DB_NAME");
  },
  get seedAdminEmail() {
    return process.env.SEED_ADMIN_EMAIL ?? "";
  },
  get seedAdminPassword() {
    return process.env.SEED_ADMIN_PASSWORD ?? "";
  },
  get siteUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  },
  get smtp() {
    return {
      host: process.env.SMTP_HOST ?? "",
      port: Number(process.env.SMTP_PORT ?? 587),
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
      from: process.env.MAIL_FROM ?? "Devs Recipe <no-reply@devsrecipe.com>",
    };
  },
};
