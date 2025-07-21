import { useUserStore } from "@/entities/user/model/useUserStore.ts";
import type { FormFieldsType } from "@/entities/user/types/FormFieldsType.ts";
import type { UserDataType } from "@/entities/user/types/UserDataType.ts";
import type { ResponseType } from "@/entities/user/types/ResponseType.ts";
import type { FormRegisterField } from "@/entities/user/types/FormRegisterField.ts";
import type { FormSigInField } from "@/entities/user/types/FormSigInField.ts";
import type { FormUserPageType } from "@/entities/user/types/FormUserPageType.ts";

import  { registerValidationSchema } from "@/entities/user/lib/registerValidationSchema.ts";
import  { signInValidationSchema } from "@/entities/user/lib/signInValidationSchema.ts";

import UserPageWithSidebarLayout from "@/entities/user/ui/UserPageWithSidebarLayout.vue";
import UserSectionsMenu from "@/entities/user/ui/UserSectionsMenu.vue";
import UserPageForm from "@/entities/user/ui/UserPageForm.vue";
import UserPageInfo from "@/entities/user/ui/UserPageInfo.vue";

export type {
  FormFieldsType,
  UserDataType,
  ResponseType,
  FormRegisterField,
  FormSigInField,
  FormUserPageType
}

export {
  useUserStore,
  registerValidationSchema,
  signInValidationSchema,
  UserPageWithSidebarLayout,
  UserSectionsMenu,
  UserPageForm,
  UserPageInfo
}
