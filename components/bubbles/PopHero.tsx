"use client";

import { useState } from "react";

const seed = [
  ["18%", "18%", "var(--bubble-1)", "small orange bubble"],
  ["77%", "12%", "var(--bubble-2)", "pink bubble"],
  ["88%", "58%", "var(--bubble-3)", "yellow bubble"],
  ["62%", "75%", "var(--bubble-1)", "coral bubble"],
  ["7%", "70%", "var(--bubble-2)", "rose bubble"],
  ["43%", "8%", "var(--bubble-3)", "sun bubble"],
];

export function PopHero() {
  const [popped, setPopped] = useState<number[]>([]);
  const pop = (index: number) => {
    setPopped((current) => [...current, index]);
    window.setTimeout(() => setPopped((current) => current.filter((item) => item !== index)), 500);
  };
  return <div className="bubble-field" aria-label="Interactive bubbles">
    {seed.map(([top, left, bubble, label], index) => <button
      key={`${index}-${popped.includes(index)}`}
      className={`pop-bubble${popped.includes(index) ? " popped" : ""}`}
      style={{ top, left, "--bubble": bubble, "--size": `${34 + (index % 3) * 11}px` } as React.CSSProperties}
      aria-label={`Pop ${label}`}
      onClick={() => pop(index)}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") pop(index); }}
    />)}
  </div>;
}
