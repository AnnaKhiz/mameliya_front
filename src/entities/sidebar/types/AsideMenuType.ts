import type { SectionType } from "@/entities/sidebar";
import type { AsideSubmenuList } from "@/entities/sidebar";

export type AsideMenuType = {
  id: number;
  title: string;
  value: SectionType;
  listHidden: boolean;
  links: AsideSubmenuList[];
}
