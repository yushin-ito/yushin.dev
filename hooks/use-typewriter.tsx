import { useState, useEffect, useReducer } from "react";

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

interface UseTypewriterProps {
  text: string;
  cursor?: string;
  speed?: number;
}

const useTypewriter = ({ text, cursor, speed = 100 }: UseTypewriterProps) => {
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
    }, speed);

    return () => clearTimeout(timer);
  }, [state.count, text, speed]);

  return { text: state.text, cursor: isDone ? "" : cursor };
};

export default useTypewriter;
