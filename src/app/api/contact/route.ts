// Receives the contact form and forwards it to the CMS API (which stores it in the Enquiries inbox).
// Going through this route keeps the API address private and avoids cross-site requests from the browser.
type Body = Partial<Record<"name" | "surname" | "email" | "phone" | "message" | "website", string>>;

export async function POST(request: Request) {
  const base = process.env.CMS_API_URL?.replace(/\/$/, "");
  if (!base) return Response.json({ ok: false, message: "Contact form is not configured." }, { status: 503 });

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const name = `${body.name ?? ""} ${body.surname ?? ""}`.trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  if (!name || !email || !message) return Response.json({ ok: false, message: "Missing fields." }, { status: 422 });

  try {
    const upstream = await fetch(`${base}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // The API limits sign-ups per visitor, so pass the visitor's address along.
        "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
      },
      body: JSON.stringify({ name, email, phone: (body.phone ?? "").trim() || null, message, website: body.website ?? "" }),
      signal: AbortSignal.timeout(70000),
    });
    if (upstream.status === 201) return Response.json({ ok: true }, { status: 201 });
    if (upstream.status === 422) {
      const data = (await upstream.json().catch(() => ({}))) as { errors?: Record<string, string[]> };
      return Response.json({ ok: false, errors: data.errors ?? {} }, { status: 422 });
    }
    if (upstream.status === 429) return Response.json({ ok: false, message: "Too many attempts, please wait a minute." }, { status: 429 });
    return Response.json({ ok: false }, { status: 502 });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
