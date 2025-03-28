import { RefObject, useCallback, useState } from "react";
import screenfull from "screenfull";

interface FullScreenOptions {
  video?: RefObject<
    HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
    }
  >;
}

const useFullscreen = (
  ref: RefObject<HTMLDivElement | null>,
  options: FullScreenOptions = {}
) => {
  const { video } = options;
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onWebkitEndFullscreen = useCallback(() => {
    setIsFullscreen(false);
    if (video?.current) {
      video.current.removeEventListener(
        "webkitendfullscreen",
        onWebkitEndFullscreen
      );
    }
  }, [video]);

  const onScreenfullChange = useCallback(() => {
    if (screenfull.isEnabled) {
      setIsFullscreen(screenfull.isFullscreen);
    }
  }, []);

  const enter = useCallback(() => {
    if (!ref.current) {
      return;
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(ref.current);
        setIsFullscreen(true);
      } catch {
        setIsFullscreen(false);
      }
      screenfull.on("change", onScreenfullChange);
    } else if (video && video.current && video.current.webkitEnterFullscreen) {
      video.current.webkitEnterFullscreen();
      video.current.addEventListener(
        "webkitendfullscreen",
        onWebkitEndFullscreen
      );
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  }, [ref, video, onScreenfullChange, onWebkitEndFullscreen]);

  const exit = useCallback(() => {
    setIsFullscreen(false);
    if (screenfull.isEnabled) {
      screenfull.off("change", onScreenfullChange);
      screenfull.exit();
    } else if (video?.current?.webkitExitFullscreen) {
      video.current.removeEventListener(
        "webkitendfullscreen",
        onWebkitEndFullscreen
      );
      video.current.webkitExitFullscreen();
    }
  }, [video, onScreenfullChange, onWebkitEndFullscreen]);

  return { isFullscreen, enter, exit };
};

export default useFullscreen;
