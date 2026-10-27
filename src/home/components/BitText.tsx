import { useEffect, useRef, useState } from "react";

type BitTextProps = {
  text: string;
  className?: string;
};

const frames = 8;

export default function BitText({ text, className = "" }: BitTextProps) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const restore = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setDisplay(text);
  };

  const scramble = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    restore();
    let frame = 0;
    timer.current = setInterval(() => {
      frame += 1;
      if (frame >= frames) {
        restore();
        return;
      }

      const chance = (1 - frame / frames) * 0.65;
      setDisplay(Array.from(text, (character) =>
        /[\p{L}\p{N}]/u.test(character) && Math.random() < chance
          ? (Math.random() < 0.5 ? "0" : "1")
          : character,
      ).join(""));
    }, 38);
  };

  return (
    <span className={`bit-text ${className}`} onPointerEnter={scramble} onPointerLeave={restore}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
