import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const SECRET = process.env.SHOPIFY_APP_API_SECRET_KEY || ""

async function verify(raw: string, sig: string | null) {
  if (!sig || !SECRET) return false
  try {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(SECRET)
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify", "sign"]
    )

    const signature = Uint8Array.from(atob(sig), (c) => c.charCodeAt(0))
    const data = encoder.encode(raw)

    return await crypto.subtle.verify("HMAC", key, signature, data)
  } catch (error) {
    console.error("[v0] Webhook verification error:", error)
    return false
  }
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const sig = req.headers.get("x-shopify-hmac-sha256")
  const topic = req.headers.get("x-shopify-topic")

  if (!(await verify(raw, sig))) {
    console.log("[v0] Webhook verification failed")
    return new NextResponse("Invalid", { status: 401 })
  }

  const payload = JSON.parse(raw || "{}")

  try {
    console.log(`[v0] Webhook received: ${topic}`)
    switch (topic) {
      case "products/create":
      case "products/update":
        if (payload?.handle) {
          revalidatePath(`/products/${payload.handle}`)
          console.log(`[v0] Revalidated product: ${payload.handle}`)
        }
        revalidateTag("products")
        revalidateTag(`product-${payload?.handle}`)
        break
      case "products/delete":
        revalidateTag("products")
        console.log("[v0] Revalidated products after delete")
        break
      case "collections/create":
      case "collections/update":
      case "collections/delete":
        if (payload?.handle) {
          revalidatePath(`/collections/${payload.handle}`)
          console.log(`[v0] Revalidated collection: ${payload.handle}`)
        }
        revalidateTag("collections")
        revalidateTag(`collection-${payload?.handle}`)
        break
      default:
        console.log(`[v0] Unhandled webhook topic: ${topic}`)
        break
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[v0] Webhook error:", e)
    return new NextResponse("Error", { status: 500 })
  }
}
