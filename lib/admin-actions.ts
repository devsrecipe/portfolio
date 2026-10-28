"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { collections } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

const idSchema = z.string().refine((v) => ObjectId.isValid(v), "Invalid id");
const statusSchema = z.enum(["new", "shortlisted", "not-a-fit"]);

export async function setApplicationStatus(id: string, status: string): Promise<void> {
  await requireAdmin();
  const { applications } = await collections();
  await applications.updateOne(
    { _id: new ObjectId(idSchema.parse(id)) },
    { $set: { status: statusSchema.parse(status) } },
  );
  revalidatePath("/admin", "layout");
}

export async function saveApplicationNote(id: string, note: string): Promise<void> {
  await requireAdmin();
  const { applications } = await collections();
  await applications.updateOne(
    { _id: new ObjectId(idSchema.parse(id)) },
    { $set: { note: z.string().max(5000).parse(note) } },
  );
}
