// app/trigger-error/page.tsx
'use client'

export default function TriggerErrorPage() {
  // This will crash the page on purpose
  throw new Error("💥 Ruhul manually triggered an error!")

  // Unreachable, but required for TS
  return <div>You&apos;ll never see this.</div>
}
