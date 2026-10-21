"use client";

import { useEffect, useState } from "react";
import { botBurst, FaultConfig, getFaults, setFault } from "../../lib/analytics";

export default function Lab() {
  const [faults, setFaults] = useState<FaultConfig>({ f4a: false, f4b: false, f5: false, f6: 0, f3: "", f8: false });
  const [events, setEvents] = useState<string[]>([]);
  useEffect(() => {
    setFaults(getFaults());
    const onFault = (event: Event) => setFaults((event as CustomEvent<FaultConfig>).detail);
    const onEvent = (event: Event) => setEvents((current) => [`${new Date().toISOString()} ${JSON.stringify((event as CustomEvent).detail)}`, ...current].slice(0, 50));
    window.addEventListener("bf:fault-change", onFault);
    window.addEventListener("bf:analytics", onEvent);
    return () => { window.removeEventListener("bf:fault-change", onFault); window.removeEventListener("bf:analytics", onEvent); };
  }, []);
  const toggle = (id: "f4a" | "f4b" | "f5" | "f8") => setFault(id, !faults[id] as boolean);
  return <section className="shell section"><div className="pagehead"><div className="eyebrow">Hidden QA playground · noindex</div><h1>Fault lab</h1><p className="lead">Faults change analytics only. The shop UI always behaves normally.</p></div><div className="lab"><h2>Fault controls</h2><div className="lab-controls">{[["f4a","F4a · Drop Safari purchases"],["f4b","F4b · Drop mobile add-to-cart"],["f5","F5 · Duplicate purchases"],["f8","F8 · Bot burst"]].map(([id,label])=><label key={id}><input type="checkbox" checked={Boolean(faults[id as keyof FaultConfig])} onChange={() => toggle(id as "f4a" | "f4b" | "f5" | "f8")} /> {label}</label>)}<label>F6 · Delay sends: <input type="range" min="0" max="120" value={faults.f6} onChange={(event) => setFault("f6", Number(event.target.value))} /> {faults.f6}s</label><label>F3 · Traffic source <select value={faults.f3} onChange={(event) => setFault("f3", event.target.value)}><option value="">Direct/referrer</option><option value="paid-social">paid-social</option><option value="newsletter">newsletter</option><option value="bot">bot</option></select></label><button className="btn" type="button" onClick={botBurst}>Fire 200 bot page views</button></div></div><section className="lab event-log-panel"><h2>Sent events · last 50</h2><ol>{events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}</ol></section><div className="actions"><a className="btn secondary" href="/api/mock-collector?download=events">Download events log</a><a className="btn secondary" href="/api/lab/ground-truth?download=ground-truth">Download ground truth</a></div></section>;
}
