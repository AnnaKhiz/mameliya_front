import AddEditEventForm from "@/entities/calendar/ui/AddEditEventForm.vue";
import EventDetailsForm from "@/entities/calendar/ui/EventDetailsForm.vue";
import CalendarComponent from "@/entities/calendar/ui/CalendarComponent.vue";

import { useGoogleEventStore } from "@/entities/calendar/model/useGoogleEventStore.ts";

import type { CalendarEventType } from "@/entities/calendar/types/CalendarEventType.ts";
import type { FormEventType } from "@/entities/calendar/types/FormEventType.ts";
import type { PendingValueType } from "@/entities/calendar/types/PendingValueType.ts";
import type { DialogEventsType } from "@/entities/calendar/types/DialogEventsType.ts";
import type { TimeListValues } from "@/entities/calendar/types/TimeListValues.ts";
import type { EventStyleType } from "@/entities/calendar/types/EventStyleType.ts";
import type { EventStylesListType } from "@/entities/calendar/types/EventStylesListType.ts";
import type { CalendarNames } from "@/entities/calendar/types/CalendarNames.ts";
import type { ICalendarManager } from "@/entities/calendar/interfaces/ICalendarManager.ts";

import { EventIconEnums } from "@/entities/calendar/types/EventIconEnums.ts";
import { CalendarManager } from "@/entities/calendar/model/CalendarManager.ts"

export {
  CalendarComponent,
  AddEditEventForm,
  EventDetailsForm,
  useGoogleEventStore,
  EventIconEnums,
  CalendarManager,

}

export type {
  CalendarEventType,
  FormEventType,
  PendingValueType,
  DialogEventsType,
  TimeListValues,
  EventStyleType,
  EventStylesListType,
  CalendarNames,
  ICalendarManager
}
