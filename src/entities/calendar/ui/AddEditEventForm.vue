<script setup lang="ts">
import { AppTextarea } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {AppButton} from "@/shared/ui/button";
import {
  type ICalendarManager,
  type CalendarEventType,
  type DialogEventsType,
  type FormEventType,
  type PendingValueType,
  type TimeListValues,
  type CalendarNames
} from "@/entities/calendar";
// @ts-ignore
import { VueCal } from 'vue-cal';
import 'vue-cal/style';

const { t } = useI18n();

type Props = {
  pendingEvent?: PendingValueType | null,
  currentEvent?: CalendarEventType | null,
  dialog: DialogEventsType,
  resetForm: () => void,
  calendar: ICalendarManager,
  type: CalendarNames | 'all'
}

const props = defineProps<Props>();

const formEventData = defineModel<FormEventType>() as Ref<FormEventType>;
const startDatedList = ref<TimeListValues[] | null>(null);
const endDatesList = ref<TimeListValues[] | null>(null);
const messageError = ref<string>('');
const messageTextarea = ref<string>('');
const pendingEvent = ref<PendingValueType | null>(null);

const validateEventForm = () => {
  const { title, description } = formEventData.value as FormEventType;
  const start = pendingEvent.value?.event.start || '';

  if (!title.trim() || !description.trim() && !start ) {
    messageTextarea.value = t('mama.calendar.empty_fields');
    return false;
  }
  messageTextarea.value = '';
  return { title, description };
}
const saveEventDescription = async () => {
  const form = validateEventForm();
  if (!form) return;

  const { title, description } = form;

  const result = await props.calendar.createEventRequest({
    title,
    description,
    type: props.type === 'all' ? 'general' : props.type
  })

  if (!result.result) {
    messageTextarea.value = t('notify.updates_not_saved');
    return;
  }

  messageTextarea.value = '';
  props.resetForm();
}

const saveEventChanges = async () => {
  const { start, date, end } = formEventData.value as FormEventType;

  const updatedEvent: CalendarEventType = {
    ...formEventData.value,
    start: `${date} ${start}`,
    end: `${date} ${end}`
  };

  delete updatedEvent.date;

  const result = await props.calendar.updateEventRequest(updatedEvent, props.type);

  if (typeof result === 'string') {
    messageTextarea.value = result;
    return;
  }

  messageTextarea.value = '';
  props.resetForm();
}

const handleCellClick = (event: Record<string, any>) => {
  const result = props.calendar.setNewDate(event);
  if (!result) return;

  startDatedList.value = result?.startList as TimeListValues[];
  endDatesList.value = result?.endList as TimeListValues[];
  messageError.value = result?.message;
  formEventData.value.date = result?.date as string;
}

const saveDisabled = computed(() => (!!messageError.value || !formEventData.value.description || !formEventData.value.title));

onMounted(() => {
  props.calendar.initStore();
  const { startList, endList } = props.calendar.generateEventTimeLists(props.dialog === 'edit');
  startDatedList.value = startList;
  endDatesList.value = endList;
  pendingEvent.value = props.calendar.pendingEvent;
})

watch(() => formEventData.value, (newValue) => {
  if (!newValue.title || !newValue.description) {
    messageTextarea.value = t('mama.calendar.empty_fields');
  } else {
    messageTextarea.value = '';
  }
}, { deep: true })

</script>

<template>
  <section class="w-full">
    <form action="" class="flex flex-col items-start justify-start gap-4 w-full">
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.calendar.modal_event_name') }}</h2>
        <input
          v-model="formEventData.title"
          type="text"
          class="w-full dark-mode placeholder:opacity-25"
          :placeholder="t('mama.calendar.enter_event_name')"
        />
      </div>
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.calendar.modal_event_description') }}</h2>
        <AppTextarea
          v-model="formEventData.description"
          :message="messageTextarea"
          class="w-full"
          is-reset
          dark-mode
          placeholder-text="mama.calendar.enter_event_description"
        />
      </div>
      <div v-if="dialog === 'edit'" class="flex justify-start items-start gap-5 w-full text-brown-dark font-semibold text-md mb-1">
        <div>
          <h2 class="mb-2">{{ t('mama.calendar.event_date') }}</h2>
          <Vue-cal date-picker :selected-date="formEventData.date" @cell-click="handleCellClick"/>
        </div>
        <div class="w-full">
          <div class="mb-6">
            <h2 class="mb-2">{{ t('mama.calendar.time_start') }}</h2>
            <select
              v-model="formEventData.start"
              :disabled="!!messageError"
              class="w-full light-mode bg-brown-dark text-white"
            >
              <option
                v-for="item in startDatedList"
                :key="item.text"
                :value="item.value"
                class="hover:bg-brown-light"
              >
                {{ item.text }}
              </option>
            </select>
          </div>
          <div class="w-full">
            <h2 class="mb-2">{{ t('mama.calendar.time_end') }}</h2>
            <select
              v-model="formEventData.end"
              :disabled="!!messageError"
              class="w-full light-mode bg-brown-dark text-white"
            >
              <option
                v-for="item in endDatesList"
                :key="item.text"
                :value="item.value"
              >
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <p class="text-red-800 text-xs mb-4">{{ messageError }}</p>
    </form>
    <div class="flex justify-start items-center gap-4">
      <AppButton :label="t('general.close')" @click="resetForm" />
      <AppButton
        :label="t(`mama.calendar.${ dialog === 'add' ? 'add_event' : 'save_changes' }`)"
        @click="dialog === 'add' ? saveEventDescription() : saveEventChanges()"
        :disabled="saveDisabled"
      />
    </div>
  </section>
</template>

<style scoped>
.vuecal {
  --vuecal-primary-color: #523629;
  --vuecal-event-color: white;
}

.vuecal__event {
  background-color: #735c52;
}
</style>
