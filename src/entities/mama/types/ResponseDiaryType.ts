
import type {DiaryObjectType} from "@/entities/mama/types/DiaryObjectType.ts";

export type ResponseDiaryType = {
  data: DiaryObjectType[];
  code: number;
  result: boolean;
  message: string;
}
