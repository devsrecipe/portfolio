// Creates (or resets) the admin from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD.
// Run with: npm run seed
import { randomBytes, scrypt } from "node:crypto";
import { MongoClient } from "mongodb";

const { DATABASE_URL, DB_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } = process.env;
if (!DATABASE_URL || !DB_NAME || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
  console.error(
    "Set DATABASE_URL, DB_NAME, SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env",
  );
  process.exit(1);
}

// Same format as lib/password.ts: scrypt$<salt hex>$<hash hex>
function hashPassword(password) {
  const salt = randomBytes(16);
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, key) =>
      err
        ? reject(err)
        : resolve(`scrypt$${salt.toString("hex")}$${key.toString("hex")}`),
    ),
  );
}

const client = await new MongoClient(DATABASE_URL).connect();
try {
  const admins = client.db(DB_NAME).collection("admins");
  await admins.createIndex({ email: 1 }, { unique: true });
  const email = SEED_ADMIN_EMAIL.trim().toLowerCase();
  const now = new Date();
  const result = await admins.updateOne(
    { email },
    {
      $set: {
        passwordHash: await hashPassword(SEED_ADMIN_PASSWORD),
        passwordChangedAt: now,
      },
      $setOnInsert: { email, name: "Admin", createdAt: now },
    },
    { upsert: true },
  );
  console.log(
    result.upsertedCount ? `Created admin ${email}` : `Reset password for ${email}`,
  );
} finally {
  await client.close();
}
