import * as yup from "yup";
export const GiftCardSchema = yup.object({
  amount: yup
    .number()
    .min(200, "Gift card should be between ₹200 and ₹10000")
    .max(10000, "Gift card should be between ₹200 and ₹10000")
    .required("Gift card amount is required"),

  recipientName: yup
    .string()
    .min(2, "Please enter recipient name")
    .max(50, "Recipient name should be under 50 characters")
    .required("Please enter recipient name"),

  recipientEmailId: yup
    .string()
    .email("Enter a valid recipient email ID")
    .required("Recipient email ID is required"),

  recipientMobileNumber: yup
    .string()
    .required("Recipient phone number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"),

  senderName: yup
    .string()
    .min(3, "Please enter sender name")
    .max(50, "Sender name should be under 50 characters")
    .required("Please enter sender name"),

  senderMobileNumber: yup
    .string()
    .required("Sender phone number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"),

  message: yup.string().optional(),
});
