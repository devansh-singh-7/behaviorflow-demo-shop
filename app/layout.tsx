import "./globals.css";
import Link from "next/link";
import { PaletteSwitcher } from "../components/theme/PaletteSwitcher";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { ThemeProvider } from "../components/theme/ThemeProvider";
export const metadata = { title: "Pop Supply Co. | BehaviorFlow", description: "A colorful store for testing analytics journeys." };
export default function Layout({ children }: { children: React.ReactNode }) { return <ThemeProvider><header className="shell nav"><Link href="/" className="brand">POP<span>!</span> SUPPLY CO.</Link><nav className="navlinks"><Link href="/shop">Shop</Link><Link href="/design">Design</Link><Link href="/lab">Lab</Link><Link href="/cart" className="pill">Bag <span aria-label="items">🛍</span></Link><PaletteSwitcher /><ThemeToggle /></nav></header><main>{children}</main><footer className="poster-footer"><div className="shell footer-content"><div><div className="brand">POP<span>!</span> SUPPLY CO.</div><p>Good things for curious people.</p></div><div className="footer-bubble">●</div><small>Made for BehaviorFlow testing · 2026</small></div></footer></ThemeProvider> }
