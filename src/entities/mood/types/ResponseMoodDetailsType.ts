import type {MoodDetailsType} from "@/entities/mood";

export type ResponseMoodDetailsType = {
  result: boolean;
  data: MoodDetailsType | MoodDetailsType[] | null;
  code: number;
  message: string
}
