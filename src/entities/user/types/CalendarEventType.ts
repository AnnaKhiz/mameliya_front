export type CalendarEventType = {
  start: Date | string;
  end?: Date | string;
  title?: string;
  content?: string;
  color?: string;
  [key: string]: any;
}
