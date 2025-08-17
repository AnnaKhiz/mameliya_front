import type { WeekValuesListType } from "@/shared/ui/week-days-grid";

export type WeekGridItemType = {
  id: number;
  title: string;
  value: WeekValuesListType;
  image: string;
  isWeekend: boolean;
}
