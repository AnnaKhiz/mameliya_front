import type {
  CalendarEventType,
  PendingValueType,
  TimeListValues
} from "@/entities/calendar";
import { i18n } from '@/shared/config/i18n';

import {useGoogleEventStore} from "@/entities/calendar";

class CalendarManager {
  events: CalendarEventType[] = [];
  private _pendingEvent: PendingValueType | null = null;
  private _currentEvent: CalendarEventType | null = null;
  googleStore: ReturnType<typeof useGoogleEventStore> | null = null;
  constructor() {
  }

  initStore() {
    this.googleStore = useGoogleEventStore();
  }
  set currentEvent(event: CalendarEventType) {
    this._currentEvent = event;
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
  handleCreateEvent({ event, resolve }: PendingValueType): void {
    if (event.start) {
      this.pendingEvent = { event, resolve };
      return;
    }
    this.pendingEvent = null;
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

    const result = await this.googleStore?.addNewEventToCalendar({
      body: finalizedEvent,
      type
    });

    return result;
  }

  async removeEventRequest(type: string) {
    const result = await this.googleStore?.removeGoogleCalendarEvent({
      type,
      eventId: this.currentEvent?.id
    });
    return result?.data;
  }

  updateFormEventData() {
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
    const todayDateOnly = calendar.normalizeDate(todayDate);

    return { checkedDateOnly, currentDateOnly, todayDateOnly }
  }
  createTimeValuesList(hours: number, minutes: number) {
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

  splitDate({ eventStart, eventEnd }: { eventStart: string | Date, eventEnd: string | Date}) {
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

  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }


}

export const calendar = new CalendarManager();
