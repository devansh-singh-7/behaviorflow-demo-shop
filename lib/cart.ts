export type CartItem = { productId: string; quantity: number };
export const CART_KEY = "behaviorflow-cart";
export const readCart = (): CartItem[] => { if (typeof window === "undefined") return []; try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } };
export const saveCart = (items: CartItem[]) => localStorage.setItem(CART_KEY, JSON.stringify(items));
