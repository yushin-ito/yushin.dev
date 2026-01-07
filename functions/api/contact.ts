import { z } from "zod";

const schema = z.object({
	email: z.string().email(),
	subject: z.string().min(3).max(128),
	message: z.string().min(3).max(2048),
});

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	try {
		const body = await request.json();
		const { data, success } = schema.safeParse(body);

		if (!success) {
			return new Response(null, { status: 400 });
		}

		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: "Yushin Ito <mail@yushin.dev>",
				to: ["mail@yushin.dev"],
				subject: data.subject,
				text: data.message,
				reply_to: data.email,
			}),
		});

		if (!response.ok) {
			return new Response(null, { status: 500 });
		}

		return new Response(null, { status: 204 });
	} catch {
		return new Response(null, { status: 500 });
	}
};
