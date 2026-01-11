import {
  COMPANY_MAX_LENGTH,
  LOCATION_MAX_LENGTH,
  NOTES_MAX_LENGTH,
  SCENT_MAX_LENGTH,
  TYPE_MAX_LENGTH,
} from "@/constants/label.constants";
import { z } from "zod";

export const labelSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .max(COMPANY_MAX_LENGTH, "Company name must be less than 128 characters"),
  type: z
    .string()
    .min(1, "Product type is required")
    .max(TYPE_MAX_LENGTH, "Product type must be less than 128 characters"),
  scent: z
    .string()
    .min(1, "Candle name is required")
    .max(SCENT_MAX_LENGTH, "Candle name must be less than 128 characters"),
  notesOf: z
    .string()
    .min(1, "Scent notes are required")
    .max(NOTES_MAX_LENGTH, "Scent notes must be less than 256 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(LOCATION_MAX_LENGTH, "Location must be less than 64 characters"),
});

export type LabelFormData = z.infer<typeof labelSchema>;

export const deleteLabelSchema = z.object({
  scent: z.string().min(1).max(SCENT_MAX_LENGTH),
});

export type DeleteLabelFormData = z.infer<typeof deleteLabelSchema>;
