import type { RitualSectionType } from "@/entities/ritual";

export type NewRitualFormType = {
  title: string;
  description: string;
  section_key: RitualSectionType[] | [];
  cosmetic_name: string[];
}
