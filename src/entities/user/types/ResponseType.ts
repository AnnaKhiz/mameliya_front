import type { UserDataType } from "@/entities/user";

export type ResponseType = {
  result: boolean;
  data: UserDataType | null;
  code: number;
  message: string
}
