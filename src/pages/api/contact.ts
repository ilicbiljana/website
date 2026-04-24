import type { APIRoute } from "astro";
import { site } from "@/content/site";

export const prerender = false;

const requiredFields = ["name", "email", "interest", "message", "consent"] as const;

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;

  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request payload." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  for (const field of requiredFields) {
    if (!data[field]) {
      return new Response(JSON.stringify({ error: "Please complete all required fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const contactEmail = import.meta.env.CONTACT_EMAIL || site.contact.email;
  const fromEmail =
    import.meta.env.RESEND_FROM_EMAIL || "Move to Spain Services <onboarding@resend.dev>";

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({
        error: "The contact form is not configured yet. Add RESEND_API_KEY to enable email delivery.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const lines = [
    `Name: ${String(data.name)}`,
    `Email: ${String(data.email)}`,
    `Location: ${String(data.location || "Not provided")}`,
    `Household: ${String(data.household || "Not provided")}`,
    `Interest: ${String(data.interest)}`,
    `Timeline: ${String(data.timeline || "Not provided")}`,
    "",
    "Message:",
    String(data.message),
  ];

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [contactEmail],
      reply_to: String(data.email),
      subject: `New Move to Spain inquiry from ${String(data.name)}`,
      text: lines.join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    return new Response(JSON.stringify({ error: "Email delivery failed. Please try again." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
