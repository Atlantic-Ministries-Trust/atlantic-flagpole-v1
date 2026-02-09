import { redirect } from "next/navigation"

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export default function HolidayPage() {
  // Redirect to the holiday collection
  redirect("/collections/holiday-seasonal")
}
