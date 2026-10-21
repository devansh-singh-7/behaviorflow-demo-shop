import "./globals.css";
import Link from "next/link";
import { PaletteSwitcher } from "../components/theme/PaletteSwitcher";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { BubbleFooter } from "../components/bubbles/BubbleFooter";
import { RouteAnalytics } from "../components/analytics/RouteAnalytics";
export const metadata = { title: "Pop Supply Co. | BehaviorFlow", description: "A colorful store for testing analytics journeys." };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-palette="sunrise" data-theme="light">
    <body><ThemeProvider><RouteAnalytics /><header className="shell nav"><Link href="/" className="brand">POP<span>!</span> SUPPLY CO.</Link><nav className="navlinks"><Link href="/shop">Shop</Link><Link href="/design">Design</Link><Link href="/lab">Lab</Link><Link href="/cart" className="pill">Bag <span aria-label="items">🛍</span></Link><PaletteSwitcher /><ThemeToggle /></nav></header><main>{children}</main><BubbleFooter /></ThemeProvider></body>
  </html>;
}
