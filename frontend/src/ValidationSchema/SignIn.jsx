import * as yup from "yup";

export const SignInSchema = yup.object({
  userName: yup
    .string()
    .required("Please enter your email or phone number")
    .test(
      "is-email-or-phone",
      "Please enter a valid email or phone number",
      (value) => {
        if (!value) return false;

        const isPhoneNumber = /^[6-9]\d{9}$/.test(value);
        if (isPhoneNumber) return true;

        const isEmail = yup.string().email().isValidSync(value);
        return isEmail;
      }
    ),
  password: yup.string().min(8).required("Please enter your password"),
});
