import * as yup from "yup";
export const ForgotPasswordSchema = yup.object({
  email: yup.string().email().required("Please enter valid email address"),
});
