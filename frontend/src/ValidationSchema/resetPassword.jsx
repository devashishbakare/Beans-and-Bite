import * as yup from "yup";
export const ResetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[@$_!%*?&])(?=.*[0-9]).{8,}$/,
      "Password must contain at least one uppercase letter, one special character (@$_!%*?&) and one number, and must be at least 8 characters long"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
