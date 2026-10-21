export function EventLog({ events }: { events: string[] }) {
  return <ol className="event-log">{events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}</ol>;
}
