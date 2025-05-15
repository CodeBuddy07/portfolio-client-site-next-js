import { Ghost } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <Ghost className="w-12 h-12 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold mb-2">404 – Not Found</h1>
      <p className="text-muted-foreground mb-6">The page you’re looking for doesn’t exist.</p>
      <Button variant="outline" asChild>
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  )
}
