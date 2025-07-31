import type { RitualSectionType } from "@/entities/ritual";

export type RitualDetailsItemType = {
  id: number;
  title: string;
  description: string;
  created_at: Date | string;
  creator: string;
  cosmetic_name?: string[];
  checked: boolean;
  lang: "ru" | "en";
}
