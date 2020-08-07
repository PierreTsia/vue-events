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

export type SignupState = {
  handle?: string;
  email: string;
  username?: string;
  password: string;
  confirmPassword?: string;
};

//eslint-disable-next-line
export const useAuth = (state: SignupState) => {
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
  const signupFields: Ref<Field[]> = ref([
    {
      name: "username",
      placeholder: "John Doe",
      label: "Username",
      type: FieldType.Text
    },
    {
      name: "email",
      placeholder: "johndoe@mail.com",
      label: "Email",
      type: FieldType.Text
    },
    {
      name: "handle",
      placeholder: "john_doe28",
      label: "Handle",
      type: FieldType.Text
    },
    {
      name: "password",
      placeholder: "******",
      label: "Password",
      type: FieldType.Password
    },
    {
      name: "confirmPassword",
      placeholder: "******",
      label: "Confirm Password",
      type: FieldType.Password
    }
  ]);

  const errorMessages = {
    email: "Email must be a valid  email format",
    password:
      "Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
    confirmPassword: "Passwords must match",
    handle: "Handle can only contain letters, digits, underscore and dashes",
    username: "User name must have between 3 and 25 characters"
  };

  const isEmailFormat = (value: string) => {
    const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return pattern.test(value);
  };

  const isPasswordFormat = (value: string) => {
    const pattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    return pattern.test(value);
  };

  const isHandleFormat = (value: string) => {
    const pattern = /[\w-]+/;
    return pattern.test(value);
  };

  const isEmailValid = computed(() => isEmailFormat(state.email));
  const isPasswordValid = computed(() => isPasswordFormat(state.password));
  const isConfirmPasswordValid = computed(
    () => state.confirmPassword === state.password
  );
  const isUsernameValid = computed(
    () =>
      (state?.username?.trim() ?? "").length >= 3 &&
      (state?.username?.trim() ?? "").length <= 25
  );

  const loginFormIsValid = computed(
    () => isEmailValid.value && isPasswordValid.value
  );

  const isHandleValid = computed(() => isHandleFormat(state?.handle ?? ""));

  const signupFormIsValid = computed(
    () =>
      isHandleValid.value &&
      isUsernameValid.value &&
      isEmailValid.value &&
      isPasswordValid.value &&
      isConfirmPasswordValid.value
  );

  const loginRules = computed(() => ({
    email: isEmailValid.value || "Email must be a valid  email format",
    password:
      isPasswordValid.value ||
      "Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"
  }));

  const signupRules = computed(() => ({
    email: isEmailValid.value || errorMessages.email,
    password: isPasswordValid.value || errorMessages.password,
    confirmPassword:
      isConfirmPasswordValid.value || errorMessages.confirmPassword,
    username: isUsernameValid.value || errorMessages.username,
    handle: isHandleValid.value || errorMessages.handle
  }));

  return {
    loginFields,
    signupFields,
    isPasswordValid,
    isEmailValid,
    loginFormIsValid,
    signupFormIsValid,
    loginRules,
    signupRules
  };
};
