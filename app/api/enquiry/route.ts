import { NextRequest, NextResponse } from "next/server";

type EnquiryRequest = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  pathway?: unknown;
  pathwayLabel?: unknown;
  website?: unknown;
};

const MAX_LENGTHS = {
  name: 120,
  email: 160,
  phone: 40,
  interest: 160,
  message: 2000,
  pathway: 80,
} as const;

function readString(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const characters: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return characters[character];
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EnquiryRequest;

    const website = readString(body.website, 200);

    // Quietly accept automated submissions that fill the hidden honeypot field.
    if (website) {
      return NextResponse.json({ success: true });
    }

    const name = readString(body.name, MAX_LENGTHS.name);
    const email = readString(body.email, MAX_LENGTHS.email).toLowerCase();
    const phone = readString(body.phone, MAX_LENGTHS.phone);
    const interest = readString(body.interest, MAX_LENGTHS.interest);
    const message = readString(body.message, MAX_LENGTHS.message);
    const pathway = readString(body.pathway, MAX_LENGTHS.pathway);
    const pathwayLabel = readString(body.pathwayLabel, MAX_LENGTHS.pathway);

    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: "Please complete your name, email, interest, and message." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const sender = process.env.RESEND_FROM_EMAIL;
    const recipient = process.env.LEAD_EMAIL_TO;

    if (!resendApiKey || !sender || !recipient) {
      console.error("Enquiry delivery is not configured.");

      return NextResponse.json(
        {
          error:
            "Online enquiries are temporarily unavailable. Please contact Archon through WhatsApp or phone.",
        },
        { status: 503 }
      );
    }

    const subjectPathway = pathwayLabel || pathway || "Website enquiry";
    const plainText = [
      "New Archon website enquiry",
      "",
      `Pathway: ${subjectPathway}`,
      `Interest: ${interest}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin: 0 0 16px; color: #0f172a;">New Archon website enquiry</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tr><td style="padding: 8px 16px 8px 0; color: #64748b;">Pathway</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(subjectPathway)}</td></tr>
          <tr><td style="padding: 8px 16px 8px 0; color: #64748b;">Interest</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(interest)}</td></tr>
          <tr><td style="padding: 8px 16px 8px 0; color: #64748b;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 16px 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 8px 16px 8px 0; color: #64748b;">Phone</td><td style="padding: 8px 0;">${escapeHtml(phone || "Not provided")}</td></tr>
        </table>
        <div style="margin-top: 24px; border-left: 3px solid #22d3ee; padding: 12px 16px; background: #f8fafc; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
    `;

    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `[Archon Website] ${subjectPathway} — ${name}`,
        text: plainText,
        html,
      }),
      cache: "no-store",
    });

    if (!delivery.ok) {
      console.error("Enquiry delivery failed.", {
        status: delivery.status,
        body: await delivery.text(),
      });

      return NextResponse.json(
        {
          error:
            "We could not send your enquiry at the moment. Please try WhatsApp or phone.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry route error:", error);

    return NextResponse.json(
      {
        error:
          "We could not send your enquiry at the moment. Please try WhatsApp or phone.",
      },
      { status: 500 }
    );
  }
}
