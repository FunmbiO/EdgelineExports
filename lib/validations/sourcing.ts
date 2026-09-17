import { z } from "zod";

export const BUDGET_OPTIONS = [
  { value: "", label: "Select a budget" },
  { value: "under-50k", label: "Under $50k" },
  { value: "50k-100k", label: "$50k – $100k" },
  { value: "100k-150k", label: "$100k – $150k" },
  { value: "150k-250k", label: "$150k – $250k" },
  { value: "250k-plus", label: "$250k+" },
] as const;

export const sourcingRequestSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  make: z.string().min(1, "Make is required"),
  model: z.string().optional(),
  yearRange: z.string().optional(),
  budget: z.string().optional(),
  color: z.string().optional(),
  mileage: z.string().optional(),
  options: z.string().optional(),
  notes: z.string().optional(),
  hpField: z.string().max(0).optional(),
});

export type SourcingRequestInput = z.infer<typeof sourcingRequestSchema>;
