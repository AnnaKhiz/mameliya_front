import { useUserStore } from "@/entities/user/model/useUserStore.ts";
import type { FormFieldsType } from "@/entities/user/types/FormFieldsType.ts";
import type { UserDataType } from "@/entities/user/types/UserDataType.ts";
import type { ResponseType } from "@/entities/user/types/ResponseType.ts";
import type { FormRegisterField } from "@/entities/user/types/FormRegisterField.ts";
import type { FormSigInField } from "@/entities/user/types/FormSigInField.ts";
import type { CalendarEventType } from "@/entities/user/types/CalendarEventType.ts";

import  { registerValidationSchema } from "@/entities/user/lib/registerValidationSchema.ts";
import  { signInValidationSchema } from "@/entities/user/lib/signInValidationSchema.ts";

export type {
  FormFieldsType,
  UserDataType,
  ResponseType,
  FormRegisterField,
  FormSigInField,
  CalendarEventType
}

export {
  useUserStore,
  registerValidationSchema,
  signInValidationSchema
}
