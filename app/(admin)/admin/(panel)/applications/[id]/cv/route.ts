import { Readable } from "node:stream";
import { ObjectId } from "mongodb";
import { collections } from "@/lib/db";
import { getAdmin } from "@/lib/session";

/** Streams an applicant's CV from GridFS. Admin only. */
export async function GET(
  _request: Request,
  ctx: RouteContext<"/admin/applications/[id]/cv">,
) {
  if (!(await getAdmin())) return new Response("Not signed in", { status: 401 });

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) return new Response("Not found", { status: 404 });

  const { applications, cvs } = await collections();
  const application = await applications.findOne({ _id: new ObjectId(id) });
  if (!application) return new Response("Not found", { status: 404 });

  const { fileId, filename, contentType, size } = application.cv;
  const stream = Readable.toWeb(
    cvs.openDownloadStream(fileId),
  ) as ReadableStream<Uint8Array>;
  return new Response(stream, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
    },
  });
}
