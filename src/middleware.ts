import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()

  // Check for admin access
  if (isAdminRoute(req)) {
    const userRole = sessionClaims?.metadata?.role

    // Redirect if not admin
    if (userRole !== 'admin') {
      const url = new URL('/unauthorized', req.url)
      return NextResponse.redirect(url)
    }
  }

  // Allow request to proceed
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API and trpc routes
    '/(api|trpc)(.*)',
  ],
}
