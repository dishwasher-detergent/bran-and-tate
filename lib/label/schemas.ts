import { z } from "zod";

export const labelSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .max(50, "Company name must be less than 50 characters"),
  type: z
    .string()
    .min(1, "Product type is required")
    .max(50, "Product type must be less than 50 characters"),
  scent: z
    .string()
    .min(1, "Candle name is required")
    .max(100, "Candle name must be less than 100 characters"),
  notesOf: z
    .string()
    .min(1, "Scent notes are required")
    .max(200, "Scent notes must be less than 200 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(50, "Location must be less than 50 characters"),
});

export type LabelFormData = z.infer<typeof labelSchema>;
