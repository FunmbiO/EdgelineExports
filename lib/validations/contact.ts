import { z } from "zod";

export const SUBJECT_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "sourcing", label: "Sourcing a Car" },
  { value: "selling", label: "Selling My Car" },
  { value: "support", label: "Support" },
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  subject: z.enum(["general", "sourcing", "selling", "support"], {
    message: "Please select a subject",
  }),
  message: z.string().min(10, "Tell us a bit more (at least 10 characters)"),
  hpField: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
