import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  vehicleSlug: z.string().min(1),
  hpField: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
