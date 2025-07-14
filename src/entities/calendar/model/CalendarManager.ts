import type {
  CalendarEventType,
  PendingValueType,
  TimeListValues,
  EventStylesListType,
  CalendarNames,
} from "@/entities/calendar";
import { i18n } from '@/shared/config/i18n';
import { useGoogleEventStore } from "@/entities/calendar";
import { EventIconEnums } from "@/entities/calendar/types/EventIconEnums.ts"
import { parseDateToString } from "@/shared/lib/parseDateToString.ts";


export class CalendarManager {
  private _events: CalendarEventType[] = [];
  private _pendingEvent: PendingValueType | null = null;
  private _currentEvent: CalendarEventType | null = null;
  googleStore: ReturnType<typeof useGoogleEventStore> | null = null;
  styles: EventStylesListType  | null = null;
  isLoading: boolean = false;
  constructor() {
    this.styles = {
      beauty: {
        content: EventIconEnums.BEAUTY,
        backgroundColor: '#ced3ff',
        color: '#523629',
      },
      family: {
        content: EventIconEnums.FAMILY,
        backgroundColor: '#e8bba8',
        color: '#523629',
      },
      general: {
        content: EventIconEnums.GENERAL,
        backgroundColor: '#95d0fc',
        color: '#523629',
      }
    }
  }

  initStore() {
    this.googleStore = useGoogleEventStore();
  }
  set currentEvent(event: CalendarEventType) {
    this._currentEvent = event;
  }
  set events(event: CalendarEventType[]) {
    this._events = event;
  }
  set pendingEvent(event: PendingValueType | null) {
    this._pendingEvent = event;
  }

  get pendingEvent(): PendingValueType | null {
    return this._pendingEvent;
  }
  get currentEvent(): CalendarEventType | null {
    return this._currentEvent;
  }
  get events(): CalendarEventType[] | null {
    return this._events;
  }

  connectGoogleCalendar(type: CalendarNames | 'all') {
    const currentUrl = encodeURIComponent(window.location.href);
    window.location.href = `http://localhost:3000/user/google/check?type=${type}&redirect=${currentUrl}`;
  }
  handleCreateEvent({ event, resolve }: PendingValueType): void {
    if (event.start) {
      this.pendingEvent = { event, resolve };
      return;
    }
    this.pendingEvent = null;
  }

  async handleGetEventsList(type: CalendarNames | 'all') {
    this.isLoading = true;
    const result = await this.googleStore?.googleCalendarEvents(type);

    this.isLoading = false;
    if (result) {
      this.events = result;
    }
  }
  async createEventRequest(
    { title, description, type }:
      { title: string, description: string, type: string }
  ): Promise<Record<string, any>> {

    const finalizedEvent: CalendarEventType = {
      ...this._pendingEvent?.event,
      start: this._pendingEvent?.event.start || '',
      title,
      description,
    };

    this._pendingEvent?.resolve(finalizedEvent);
    this.isLoading = true;
    const result = await this.googleStore?.addNewEventToCalendar({
      body: finalizedEvent,
      type: type
    });
    this.isLoading = false;
    this._events.push(result.data)
    console.log('add events', this._events)
    return result;
  }

  async removeEventRequest(type: string) {
    this.isLoading = true;
    const result = await this.googleStore?.removeGoogleCalendarEvent({
      type,
      eventId: this.currentEvent?.id
    });

    this.isLoading = false;
    this.removeEventFromArray(result.data?.id);
    return result?.data;
  }

  removeEventFromArray(eventId: string): CalendarEventType[] | undefined {
    const index: number = this._events?.findIndex(event => event.id === eventId) ?? -1;

    if (index === -1) return this._events;

    this._events?.splice(index, 1);
  }

  updateFormEventData(): {
    title: string;
    description: string;
    date: string;
    start: string;
    end: string;
  } {
    const { date, start, end } = this.splitDate({
      eventStart: this.currentEvent?.start ?? '',
      eventEnd: this.currentEvent?.end || ''
    });

    return {
      title: this.currentEvent?.title || '',
      description: this.currentEvent?.contentFull,
      date,
      start,
      end
    }
  }

  async updateEventRequest(updatedEvent: CalendarEventType, type: CalendarNames | 'all'): Promise<string | boolean> {
    this.isLoading = true;

    const result = await this.googleStore?.updateGoogleEvent({
      body: updatedEvent,
      type: type === 'all' ? this._currentEvent?.name : type,
      eventId: this._currentEvent?.id
    })
    this.isLoading = false;

    if (!result) {
      return i18n.global.t('notify.updates_not_saved');
    }

    this.updateUserCalendarEvents(result.data);
    return true;
  }

  updateUserCalendarEvents(data: CalendarEventType): CalendarEventType[] | undefined {
    const index: number = this._events?.findIndex(e => e.id === data.id) ?? -1;

    if (index === -1) return this._events;

    if (this._events) {
      this._events[index] = data;
    }
  }

  // HELPERS
  validateEventDate(event: CalendarEventType): string {
    const start = new Date(event.start);
    const todayDate = new Date();

    if (todayDate < start) {
      return ''
    }
    return i18n.global.t('mama.calendar.date_can_not_be_smaller');
  }
  generateEventTimeLists(full: boolean = false): { startList: TimeListValues[], endList: TimeListValues[] } {
    let startList: TimeListValues[] | null;
    let endList: TimeListValues[] | null

    if (full) {
      startList = this.createTimeValuesList(0, 0);
      endList = this.createTimeValuesList(0, 0);
    } else {
      const now = new Date();
      const minutesStart = now.getMinutes();
      const hoursStart = now.getHours();
      const minutesEnd = (15 + minutesStart) < 60 ? minutesStart + 15 : (minutesStart + 15) - 60;
      const hoursEnd = (15 + minutesStart) < 60 ? hoursStart : hoursStart + 1;

      startList = this.createTimeValuesList(hoursStart, minutesStart);
      endList = this.createTimeValuesList(hoursEnd, minutesEnd);
    }

    return {
      startList,
      endList
    }
  }

  setNewDate(event: Record<string, any>): {
    startList?: TimeListValues[] | null,
    endList?: TimeListValues[] | null,
    message: string,
    date?: string
  } | null {
    const dateObject = this.handleCheckedDateAndCompare(event);
    if (!dateObject) return null;

    const { checkedDateOnly, currentDateOnly, todayDateOnly } = dateObject;
    const isSameAsEventDay = this.isSameDay(currentDateOnly, checkedDateOnly);
    const isToday = this.isSameDay(checkedDateOnly, todayDateOnly);
    const isPast = checkedDateOnly < todayDateOnly;
    const isFuture = checkedDateOnly > todayDateOnly;
    let date: Date | string = parseDateToString(event.cell.start, true);

    if (isPast && !isToday) {
      return {
        message: i18n.global.t('mama.calendar.date_can_not_be_smaller'),
      };
    }

    if (isSameAsEventDay && isToday) {
      const { startList, endList } = this.generateEventTimeLists(false);
      return { startList, endList, message: '', date };
    }

    if (isSameAsEventDay || isToday || isFuture) {
      const { startList, endList } = this.generateEventTimeLists(true);
      return { startList, endList, message: '', date };
    }

    return { message: '', date };
  }

  handleCheckedDateAndCompare(event: Record<string, any>): {
    checkedDateOnly: Date,
    currentDateOnly: Date,
    todayDateOnly: Date,
  } | null {
    if (!this.currentEvent) return null;
    const todayDate = new Date();

    const eventDate = new Date(event.cell.start);
    eventDate.setHours(todayDate.getHours(), todayDate.getMinutes(), todayDate.getSeconds(), 0);

    const checkedFullDateTime = new Date(eventDate);
    const currentDay = new Date(this.currentEvent?.start);
    const checkedDateOnly = this.normalizeDate(checkedFullDateTime);
    const currentDateOnly = this.normalizeDate(currentDay);
    const todayDateOnly = this.normalizeDate(todayDate);

    return { checkedDateOnly, currentDateOnly, todayDateOnly }
  }

  parseUserCalendarEvents(
    event: CalendarEventType | CalendarEventType[],
    style: CalendarNames | 'all'
  ): CalendarEventType | CalendarEventType[] {
    if (this.checkIsArray(event)) {
      return event.map((e: CalendarEventType) => this.createParsedEvent(e, style))
        .filter((elem: CalendarEventType) => elem.start && elem.end)
    }
    return this.createParsedEvent(event, style);
  }

  private checkIsArray(data: Record<string, any> | Record<string, any>[]) {
    return Array.isArray(data);
  }
  private createParsedEvent(event: Record<string, any>, style: CalendarNames | 'all') {
    let currentStyles;

    if (style !== 'all') {
      currentStyles = this.styles?.[style]
    } else {
      currentStyles = this.styles
        ? this.styles[event.calendarName as CalendarNames]
        : null;
    }

    return {
      ...currentStyles,
      start: new Date(event.start?.dateTime || event.start?.date),
      end: new Date(event.end?.dateTime || event.end?.date),
      title: event.summary || event.title || 'No title',
      contentFull: event.description || '',
      id: event.id,
      isAllDay: false,
      name: event.calendarName
    }
  }
  private createTimeValuesList(hours: number, minutes: number) {
    const maxHours = 24;
    const maxMinutes = 60;
    const finalList = [];
    let h = hours;
    let m = minutes;

    do {
      finalList.push({
        text: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        value: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
      });

      m = m + 1;

      if (m === 60) {
        h = h + 1;
        m = 0;
      }
    } while (h < maxHours && m <= maxMinutes);

    return finalList;
  }
  private splitDate({ eventStart, eventEnd }: { eventStart: string | Date, eventEnd: string | Date}) {
    const date = eventStart.toString().split(' ')[0];
    const start = eventStart.toString().split(' ')[1];
    const end = eventEnd.toString().split(' ')[1] || '';

    const splittedStart = start.split(':');
    const startHours = splittedStart[0];
    const startMinutes = splittedStart[1];

    const splittedEnd = end.split(':');
    const endHours = splittedEnd[0];
    const endMinutes = splittedEnd[1];

    return {
      date,
      start,
      end,
      startHours,
      startMinutes,
      endHours,
      endMinutes
    }
  }
  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

}
