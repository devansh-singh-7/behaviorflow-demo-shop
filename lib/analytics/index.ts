export type EventName = "page_view" | "product_viewed" | "add_to_cart" | "checkout_started" | "purchase_completed";
export type AnalyticsProperties = Record<string, string | number | boolean | null>;
export type AnalyticsEvent = {
  event_id: string;
  event_name: EventName;
  timestamp_client: string;
  session_id: string;
  anonymous_id: string;
  page_path: string;
  device_type: string;
  browser: string;
  traffic_source: string;
  properties: AnalyticsProperties;
};
export type FaultConfig = { f4a: boolean; f4b: boolean; f5: boolean; f6: number; f3: string; f8: boolean };

let initialized = false;
let queue: AnalyticsEvent[] = [];
let sessionId = "";
let anonymousId = "";
let faults: FaultConfig = { f4a: false, f4b: false, f5: false, f6: 0, f3: "", f8: false };
let groundTruthLast: string | null = null;

function uuid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function storageId(key: string) {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const value = uuid();
  window.localStorage.setItem(key, value);
  return value;
}

function browserName() {
  if (typeof navigator === "undefined") return "unknown";
  const userAgent = navigator.userAgent;
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

function applyFaults(events: AnalyticsEvent[]) {
  return events.filter((event) => {
    if (faults.f4a && event.event_name === "purchase_completed" && browserName() === "Safari") return false;
    if (faults.f4b && event.event_name === "add_to_cart" && typeof window !== "undefined" && window.innerWidth < 768) return false;
    return true;
  }).flatMap((event) => faults.f5 && event.event_name === "purchase_completed" ? [event, { ...event, event_id: uuid() }] : [event]);
}

function sendBatch() {
  if (!queue.length || typeof window === "undefined") return;
  const batch = applyFaults(queue);
  queue = [];
  if (!batch.length) return;
  const send = () => {
    batch.forEach((event) => window.dispatchEvent(new CustomEvent("bf:analytics", { detail: event })));
    void fetch("/api/mock-collector", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(batch) }).catch(() => { queue = [...batch, ...queue]; });
  };
  if (faults.f6 > 0) window.setTimeout(send, faults.f6 * 1000); else send();
}

export function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  sessionId = uuid();
  anonymousId = storageId("pop-supply-anonymous-id");
  const params = new URLSearchParams(window.location.search);
  faults = {
    f4a: params.get("f4a") === "on" || localStorage.getItem("lab-f4a") === "on",
    f4b: params.get("f4b") === "on" || localStorage.getItem("lab-f4b") === "on",
    f5: params.get("f5") === "on" || localStorage.getItem("lab-f5") === "on",
    f6: Math.max(0, Math.min(120, Number(params.get("f6") ?? localStorage.getItem("lab-f6") ?? 0))),
    f3: params.get("f3") || localStorage.getItem("lab-f3") || "",
    f8: params.get("f8") === "on" || localStorage.getItem("lab-f8") === "on",
  };
  window.setInterval(sendBatch, 1000);
}

export function page(path = window.location.pathname) {
  init();
  return track("page_view", { path, ...(faults.f8 ? { traffic_source: "bot" } : {}) });
}

export function track(eventName: EventName, properties: AnalyticsProperties = {}) {
  init();
  const event: AnalyticsEvent = {
    event_id: uuid(),
    event_name: eventName,
    timestamp_client: new Date().toISOString(),
    session_id: sessionId || "server",
    anonymous_id: anonymousId || "server",
    page_path: typeof window === "undefined" ? "/" : window.location.pathname,
    device_type: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
    browser: browserName(),
    traffic_source: faults.f3 || (faults.f8 ? "bot" : typeof document !== "undefined" ? document.referrer || "direct" : "direct"),
    properties,
  };
  queue.push(event);
  sendBatch();
  return event;
}

export function getFaults() { init(); return faults; }

export function setFault(id: keyof FaultConfig, value: boolean | number | string) {
  init();
  faults = { ...faults, [id]: value };
  if (typeof window !== "undefined") {
    const stored = value === false || value === "" || value === 0 ? null : String(value === true ? "on" : value);
    if (stored === null) localStorage.removeItem(`lab-${id}`); else localStorage.setItem(`lab-${id}`, stored);
    if (groundTruthLast !== `${id}:${String(value)}`) {
      groundTruthLast = `${id}:${String(value)}`;
      void fetch("/api/lab/ground-truth", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ fault_id: id, on: Boolean(value), parameters: { value }, timestamp: new Date().toISOString() }) });
    }
    window.dispatchEvent(new CustomEvent("bf:fault-change", { detail: faults }));
  }
}

export function botBurst() {
  init();
  for (let index = 0; index < 200; index += 1) window.setTimeout(() => track("page_view", { path: `/bot/${index}`, traffic_source: "bot" }), index * 25);
}
