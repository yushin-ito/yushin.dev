import { useCallback, useEffect, useRef } from "react";

const useTimer = (callback: () => void, ms: number = 0) => {
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const set = useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			callback();
		}, ms);
	}, [callback, ms]);

	const clear = useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = null;
	}, []);

	useEffect(() => clear, [clear]);

	return [clear, set] as const;
};

export default useTimer;
