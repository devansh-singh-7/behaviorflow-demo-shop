type BubbleWordmarkProps = {
  lines?: string[];
  as?: "h1" | "div";
  className?: string;
};

export function BubbleWordmark({ lines = ["Pop", "Supply", "Co."], as: Tag = "div", className = "" }: BubbleWordmarkProps) {
  return <Tag className={`bubble-wordmark ${className}`.trim()} aria-label={lines.join(" ")}>
    {lines.map((line, index) => <span key={`${line}-${index}`} className={`bubble-wordmark-line line-${index + 1}`}>{line}</span>)}
  </Tag>;
}
