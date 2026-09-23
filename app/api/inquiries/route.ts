import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validations/inquiry";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { inquiryClientEmail, inquiryTeamEmail } from "@/lib/email/templates";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: bots that fill this hidden field get a fake success so they
  // don't learn to avoid it, but nothing is stored or emailed.
  if (typeof body.hpField === "string" && body.hpField.length > 0) {
    return NextResponse.json({ ok: true, reference: "EDG-000000" });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const ip = getClientIp(request.headers);

  try {
    const supabase = createAdminClient();

    const withinLimit = await checkRateLimit(supabase, ip);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, phone, notes, vehicleSlug } = parsed.data;

    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("year, make, model, price")
      .eq("slug", vehicleSlug)
      .maybeSingle();

    if (vehicleError || !vehicle) {
      return NextResponse.json({ error: "Vehicle not found." }, { status: 404 });
    }

    const vehicleLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    const vehiclePriceLabel = formatPrice(Number(vehicle.price));

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({ name, email, phone: phone || null, source: "inquiry" })
      .select()
      .single();

    if (leadError || !lead) {
      throw leadError ?? new Error("Lead insert returned no row");
    }

    const { data: submission, error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        type: "inquiry",
        payload: {
          name,
          email,
          phone,
          notes,
          vehicleSlug,
          vehicleMake: vehicle.make,
          vehicleModel: vehicle.model,
          vehicleYear: vehicle.year,
          vehiclePrice: vehiclePriceLabel,
        },
        lead_id: lead.id,
        ip_address: ip,
      })
      .select()
      .single();

    if (submissionError || !submission) {
      throw submissionError ?? new Error("Submission insert returned no row");
    }

    const reference = `EDG-${submission.id.slice(0, 8).toUpperCase()}`;

    await Promise.all([
      sendEmail(inquiryClientEmail({ name, email, vehicleLabel, reference })),
      sendEmail(
        inquiryTeamEmail({
          name,
          email,
          phone,
          vehicleLabel,
          vehiclePrice: vehiclePriceLabel,
          vehicleSlug,
          notes,
          reference,
        }),
      ),
    ]);

    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    console.error("Inquiry submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
