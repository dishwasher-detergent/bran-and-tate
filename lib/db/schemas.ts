import { z } from "zod";

export const labelSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .max(128, "Company name must be less than 128 characters"),
  type: z
    .string()
    .min(1, "Product type is required")
    .max(128, "Product type must be less than 128 characters"),
  scent: z
    .string()
    .min(1, "Candle name is required")
    .max(128, "Candle name must be less than 128 characters"),
  notesOf: z
    .string()
    .min(1, "Scent notes are required")
    .max(256, "Scent notes must be less than 256 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(64, "Location must be less than 64 characters"),
});

export type LabelFormData = z.infer<typeof labelSchema>;
