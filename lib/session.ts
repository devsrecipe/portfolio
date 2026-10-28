import "server-only";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./auth";
import { collections, type AdminDoc } from "./db";

/**
 * The signed-in admin, or null. Unlike the proxy's quick signature check, this
 * also confirms the admin still exists and has not changed password since the
 * session was issued (so a password reset signs out other sessions).
 */
export async function getAdmin(): Promise<AdminDoc | null> {
  const session = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session || !ObjectId.isValid(session.adminId)) return null;
  const { admins } = await collections();
  const admin = await admins.findOne({ _id: new ObjectId(session.adminId) });
  if (!admin || admin.passwordChangedAt.getTime() > session.issuedAt) return null;
  return admin;
}

export async function requireAdmin(): Promise<AdminDoc> {
  const admin = await getAdmin();
  if (!admin) throw new Error("Not signed in.");
  return admin;
}
