"use client";

import useTypewriter from "@/hooks/use-typewriter";

interface TypewriterProps {
  children: string;
  speed?: number;
  cursor?: string;
  className?: string;
}

const Typewriter = ({
  children,
  cursor,
  speed,
  className,
}: TypewriterProps) => {
  const { text: _text, cursor: _cursor } = useTypewriter(children, {
    cursor,
    speed,
  });

  return (
    <>
      <span className={className}>{_text}</span>
      {_cursor && <span className={className}>{_cursor}</span>}
    </>
  );
};

export default Typewriter;
