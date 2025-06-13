import type {StorageTimerObjectType} from "@/shared/ui/timer";

export const parseLocalStorage = () => {
  let timer: number | string = 5;
  let localStorageTimerValue: StorageTimerObjectType | null = null;

  const storageData = localStorage.getItem('mameliya_timer');
  if (storageData) {
    localStorageTimerValue = JSON.parse(storageData);

    const currentDate = new Date();
    const storageDate = new Date(localStorageTimerValue?.date ?? '');

    const timeDifference = currentDate.getTime() - storageDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60)

    if (hoursDifference >= 24) {
      localStorage.removeItem('mameliya_timer')
    } else {
      timer = localStorageTimerValue?.pausedValue || localStorageTimerValue?.time || 0;
    }
  }
  return { timer, localStorageTimerValue };
}
