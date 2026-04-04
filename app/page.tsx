/**
 * app/page.tsx
 * Root path (/) — permanently redirected to the default locale (/en).
 * Actual page rendering is handled by app/[locale]/page.tsx.
 * The middleware.ts also handles this redirect at the edge layer.
 */
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
