'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import { Ban } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function UnauthorizedPage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!isLoaded) return

    // If no user is signed in, redirect to /sign-in immediately
    if (!isSignedIn) {
      router.replace('/sign-in')
      return
    }

    // If user is signed in but not authorized
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval)
          signOut().then(() => router.push('/'))
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isSignedIn, isLoaded, router, signOut])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md text-center border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-destructive">
            <Ban className="w-6 h-6" />
            Unauthorized Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You don’t have permission to view this page.
          </p>

          <Progress value={(10 - countdown) * 10} className="h-2" />

          <p className="text-sm text-muted-foreground">
            {isSignedIn
              ? <>
                  Logging out in <span className="font-semibold">{countdown}</span>{' '}
                  second{countdown === 1 ? '' : 's'}...
                </>
              : 'Redirecting to sign-in...'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
