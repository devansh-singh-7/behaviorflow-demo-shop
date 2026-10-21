"use client";

import { CSSProperties, KeyboardEvent, useEffect, useMemo, useState } from "react";

type BubbleFieldProps = {
  count?: number;
  className?: string;
  labels?: string[];
  onPop?: (index: number) => void;
};

type BubbleState = "ready" | "burst";

const positions = [
  [8, 17], [19, 70], [32, 46], [47, 83], [61, 12], [76, 62],
  [87, 28], [12, 91], [39, 8], [69, 42], [25, 28], [55, 72],
  [83, 78], [5, 52], [44, 92], [72, 6], [29, 88], [91, 52],
  [58, 24], [15, 40], [48, 30], [80, 91], [35, 66], [66, 88],
];

export function BubbleField({ count = 10, className = "", labels = [], onPop }: BubbleFieldProps) {
  const [states, setStates] = useState<BubbleState[]>([]);
  const safeCount = Math.min(Math.max(count, 0), 24);
  const bubbles = useMemo(() => positions.slice(0, safeCount), [safeCount]);

  useEffect(() => setStates(Array.from({ length: safeCount }, () => "ready")), [safeCount]);

  const pop = (index: number) => {
    setStates((current) => current.map((state, item) => item === index ? "burst" : state));
    onPop?.(index);
    window.setTimeout(() => setStates((current) => current.map((state, item) => item === index ? "ready" : state)), 2000);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pop(index);
    }
  };

  return <div className={`bubble-field ${className}`.trim()} aria-label="Interactive floating bubbles">
    {bubbles.map(([top, left], index) => <button
      key={`${index}-${states[index] || "ready"}`}
      type="button"
      className={`pop-bubble bubble-${index % 3 + 1}${states[index] === "burst" ? " popped" : ""}`}
      style={{ top: `${top}%`, left: `${left}%`, "--bubble-index": index } as CSSProperties}
      aria-label={labels[index] || `Pop bubble ${index + 1}`}
      onClick={() => pop(index)}
      onKeyDown={(event) => handleKeyDown(event, index)}
    />)}
  </div>;
}
