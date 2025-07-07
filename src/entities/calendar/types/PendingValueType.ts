import type { CalendarEventType } from ".";

export type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}
