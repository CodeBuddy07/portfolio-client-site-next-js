// app/api/admin/projects/route.ts

import { checkRole } from '@/utils/roles'
import { NextResponse } from 'next/server'


export async function GET() {
  const isAdmin = await checkRole('admin')

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  // Proceed with actual logic
  const projects = [
    { id: 1, name: 'Secret Admin Project' },
    { id: 2, name: 'Another Secret One' },
  ]

  return NextResponse.json(projects)
}
