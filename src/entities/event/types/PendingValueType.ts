import type { CalendarEventType } from "@/entities/event";

export type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}
