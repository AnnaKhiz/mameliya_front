export type CalendarEventType = {
  start: Date | string;
  end?: Date | string;
  title?: string;
  [key: string]: any;
}
