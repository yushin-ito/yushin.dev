import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

interface TableOfContentsProps {
	items: {
		id: string;
		title: string;
	}[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: `0% 0% -80% 0%` },
		);

		items.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			items.forEach((item) => {
				const element = document.getElementById(item.id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, [items]);

	return (
		<div className="space-y-0.5 transition-colors">
			<p className="font-bold text-sm">
				{m.component_table_of_contents_title()}
			</p>
			<ul className="list-decimal pl-5">
				{items.map((item, index) => {
					return (
						<li
							key={index.toString()}
							className={cn(
								"pt-1.5",
								item.id === activeId
									? "font-medium text-primary marker:font-medium marker:text-primary"
									: "text-muted-foreground marker:text-muted-foreground",
							)}
						>
							<a href={`#${item.id}`} className="text-sm no-underline">
								{item.title}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default TableOfContents;
