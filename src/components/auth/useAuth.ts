import { computed, ref, Ref } from "@vue/composition-api";

export type Field = {
  name: string;
  placeholder: string;
  label: string;
  type: FieldType;
};

export enum FieldType {
  Text = "text",
  Password = "password"
}

export type LoginState = {
  email: string;
  password: string;
};

//eslint-disable-next-line
export const useAuth = (state: LoginState) => {
  const loginFields: Ref<Field[]> = ref([
    {
      name: "email",
      placeholder: "johndoe@mail.com",
      label: "Email",
      type: FieldType.Text
    },
    {
      name: "password",
      placeholder: "******",
      label: "Password",
      type: FieldType.Password
    }
  ]);
  const isEmailFormat = (value: string) => {
    const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return pattern.test(value);
  };

  const isPasswordFormat = (value: string) => {
    const pattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    return pattern.test(value);
  };

  const isEmailValid = computed(() => isEmailFormat(state.email));
  const isPasswordValid = computed(() => isPasswordFormat(state.password));

  const loginFormIsValid = computed(
    () => isEmailValid.value && isPasswordValid.value
  );

  const loginRules = computed(() => ({
    email: isEmailValid.value || "Email must be a valid  email format",
    password:
      isPasswordValid.value ||
      "Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"
  }));

  return {
    loginFields,
    isPasswordValid,
    isEmailValid,
    loginFormIsValid,
    loginRules
  };
};
