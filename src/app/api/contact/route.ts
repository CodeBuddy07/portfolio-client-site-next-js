import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmailNotification } from "@/utils/nodemailer";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(20).max(5000),
});

// Contact form → one email to ADMIN_EMAIL. No database, nothing stored.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  try {
    const { name, email, message } = parsed.data;
    await sendEmailNotification(name, email, message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return NextResponse.json({ error: "Could not send right now." }, { status: 500 });
  }
}
