import { Models } from "node-appwrite";

export interface Label extends Models.Row {
  company: string;
  type: string;
  scent: string;
  notesOf: string;
  location: string;
}
