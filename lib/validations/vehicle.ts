import { z } from "zod";

export const vehicleStatusEnum = z.enum(["draft", "available", "reserved", "sold"]);

export const vehicleImageSchema = z.object({
  url: z.string().url(),
  thumbUrl: z.string().url().optional(),
  alt: z.string().optional(),
  sortOrder: z.number().optional(),
});

export const vehicleInputSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().int().min(1900).max(2100),
  price: z.coerce.number().nonnegative(),
  mileage: z.coerce.number().int().nonnegative(),
  color: z.string().optional(),
  status: vehicleStatusEnum,
  badge: z.string().optional(),
  description: z.string().optional(),
  specs: z.record(z.string(), z.string().optional()).optional(),
  images: z.array(vehicleImageSchema).optional(),
});

export type VehicleInput = z.infer<typeof vehicleInputSchema>;
