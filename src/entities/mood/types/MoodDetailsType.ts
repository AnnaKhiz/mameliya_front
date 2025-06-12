import type {MoodStateType} from "@/entities/mood";

export type MoodDetailsType = {
  id: number;
  mood: MoodStateType;
  comment: string;
  date: number;
  userId: string;
}
