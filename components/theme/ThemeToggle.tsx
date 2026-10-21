"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";
  return <button className="icon-button" type="button" aria-label="Toggle light and dark mode" onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? "☼" : "☾"}</button>;
}
