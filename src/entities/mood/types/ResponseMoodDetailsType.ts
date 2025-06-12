import type {MoodDetailsType} from "@/entities/mood";

export type ResponseMoodDetailsType = {
  result: boolean;
  data: MoodDetailsType | null;
  code: number;
  message: string
}
