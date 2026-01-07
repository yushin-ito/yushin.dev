import type { ComponentProps } from "react";
import Icons from "@/components/Icons";
import { cn } from "@/lib/utils";

export const mdxComponents = {
	h1: ({ className, ...props }: ComponentProps<"h1">) => (
		<h1
			className={cn(
				"mt-2 scroll-m-20 font-bold text-4xl tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: ComponentProps<"h2">) => (
		<h2
			className={cn(
				"mt-12 scroll-m-20 border-b pb-1 font-semibold text-3xl tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: ComponentProps<"h3">) => (
		<h3
			className={cn(
				"mt-10 scroll-m-20 font-semibold text-2xl tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: ComponentProps<"h4">) => (
		<h4
			className={cn(
				"mt-8 scroll-m-20 font-semibold text-xl tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: ComponentProps<"h5">) => (
		<h5
			className={cn(
				"mt-8 scroll-m-20 font-semibold text-lg tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: ComponentProps<"h6">) => (
		<h6
			className={cn(
				"mt-8 scroll-m-20 font-semibold text-base tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: ComponentProps<"a">) => (
		<a
			className={cn("font-medium underline underline-offset-4", className)}
			{...props}
		/>
	),
	p: ({ className, ...props }: ComponentProps<"p">) => (
		<p className={cn("not-first:mt-6 leading-7", className)} {...props} />
	),
	strong: ({ className, ...props }: ComponentProps<"strong">) => (
		<strong className={cn("font-bold", className)} {...props} />
	),
	ul: ({ className, ...props }: ComponentProps<"ul">) => (
		<ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: ComponentProps<"ol">) => (
		<ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: ComponentProps<"li">) => (
		<li className={cn("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		/>
	),
	img: ({ className, alt, ...props }: ComponentProps<"img">) => (
		<img className={cn("rounded-md border", className)} alt={alt} {...props} />
	),
	hr: ({ ...props }: ComponentProps<"hr">) => (
		<hr className="my-4 md:my-8" {...props} />
	),
	table: ({ className, ...props }: ComponentProps<"table">) => (
		<div className="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
			<table
				className={cn(
					"relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
					className,
				)}
				{...props}
			/>
		</div>
	),
	tr: ({ className, ...props }: ComponentProps<"tr">) => (
		<tr className={cn("m-0 border-b", className)} {...props} />
	),
	th: ({ className, ...props }: ComponentProps<"th">) => (
		<th
			className={cn(
				"px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: ComponentProps<"td">) => (
		<td
			className={cn(
				"whitespace-nowrap px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, children, ...props }: ComponentProps<"pre">) => (
		<pre
			className={cn(
				"no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-[slot=tabs]:p-0 has-data-highlighted-line:px-0 has-data-line-numbers:px-0",
				className,
			)}
			{...props}
		>
			{children}
		</pre>
	),
	figure: ({ className, ...props }: ComponentProps<"figure">) => (
		<figure className={cn(className)} {...props} />
	),
	figcaption: ({
		className,
		children,
		...props
	}: ComponentProps<"figcaption">) => (
		<figcaption
			className={cn(
				"flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70",
				className,
			)}
			{...props}
		>
			{children}
		</figcaption>
	),
	code: ({
		className,

		...props
	}: ComponentProps<"code">) => {
		if (typeof props.children === "string") {
			return (
				<code
					className={cn(
						"wrap-break-word relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none",
						className,
					)}
					{...props}
				/>
			);
		}

		return <code {...props} />;
	},
	Icons,
};
