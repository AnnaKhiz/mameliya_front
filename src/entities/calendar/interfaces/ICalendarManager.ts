import {
  type CalendarEventType,
  type CalendarNames,
  type EventStylesListType,
  type PendingValueType,
  type TimeListValues,
  useGoogleEventStore
} from "@/entities/calendar";

export interface ICalendarManager {
  googleStore: ReturnType<typeof useGoogleEventStore> | null;
  styles: EventStylesListType  | null;
  isLoading: boolean;
  initStore(): void;
  set currentEvent(event: CalendarEventType);
  set events(event: CalendarEventType[]);
  set pendingEvent(event: PendingValueType | null);
  get pendingEvent(): PendingValueType | null;
  get currentEvent(): CalendarEventType | null;
  get events(): CalendarEventType[] | null;
  connectGoogleCalendar(type: CalendarNames | 'all'): void;
  handleCreateEvent({ event, resolve }: PendingValueType): void;
  handleGetEventsList(type: CalendarNames | 'all'): Promise<void>;
  createEventRequest(
    { title, description, type }:
      { title: string, description: string, type: string }
  ): Promise<Record<string, any>>;
  removeEventRequest(type: string): Promise<any>;
  removeEventFromArray(eventId: string): CalendarEventType[] | undefined;
  updateFormEventData(): {
    title: string;
    description: string;
    date: string;
    start: string;
    end: string;
  };
  updateEventRequest(updatedEvent: CalendarEventType, type: CalendarNames | 'all'): Promise<string | boolean>;
  updateUserCalendarEvents(data: CalendarEventType): CalendarEventType[] | undefined;
  validateEventDate(event: CalendarEventType): string;
  generateEventTimeLists(full: boolean): { startList: TimeListValues[], endList: TimeListValues[] };
  setNewDate(event: Record<string, any>): {
    startList?: TimeListValues[] | null,
    endList?: TimeListValues[] | null,
    message: string,
    date?: string
  } | null;
  handleCheckedDateAndCompare(event: Record<string, any>): {
    checkedDateOnly: Date,
    currentDateOnly: Date,
    todayDateOnly: Date,
  } | null;
  parseUserCalendarEvents(
    event: CalendarEventType | CalendarEventType[],
    style: CalendarNames | 'all'
  ): CalendarEventType | CalendarEventType[];
}
