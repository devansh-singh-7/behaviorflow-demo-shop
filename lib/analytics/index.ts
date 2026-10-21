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

let initialized = false;
let queue: AnalyticsEvent[] = [];
let sessionId = "";
let anonymousId = "";

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

function sendBatch() {
  if (!queue.length || typeof window === "undefined") return;
  const batch = queue;
  queue = [];
  void fetch("/api/mock-collector", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(batch) }).catch(() => { queue = [...batch, ...queue]; });
}

export function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  sessionId = uuid();
  anonymousId = storageId("pop-supply-anonymous-id");
  window.setInterval(sendBatch, 1000);
}

export function page(path = window.location.pathname) {
  init();
  return track("page_view", { path });
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
    traffic_source: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
    properties,
  };
  queue.push(event);
  sendBatch();
  return event;
}
