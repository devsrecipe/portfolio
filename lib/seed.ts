import "server-only";
import { ObjectId } from "mongodb";
import { collections } from "./db";
import { env } from "./env";
import { hashPassword } from "./password";

let seeded: Promise<void> | undefined;

/** Creates the default admin from SEED_ADMIN_* the first time, if no admin exists yet. */
export function ensureAdminSeed(): Promise<void> {
  seeded ??= (async () => {
    const { admins } = await collections();
    if ((await admins.countDocuments({}, { limit: 1 })) > 0) return;
    const email = env.seedAdminEmail.trim().toLowerCase();
    const password = env.seedAdminPassword;
    if (!email || !password) return;
    const now = new Date();
    await admins
      .insertOne({
        _id: new ObjectId(),
        email,
        name: "Admin",
        passwordHash: await hashPassword(password),
        createdAt: now,
        passwordChangedAt: now,
      })
      .catch((error: { code?: number }) => {
        // Another request seeded it at the same moment.
        if (error.code !== 11000) throw error;
      });
    console.info(`[seed] Created admin ${email}. Change the password after signing in.`);
  })().catch((error) => {
    seeded = undefined;
    throw error;
  });
  return seeded;
}
