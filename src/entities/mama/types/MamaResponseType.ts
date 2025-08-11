
import type {DiaryObjectType} from "@/entities/mama/types/DiaryObjectType.ts";

export type MamaResponseType =  {
  id: number;
  mood: string;
  hasRituals: boolean;
  isTimerUsed: boolean;
  timer: Record<string, any>;
  userId: string;
  diary?: DiaryObjectType[];
}
