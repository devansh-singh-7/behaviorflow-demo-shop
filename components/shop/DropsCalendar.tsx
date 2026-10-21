import Link from "next/link";
import { Product } from "../../lib/products";

type DropsCalendarProps = {
  drops: Array<{ day: number; product: Product }>;
  year?: number;
  month?: number;
};

export function DropsCalendar({ drops, year = new Date().getFullYear(), month = new Date().getMonth() }: DropsCalendarProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) => index < firstDay ? null : index - firstDay + 1);
  const dropForDay = (day: number) => drops.find((drop) => drop.day === day);

  return <section className="drops-calendar" aria-labelledby="drops-calendar-title">
    <div className="calendar-heading">
      <div>
        <div className="issue">NO. 03 / THE DROP SCHEDULE</div>
        <h2 id="drops-calendar-title">Drops calendar</h2>
      </div>
      <p className="muted">{new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(new Date(year, month, 1))}</p>
    </div>
    <div className="calendar-weekdays" aria-hidden="true">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div>
    <div className="calendar-grid">
      {cells.map((day, index) => {
        const drop = day ? dropForDay(day) : undefined;
        const isToday = Boolean(day && isCurrentMonth && today.getDate() === day);
        return <div key={`${day || "empty"}-${index}`} className={`calendar-day${isToday ? " today" : ""}${drop ? " has-drop" : ""}`}>
          {day && <><span className="calendar-number">{day}</span>{drop && <Link href={`/product/${drop.product.id}`} className="calendar-drop" aria-label={`View ${drop.product.name} drop`}>{drop.product.emoji} <span>{drop.product.name}</span></Link>}</>}
        </div>;
      })}
    </div>
  </section>;
}
