import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth()
    if (sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }
  return NextResponse.next()
})

export const config = {
  // Clerk only needs to see the admin surface and the API. The public site
  // (/, /work, /work/[slug]) never touches it, so it stays static and never
  // depends on Clerk keys or network at request time.
  matcher: ['/dashboard(.*)', '/sign-in(.*)', '/unauthorized', '/api/(.*)'],
}
