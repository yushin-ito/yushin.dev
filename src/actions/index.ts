import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
	contact: defineAction({
		input: z.object({
			email: z.string().email(),
			subject: z.string().min(3).max(128),
			message: z.string().min(3).max(2048),
		}),
		handler: async ({ email, subject, message }) => {
			const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

			const response = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${RESEND_API_KEY}`,
				},
				body: JSON.stringify({
					from: "Yushin Ito <mail@yushin.dev>",
					to: ["mail@yushin.dev"],
					subject: subject,
					text: message,
					reply_to: email,
				}),
			});

			if (!response.ok) {
				throw new ActionError({ code: "INTERNAL_SERVER_ERROR" });
			}
		},
	}),
};
