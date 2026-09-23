import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  notes: z.string().max(1000).optional(),
  vehicleSlug: z.string().min(1),
  hpField: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
