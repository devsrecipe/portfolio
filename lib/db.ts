import "server-only";
import { GridFSBucket, MongoClient, type Db, type ObjectId } from "mongodb";
import type { ApplicationStatus } from "@/types";
import { env } from "./env";

/* ---------- Document shapes ---------- */

export type AdminDoc = {
  _id: ObjectId;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  passwordChangedAt: Date;
};

export type ContactDoc = {
  _id: ObjectId;
  name: string;
  email: string;
  businessType: string;
  budget: string;
  message: string;
  createdAt: Date;
};

export type SubscriberDoc = {
  _id: ObjectId;
  email: string;
  source: string;
  createdAt: Date;
};

export type ApplicationDoc = {
  _id: ObjectId;
  jobSlug: string;
  name: string;
  email: string;
  phone: string;
  profile: string;
  why: string;
  status: ApplicationStatus;
  note: string;
  cv: { fileId: ObjectId; filename: string; contentType: string; size: number };
  consentUntil: Date;
  createdAt: Date;
};

export type PasswordResetDoc = {
  _id: ObjectId;
  adminId: ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

/* ---------- Connection ---------- */

// Reuse one client across hot reloads in development.
const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
  mongoIndexes?: Promise<void>;
};

function client(): Promise<MongoClient> {
  globalForMongo.mongoClient ??= new MongoClient(env.databaseUrl).connect();
  return globalForMongo.mongoClient;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("admins").createIndex({ email: 1 }, { unique: true }),
    db.collection("subscribers").createIndex({ email: 1 }, { unique: true }),
    db.collection("applications").createIndex({ jobSlug: 1, createdAt: -1 }),
    db.collection("contacts").createIndex({ createdAt: -1 }),
    db.collection("password_resets").createIndex({ tokenHash: 1 }, { unique: true }),
    // MongoDB deletes expired reset tokens and applications past their consent period.
    db
      .collection("password_resets")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db
      .collection("applications")
      .createIndex({ consentUntil: 1 }, { expireAfterSeconds: 0 }),
  ]);
}

export async function getDb(): Promise<Db> {
  const db = (await client()).db(env.dbName);
  globalForMongo.mongoIndexes ??= ensureIndexes(db);
  await globalForMongo.mongoIndexes;
  return db;
}

export async function collections() {
  const db = await getDb();
  return {
    admins: db.collection<AdminDoc>("admins"),
    contacts: db.collection<ContactDoc>("contacts"),
    subscribers: db.collection<SubscriberDoc>("subscribers"),
    applications: db.collection<ApplicationDoc>("applications"),
    passwordResets: db.collection<PasswordResetDoc>("password_resets"),
    cvs: new GridFSBucket(db, { bucketName: "cvs" }),
  };
}
