import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { m } from "@/paraglide/messages";
import Icons from "./Icons";

const formSchema = z.object({
	email: z.string().email(m.component_contact_form_invalid_email()),
	subject: z
		.string()
		.min(3, m.component_contact_form_too_short_subject({ min: 3 }))
		.max(128, m.component_contact_form_too_long_subject({ max: 128 })),
	message: z
		.string()
		.min(3, m.component_contact_form_too_short_message({ min: 3 }))
		.max(2048, m.component_contact_form_too_long_message({ max: 2048 })),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			toast.error(m.component_contact_form_toast_error_title(), {
				description: m.component_contact_form_toast_error_description(),
			});

			return;
		}

		toast.success(m.component_contact_form_toast_success_title(), {
			description: m.component_contact_form_toast_success_description(),
		});
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
			<FieldGroup>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="email">
								{m.component_contact_form_email()}
							</FieldLabel>
							<Input
								{...field}
								id="email"
								aria-invalid={fieldState.invalid}
								placeholder="name@example.com"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="subject"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="subject">
								{m.component_contact_form_subject()}
							</FieldLabel>
							<Input
								{...field}
								id="subject"
								aria-invalid={fieldState.invalid}
								placeholder={m.component_contact_form_subject_placeholder()}
								autoCapitalize="none"
								autoComplete="subject"
								autoCorrect="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="message"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="message">
								{m.component_contact_form_message()}
							</FieldLabel>
							<InputGroup>
								<InputGroupTextarea
									{...field}
									id="message"
									aria-invalid={fieldState.invalid}
									placeholder={m.component_contact_form_message_placeholder()}
								/>
								<InputGroupAddon align="block-end">
									<InputGroupText className="tabular-nums">
										{field.value.length} / 2048
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<Field>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting && (
						<Icons.loader className="size-4 animate-spin" />
					)}
					{m.component_contact_form_submit()}
				</Button>
			</Field>
		</form>
	);
};

export default ContactForm;
