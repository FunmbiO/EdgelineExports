import { z } from "zod";

export const INTEREST_OPTIONS = [
  { value: "outright", label: "Outright Purchase" },
  { value: "consignment", label: "Consignment" },
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export const sellRequestSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  makeModel: z.string().min(1, "Make and model is required"),
  year: z.string().optional(),
  mileage: z.string().optional(),
  interest: z.enum(["outright", "consignment", "not-sure"], {
    message: "Please select an option",
  }),
  details: z.string().optional(),
  hpField: z.string().max(0).optional(),
});

export type SellRequestInput = z.infer<typeof sellRequestSchema>;
