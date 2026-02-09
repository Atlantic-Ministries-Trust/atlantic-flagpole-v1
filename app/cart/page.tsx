import { CartPageClient } from "@/components/cart/cart-page-client"

export const runtime = 'edge';

export const dynamic = "force-dynamic"

export default function CartPage() {
  return <CartPageClient />
}
