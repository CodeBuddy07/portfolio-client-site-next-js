/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/testimonials/feature/[id]/route.ts - For toggling featured status
import Testimonial from '@/app/api/_models/testimonialModel';
import { dbConnect } from '@/utils/dbConnects';
import { checkRole } from '@/utils/roles';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Admin authentication
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    await dbConnect();
    
    const { id } = context.params;
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    // Toggle featured status
    testimonial.isFeatured = !testimonial.isFeatured;
    await testimonial.save();
    
    return NextResponse.json(testimonial);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update featured status' },
      { status: 500 }
    );
  }
}