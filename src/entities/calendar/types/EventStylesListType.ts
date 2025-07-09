import type { EventStyleType, CalendarNames } from "@/entities/calendar";

export type EventStylesListType = {
  [key in CalendarNames]: EventStyleType;
}
