/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/testimonials/[id]/route.ts - For GET, PUT, DELETE specific testimonial
import { dbConnect } from '@/utils/dbConnects';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../_models/testimonialModel';
import { checkRole } from '@/utils/roles';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from '@/utils/cloudinary';


export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = context.params;
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(testimonial);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
      
      const formData = await request.formData();
      
      // Parse fields
      const fields = {
        name: formData.get("name") as string,
        position: formData.get("position") as string || undefined,
        company: formData.get("company") as string,
        starCount: Number(formData.get("starCount") || testimonial.starCount),
        testimonial: formData.get("testimonial") as string,
        projectID: formData.get("projectID") as string || undefined,
        isFeatured: formData.get("isFeatured") === "true",
        isActive: formData.get("isActive") === "true",
      };
      
      // Update testimonial with the new fields
      Object.assign(testimonial, fields);
      
      // Handle file upload if present
      const file = formData.get("file");
      if (file && file instanceof Blob) {
        // Delete previous image if exists
        if (testimonial.imgDeleteURL) {
          await deleteImageFromCloudinary(testimonial.imgDeleteURL);
        }
        
        // Upload new image
        const buffer = Buffer.from(await file.arrayBuffer());
        const blob = new Blob([buffer]);
        const { url, public_id } = await uploadImageToCloudinary(blob);
        
        testimonial.imgDisplayURL = url;
        testimonial.imgDeleteURL = public_id;
      }
      
      // Save the updated testimonial
      await testimonial.save();
      
      return NextResponse.json({ testimonial });
    } catch (error: any) {
      console.error("Update Testimonial Error:", error);
      return NextResponse.json(
        { error: error.message || 'Failed to update testimonial' },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(
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
      
      // Delete image from Cloudinary if exists
      if (testimonial.imgDeleteURL) {
        await deleteImageFromCloudinary(testimonial.imgDeleteURL);
      }
      
      // Delete the testimonial
      await Testimonial.findByIdAndDelete(id);
      
      return NextResponse.json(
        { message: 'Testimonial deleted successfully' },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Delete Testimonial Error:", error);
      return NextResponse.json(
        { error: error.message || 'Failed to delete testimonial' },
        { status: 500 }
      );
    }
  }