type BubbleFooterProps = {
  name?: string;
  tagline?: string;
  year?: number;
  className?: string;
};

export function BubbleFooter({ name = "POP! SUPPLY CO.", tagline = "Good things for curious people.", year = 2026, className = "" }: BubbleFooterProps) {
  return <footer className={`bubble-footer ${className}`.trim()}>
    <div className="bubble-footer-name">{name}</div>
    <p>{tagline}</p>
    <div className="bubble-footer-mark" aria-hidden="true">●</div>
    <small>Made for BehaviorFlow testing · {year}</small>
  </footer>;
}
