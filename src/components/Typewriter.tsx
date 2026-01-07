import useTypewriter from "@/hooks/useTypewriter";

interface TypewriterProps {
	text: string;
	duration?: number;
	cursor?: string;
	className?: string;
}

const Typewriter = ({ text, cursor, duration, className }: TypewriterProps) => {
	const { text: _text, cursor: _cursor } = useTypewriter(text, {
		cursor,
		duration,
	});

	return (
		<>
			<span className={className}>{_text}</span>
			{_cursor && <span className={className}>{_cursor}</span>}
		</>
	);
};

export default Typewriter;
