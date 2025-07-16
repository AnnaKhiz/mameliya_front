import type { RitualSectionType } from "@/entities/ritual";

export type RitualType = {
  id: number;
  text: string;
  value: RitualSectionType;
  image: any;
  gridTemplate: string;
}
