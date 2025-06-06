import type { MamaResponseType } from "@/entities/mama";

export type ResponseMamaType = {
  result: boolean;
  data: MamaResponseType | null;
  code: number;
  message: string
}
