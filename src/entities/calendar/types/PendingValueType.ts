import type { CalendarEventType } from "@/entities/calendar";

export type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}
