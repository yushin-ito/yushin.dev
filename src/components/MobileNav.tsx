import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Icons from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { deLocalizeHref, getLocale, localizeHref } from "@/paraglide/runtime";

interface MobileNavProps {
	pathname: string;
	items: { href: string; label: string }[];
}

const MobileNav = ({ pathname, items }: MobileNavProps) => {
	const locale = getLocale();
	const baseHref = deLocalizeHref(pathname);

	return (
		<Sheet>
			<SheetTrigger className="flex md:hidden">
				<Icons.menu className="size-5" />
			</SheetTrigger>
			<SheetContent className="w-3/5" side="left">
				<SheetHeader>
					<VisuallyHidden>
						<SheetTitle>{m.component_mobile_nav_title()}</SheetTitle>
						<SheetDescription />
					</VisuallyHidden>
				</SheetHeader>
				<nav className="space-y-4 px-4 py-8">
					{items.map((item) => (
						<SheetClose asChild key={item.href}>
							<a
								href={localizeHref(item.href, { locale })}
								className={cn(
									buttonVariants({ variant: "ghost" }),
									baseHref === item.href || baseHref.startsWith(`${item.href}/`)
										? "bg-muted hover:bg-muted"
										: "hover:bg-transparent hover:underline",
									"w-full",
								)}
							>
								{item.label}
							</a>
						</SheetClose>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
