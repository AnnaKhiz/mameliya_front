import type { RitualSectionType } from "@/pages/rituals";

export type RitualType = {
  id: number;
  text: string;
  value: RitualSectionType;
  image: any;
  gridTemplate: string;
}
