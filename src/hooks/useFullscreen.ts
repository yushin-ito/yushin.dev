import { type RefObject, useCallback, useEffect, useState } from "react";

const useFullscreen = (ref: RefObject<HTMLDivElement | null>) => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = useCallback(async () => {
		if (!ref.current) {
			return;
		}

		if (!isFullscreen) {
			await ref.current.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	}, [ref, isFullscreen]);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	return { isFullscreen, toggleFullscreen };
};

export default useFullscreen;
