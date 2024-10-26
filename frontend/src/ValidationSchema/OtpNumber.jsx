import * as yup from "yup";
export const OtpNumber = yup.object({
  mobileNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"),
});
