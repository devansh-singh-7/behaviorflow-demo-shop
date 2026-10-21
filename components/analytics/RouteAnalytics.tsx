"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { init, page } from "../../lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();
  useEffect(() => { init(); page(pathname); }, [pathname]);
  return null;
}
