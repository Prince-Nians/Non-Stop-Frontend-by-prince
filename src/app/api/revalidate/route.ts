import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

// Called by the Laravel CMS whenever content changes.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  const ok =
    !!secret && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return Response.json({ message: "Unauthorized" }, { status: 401 });

  revalidateTag("home", "max");
  return Response.json({ revalidated: true });
}
