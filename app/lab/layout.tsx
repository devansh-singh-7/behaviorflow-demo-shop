import { notFound } from "next/navigation";

export const metadata = { robots: { index: false, follow: false } };
export default function LabLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_LAB !== "true") notFound();
  return children;
}
