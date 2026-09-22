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
};

const HIDDEN_FIELDS = new Set(["name", "email", "phone", "hpField"]);

function humanizeKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function getDisplayableSubmissionFields(
  payload: Record<string, unknown>,
): { label: string; value: string }[] {
  return Object.entries(payload)
    .filter(([key, value]) => !HIDDEN_FIELDS.has(key) && value !== undefined && value !== null && value !== "")
    .map(([key, value]) => ({
      label: LEAD_FIELD_LABELS[key] ?? humanizeKey(key),
      value: String(value),
    }));
}
