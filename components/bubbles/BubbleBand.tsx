type BubbleBandProps = {
  marks?: string[];
  className?: string;
};

export function BubbleBand({ marks = ["POP SUPPLY CO.", "GOOD THINGS ONLY", "✦"], className = "" }: BubbleBandProps) {
  const repeated = [...marks, ...marks];
  return <div className={`bubble-band ${className}`.trim()} aria-label={marks.join(", ")}>
    <div className="bubble-band-track">{repeated.map((mark, index) => <span key={`${mark}-${index}`}>{mark}</span>)}</div>
  </div>;
}
