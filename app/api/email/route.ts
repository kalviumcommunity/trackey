import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await sendgrid.send({
      to,
      from: process.env.SENDGRID_SENDER!,
      subject,
      html: message,
    });

    console.log("Email sent to:", to);
    console.log("Sender:", process.env.SENDGRID_SENDER);
    console.log("API key exists:", !!process.env.SENDGRID_API_KEY);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { success: false, error: "Email failed" },
      { status: 500 }
    );
  }
}
