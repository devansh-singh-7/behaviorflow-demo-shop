export type AnalyticsEvent = { name: string; properties?: Record<string, unknown>; at: string };
export async function track(name: string, properties?: Record<string, unknown>) {
  const event = { name, properties, at: new Date().toISOString() };
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("bf:analytics", { detail: event }));
  try { await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || "/api/collect", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(event) }); } catch { /* analytics must never block a flow */ }
  return event;
}
