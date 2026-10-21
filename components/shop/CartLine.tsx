export function CartLine({ name, quantity }: { name: string; quantity: number }) {
  return <div className="cart-line"><span>{name}</span><strong>× {quantity}</strong></div>;
}
