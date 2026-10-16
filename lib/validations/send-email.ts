import { z } from "zod";

export const sendEmailInputSchema = z.object({
  to: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type SendEmailInput = z.infer<typeof sendEmailInputSchema>;
