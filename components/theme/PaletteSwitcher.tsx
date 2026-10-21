"use client";

import { useEffect, useState } from "react";

const palettes = [
  ["sunrise", "Sunrise", "#ee552f"],
  ["lagoon", "Lagoon", "#087f8c"],
  ["grape", "Grape", "#7135c9"],
  ["mint", "Mint", "#197a4a"],
] as const;

export function PaletteSwitcher() {
  const [palette, setPalette] = useState("sunrise");
  useEffect(() => {
    const stored = localStorage.getItem("pop-supply-palette") || "sunrise";
    document.documentElement.dataset.palette = stored;
    setPalette(stored);
  }, []);
  const select = (next: string) => {
    document.documentElement.dataset.palette = next;
    localStorage.setItem("pop-supply-palette", next);
    setPalette(next);
  };
  return <div className="palette-picker" aria-label="Color palette">
    {palettes.map(([id, label, color]) => <button key={id} type="button" aria-label={`${label} palette`} aria-pressed={palette === id} className="palette-dot" style={{ background: color }} onClick={() => select(id)} />)}
  </div>;
}
