const LEAD_FIELD_LABELS: Record<string, string> = {
  location: "Location",
  make: "Make",
  model: "Model",
  makeModel: "Make & Model",
  yearRange: "Year Range",
  year: "Year",
  budget: "Budget",
  color: "Color",
  mileage: "Mileage",
  options: "Must-Have Options",
  notes: "Additional Notes",
  interest: "Interested In",
  details: "Details",
  subject: "Subject",
  message: "Message",
  vehicleMake: "Vehicle Make",
  vehicleModel: "Vehicle Model",
  vehicleYear: "Vehicle Year",
  vehiclePrice: "Vehicle Price",
};

// vehicleSlug is shown as a "View Vehicle Listing" link instead, not a
// generic field — see app/admin/(dashboard)/leads/[id]/page.tsx.
const HIDDEN_FIELDS = new Set(["name", "email", "phone", "hpField", "vehicleSlug"]);
const MULTILINE_FIELDS = new Set(["options", "notes", "details", "message"]);

function humanizeKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function getDisplayableSubmissionFields(
  payload: Record<string, unknown>,
): { label: string; value: string; multiline: boolean }[] {
  return Object.entries(payload)
    .filter(([key, value]) => !HIDDEN_FIELDS.has(key) && value !== undefined && value !== null && value !== "")
    .map(([key, value]) => ({
      label: LEAD_FIELD_LABELS[key] ?? humanizeKey(key),
      value: String(value),
      multiline: MULTILINE_FIELDS.has(key),
    }));
}
