import * as yup from "yup";
export const SignUpSchema = yup.object({
  email: yup.string().email().required("Please enter valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[@$_!%*?&])(?=.*[0-9]).{8,}$/,
      "Password must contain at least one uppercase letter, one special character (@$_!%*?&) and one number, and must be at least 8 characters long"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  mobileNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"),
});
