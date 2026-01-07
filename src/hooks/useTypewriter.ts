import { useEffect, useReducer, useState } from "react";

interface State {
	text: string;
	count: number;
}

type Action = { type: "TYPE"; payload: string } | { type: "COUNT" };

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "TYPE":
			return {
				...state,
				text: action.payload.substring(0, state.text.length + 1),
			};
		case "COUNT":
			return {
				...state,
				count: state.count + 1,
			};
		default:
			return state;
	}
};

interface TypewriterOptions {
	cursor?: string;
	duration?: number;
}

const useTypewriter = (text: string, options: TypewriterOptions) => {
	const { cursor = "", duration = 100 } = options;
	const [state, dispatch] = useReducer(reducer, { text: "", count: 0 });
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		if (state.count >= text.length) {
			setIsDone(true);
			return;
		}

		const timer = setTimeout(() => {
			dispatch({ type: "TYPE", payload: text });
			dispatch({ type: "COUNT" });
		}, duration);

		return () => clearTimeout(timer);
	}, [state.count, text, duration]);

	return { text: state.text, cursor: isDone ? "" : cursor };
};

export default useTypewriter;
