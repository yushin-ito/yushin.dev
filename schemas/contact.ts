import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "too_short_name" })
    .max(128, { message: "too_long_name" }),
  email: z.string().email({ message: "invalid_email" }),
  subject: z
    .string()
    .min(3, { message: "too_short_subject" })
    .max(128, { message: "too_long_subject" }),
  message: z
    .string()
    .min(3, { message: "too_short_message" })
    .max(2048, { message: "too_long_message" }),
});
