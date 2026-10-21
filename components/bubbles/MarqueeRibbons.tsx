type MarqueeRibbonsProps = {
  first?: string;
  second?: string;
  className?: string;
};

export function MarqueeRibbons({
  first = "BIG FEELINGS · SMALL OBJECTS · EVERYDAY MAGIC ·",
  second = "MADE TO BE CLICKED · DESIGNED TO DELIGHT ·",
  className = "",
}: MarqueeRibbonsProps) {
  return <div className={`marquee-wrap ${className}`.trim()} aria-label="Scrolling store highlights">
    <div className="marquee" role="presentation"><span>{first} {first}</span></div>
    <div className="marquee reverse" role="presentation"><span>{second} {second}</span></div>
  </div>;
}
