import { useLayoutEffect, useRef } from "react";

type RevealTextProps = {
  text: string;
  diffusion?: boolean;
  delay?: number;
  instant?: boolean;
};

// Keep the character grid fixed while noise resolves into the original text.
// One text node avoids thousands of animated DOM elements for the portrait.
export default function RevealText({ text, diffusion = false, delay = 0, instant = false }: RevealTextProps) {
  const output = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = output.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (instant || preference.matches) { element.textContent = text; return; }

    const characters = Array.from(text);
    const noise = diffusion ? ".:·+*#" : "01_/:";
    const duration = diffusion ? 1500 : 650;
    const started = performance.now();
    const finish = () => {
      clearInterval(timer);
      element.textContent = text;
    };
    const draw = () => {
      const elapsed = performance.now() - started - delay;
      if (elapsed >= duration) { finish(); return; }
      const progress = Math.max(0, elapsed / duration);
      const frame = Math.floor(Math.max(0, elapsed) / 40);
      element.textContent = characters.map((character, index) => {
        if (/\s/.test(character)) return character;
        // A dispersed, deterministic threshold makes the portrait emerge all over
        // rather than scan line by line. Text resolves from left to right.
        const threshold = diffusion ? ((index * 7919) % 997) / 997 : index / characters.length;
        if (progress >= threshold * .8 + .2) return character;
        if (elapsed < 0 || progress < threshold * .65) return " ";
        return noise[(index + frame * 7) % noise.length];
      }).join("");
    };
    const timer = setInterval(draw, 40);
    draw();
    const onPreference = () => { if (preference.matches) finish(); };
    preference.addEventListener("change", onPreference);
    return () => { clearInterval(timer); preference.removeEventListener("change", onPreference); };
  }, [text, diffusion, delay, instant]);

  return <span className="reveal-text"><span className="sr-only">{text}</span><span ref={output} aria-hidden="true">{text}</span></span>;
}
