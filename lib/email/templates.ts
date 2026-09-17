const TEAM_EMAIL = process.env.EDGELINE_TEAM_EMAIL ?? "team@edgelineexports.com";

function wrapper(title: string, bodyHtml: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #0a0a0a; padding: 32px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-top: 3px solid #c41e2a;">
        <div style="padding: 24px 32px;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #c41e2a; font-weight: bold;">
            Edgeline Exports
          </p>
          <h1 style="margin: 8px 0 24px; font-size: 22px; color: #0a0a0a;">${title}</h1>
          ${bodyHtml}
        </div>
      </div>
    </div>
  `;
}

function detailRows(rows: [string, string | undefined][]): string {
  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 6px 12px 6px 0; color: #666; font-size: 13px; white-space: nowrap;">${label}</td>
          <td style="padding: 6px 0; color: #0a0a0a; font-size: 13px;">${value}</td>
        </tr>
      `,
    )
    .join("");
}

export function sourcingClientEmail({
  name,
  email,
  reference,
}: {
  name: string;
  email: string;
  reference: string;
}) {
  return {
    to: email,
    subject: "We've got your sourcing request — Edgeline Exports",
    html: wrapper(
      "Request Received",
      `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Hi ${name},</p>
        <p style="color: #333; font-size: 14px; line-height: 1.6;">
          Thanks for telling us what you're after. Our team is reviewing your request
          and will be in touch within 24 hours with options.
        </p>
        <p style="color: #666; font-size: 13px;">Reference: <strong>${reference}</strong></p>
      `,
    ),
  };
}

export function sourcingTeamEmail({
  name,
  email,
  phone,
  location,
  reference,
  make,
  model,
  yearRange,
  budget,
  color,
  mileage,
  options,
  notes,
}: {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  reference: string;
  make: string;
  model?: string;
  yearRange?: string;
  budget?: string;
  color?: string;
  mileage?: string;
  options?: string;
  notes?: string;
}) {
  return {
    to: TEAM_EMAIL,
    subject: `New sourcing request — ${make} ${model ?? ""} (${reference})`,
    html: wrapper(
      "New Sourcing Request",
      `
        <table style="border-collapse: collapse; width: 100%;">
          ${detailRows([
            ["Name", name],
            ["Email", email],
            ["Phone", phone],
            ["Location", location],
            ["Make", make],
            ["Model", model],
            ["Year Range", yearRange],
            ["Budget", budget],
            ["Color", color],
            ["Mileage", mileage],
            ["Options", options],
            ["Notes", notes],
            ["Reference", reference],
          ])}
        </table>
      `,
    ),
  };
}

export function sellClientEmail({
  name,
  email,
  reference,
}: {
  name: string;
  email: string;
  reference: string;
}) {
  return {
    to: email,
    subject: "We've got your car details — Edgeline Exports",
    html: wrapper(
      "Details Received",
      `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Hi ${name},</p>
        <p style="color: #333; font-size: 14px; line-height: 1.6;">
          Thanks for sharing your car's details. We'll be in touch within 24 hours
          with a purchase offer or consignment plan.
        </p>
        <p style="color: #666; font-size: 13px;">Reference: <strong>${reference}</strong></p>
      `,
    ),
  };
}

export function sellTeamEmail({
  name,
  email,
  makeModel,
  year,
  mileage,
  interest,
  details,
  reference,
}: {
  name: string;
  email: string;
  makeModel: string;
  year?: string;
  mileage?: string;
  interest: string;
  details?: string;
  reference: string;
}) {
  return {
    to: TEAM_EMAIL,
    subject: `New sell request — ${makeModel} (${reference})`,
    html: wrapper(
      "New Sell Request",
      `
        <table style="border-collapse: collapse; width: 100%;">
          ${detailRows([
            ["Name", name],
            ["Email", email],
            ["Make/Model", makeModel],
            ["Year", year],
            ["Mileage", mileage],
            ["Interest", interest],
            ["Details", details],
            ["Reference", reference],
          ])}
        </table>
      `,
    ),
  };
}

export function contactClientEmail({ name, email }: { name: string; email: string }) {
  return {
    to: email,
    subject: "We've got your message — Edgeline Exports",
    html: wrapper(
      "Message Received",
      `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Hi ${name},</p>
        <p style="color: #333; font-size: 14px; line-height: 1.6;">
          Thanks for reaching out. We typically respond within one business day.
        </p>
      `,
    ),
  };
}

export function contactTeamEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return {
    to: TEAM_EMAIL,
    subject: `New contact form message — ${subject}`,
    html: wrapper(
      "New Contact Message",
      `
        <table style="border-collapse: collapse; width: 100%;">
          ${detailRows([
            ["Name", name],
            ["Email", email],
            ["Subject", subject],
            ["Message", message],
          ])}
        </table>
      `,
    ),
  };
}
