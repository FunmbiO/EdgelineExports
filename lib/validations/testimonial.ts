import { z } from "zod";

export const testimonialInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quote: z.string().min(1, "Quote is required"),
  location: z.string().optional(),
  featured: z.boolean().optional(),
});

export type TestimonialInput = z.infer<typeof testimonialInputSchema>;
