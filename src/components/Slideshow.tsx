import type { GetImageResult } from "astro";
import {
	type ComponentProps,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import useFullscreen from "@/hooks/useFullscreen";
import useTimer from "@/hooks/useTimer";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

interface SlideshowProps extends ComponentProps<"div"> {
	images: GetImageResult[];
}

const Slideshow = ({ images, className, ...props }: SlideshowProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(true);
	const [pageIndex, setPageIndex] = useState(0);
	const [scale, setScale] = useState(1);

	const [clearTimer, setTimer] = useTimer(() => {
		setIsOpen(false);
	}, 3000);

	const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

	const nextPage = useCallback(() => {
		setPageIndex((prev) => Math.min(prev + 1, images.length - 1));
	}, [images.length]);

	const previousPage = useCallback(() => {
		setPageIndex((prev) => Math.max(prev - 1, 0));
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				nextPage();
			}
			if (event.key === "ArrowLeft") {
				previousPage();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [nextPage, previousPage]);

	return (
		<TransformWrapper
			initialScale={1}
			disablePadding
			wheel={{ wheelDisabled: true }}
			doubleClick={{ disabled: true }}
			onZoomStop={(event) => {
				setScale(event.state.scale);
			}}
		>
			{({ zoomIn, zoomOut, resetTransform }) => (
				<div
					ref={containerRef}
					className={cn("relative w-full transition-colors", className)}
					onPointerEnter={() => setTimer()}
					{...props}
				>
					<TransformComponent
						wrapperClass={cn(scale > 1 && "cursor-grab active:cursor-grabbing")}
					>
						<button
							type="button"
							tabIndex={-1}
							aria-hidden="true"
							className={cn(
								"absolute inset-y-0 left-0 w-1/4",
								scale > 1 && "pointer-events-none",
								pageIndex === 0 ? "cursor-arrow-right" : "cursor-arrow-left",
							)}
							onClick={previousPage}
						/>
						<button
							type="button"
							tabIndex={-1}
							aria-hidden="true"
							className={cn(
								"absolute inset-y-0 right-0 w-3/4",
								scale > 1 && "pointer-events-none",
								pageIndex === images.length - 1
									? "cursor-arrow-left"
									: "cursor-arrow-right",
							)}
							onClick={nextPage}
						/>
						<img
							src={images[pageIndex].src}
							alt={m.component_slideshow_page({ index: pageIndex + 1 })}
							{...images[pageIndex].attributes}
							decoding="auto"
						/>
					</TransformComponent>
					<button
						type="button"
						className={cn(
							"absolute inset-x-0 bottom-0 h-12",
							isOpen && "hidden",
						)}
						onPointerEnter={() => {
							clearTimer();
							setIsOpen(true);
						}}
					/>
					<div
						className={cn(
							"absolute inset-x-0 bottom-0 transition-transform",
							"[&:has(button[data-state='open'])]:translate-y-0",
							isOpen ? "translate-y-0" : "translate-y-full",
						)}
						onPointerLeave={() => setTimer()}
					>
						<div className="space-y-1 bg-linear-to-t from-black/90 to-transparent p-2 sm:p-4">
							<div className="no-scrollbar hidden items-center space-x-1 overflow-x-auto sm:flex">
								{images.map((_, index) => (
									<Tooltip key={index.toString()}>
										<TooltipTrigger asChild>
											<button
												type="button"
												onClick={() => setPageIndex(index)}
												disabled={index === pageIndex}
												className="group min-w-8 flex-1 basis-8 py-2"
											>
												<span
													className={cn(
														"block h-1 w-full rounded-full",
														index <= pageIndex
															? "bg-white"
															: "bg-white/20 group-hover:bg-white/60",
													)}
												/>
											</button>
										</TooltipTrigger>
										<TooltipContent
											className={cn(
												"[&_svg]:hidden! relative overflow-hidden bg-black/80 p-2",
												!isOpen && "opacity-0",
											)}
											sideOffset={12}
										>
											<div className="aspect-video w-60 overflow-hidden rounded-sm">
												<img
													src={images[index].src}
													alt={m.component_slideshow_preview({
														index: index + 1,
													})}
													{...images[index].attributes}
												/>
											</div>
											<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
												<p className="font-medium text-sm text-white">
													{m.component_slideshow_page({ index: index + 1 })}
												</p>
											</div>
										</TooltipContent>
									</Tooltip>
								))}
							</div>
							<div className="flex items-center justify-between">
								<nav className="flex items-center space-x-2">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												size="icon"
												disabled={pageIndex === 0}
												onClick={() => previousPage()}
												className="bg-transparent hover:bg-white/10"
											>
												<Icons.chevronLeft className="size-5 text-white" />
												<span className="sr-only">
													{m.component_slideshow_previous()}
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent
											className={cn(
												"flex items-center gap-2 pr-1",
												!isOpen && "opacity-0",
											)}
										>
											{m.component_slideshow_previous()}
											<Kbd>⇦</Kbd>
										</TooltipContent>
									</Tooltip>
									<p className="hidden font-semibold text-sm text-white sm:flex">
										{pageIndex + 1} / {images.length}
									</p>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												size="icon"
												disabled={pageIndex === images.length - 1}
												onClick={() => nextPage()}
												className="bg-transparent hover:bg-white/10"
											>
												<Icons.chevronRight className="size-5 text-white" />
												<span className="sr-only">
													{m.component_slideshow_next()}
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent
											className={cn(
												"flex items-center gap-2 pr-1",
												!isOpen && "opacity-0",
											)}
										>
											{m.component_slideshow_next()}
											<Kbd>⇨</Kbd>
										</TooltipContent>
									</Tooltip>
								</nav>
								<div className="flex items-center space-x-2">
									<Popover>
										<Tooltip>
											<PopoverTrigger asChild>
												<TooltipTrigger asChild>
													<Button
														size="icon"
														className="hidden bg-transparent hover:bg-white/10 sm:flex"
													>
														<Icons.zoomIn className="size-5 text-white" />
														<span className="sr-only">
															{m.component_slideshow_zoom()}
														</span>
													</Button>
												</TooltipTrigger>
											</PopoverTrigger>
											<TooltipContent className={cn(!isOpen && "opacity-0")}>
												{m.component_slideshow_zoom()}
											</TooltipContent>
										</Tooltip>
										<PopoverContent
											align="end"
											className="flex w-96 items-center p-1"
										>
											<Slider
												min={1}
												max={9.99}
												step={0.01}
												value={[scale]}
												onValueChange={(value) => {
													const step = Math.log(value[0] / scale);
													if (value[0] > scale) {
														zoomIn(step, 0);
													} else {
														zoomOut(-step, 0);
													}
													setScale(value[0]);
												}}
												className="mx-2"
											/>
											<span className="font-medium">
												{Math.round(scale * 100)}%
											</span>
											<Separator
												orientation="vertical"
												className="mr-1 ml-2 h-6!"
											/>
											<Button
												variant="ghost"
												onClick={() => {
													resetTransform(0);
													setScale(1);
												}}
											>
												{m.component_slideshow_reset()}
											</Button>
										</PopoverContent>
									</Popover>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												size="icon"
												onClick={() => toggleFullscreen()}
												className="bg-transparent hover:bg-white/10"
											>
												{isFullscreen ? (
													<Icons.minimize className="size-5 text-white" />
												) : (
													<Icons.maximize className="size-5 text-white" />
												)}
												<span className="sr-only">
													{isFullscreen
														? m.component_slideshow_exit_fullscreen()
														: m.component_slideshow_fullscreen()}
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent className={cn(!isOpen && "opacity-0")}>
											{isFullscreen
												? m.component_slideshow_exit_fullscreen()
												: m.component_slideshow_fullscreen()}
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</TransformWrapper>
	);
};

export default Slideshow;
