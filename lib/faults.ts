export type FaultMode = "slow" | "error" | "empty";

export const faultModes: Record<FaultMode, string> = {
  slow: "Add a 2 second delay to requests.",
  error: "Pretend the catalog endpoint failed.",
  empty: "Show the zero-results experience.",
};
