/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/testimonials/route.ts - For GET all and POST new testimonials
import { dbConnect } from '@/utils/dbConnects';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../_models/testimonialModel';
import { checkRole } from '@/utils/roles';
import { uploadImageToCloudinary } from '@/utils/cloudinary';


export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const url = new URL(request.url);

        // Query parameters
        const featured = url.searchParams.get("featured") === "true";
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const search = url.searchParams.get("search") || "";
        const projectData = url.searchParams.get("projectData") === "true";
        const sortField = url.searchParams.get("sortField") || "createdAt";
        const sortOrder = url.searchParams.get("sortOrder") || "desc";
        const showAll = url.searchParams.get("all") === "true";

        const isAdmin = showAll ? await checkRole("admin") : false;

        const skip = (page - 1) * limit;

        // Build Mongoose query object
        const query: any = !isAdmin ? { isActive: true } : {};
        if (featured) query.isFeatured = true;

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { testimonial: { $regex: search, $options: "i" } },
            ];
        }

        const sort: any = {};
        sort[sortField] = sortOrder === "asc" ? 1 : -1;

        const total = await Testimonial.countDocuments(query);

        // Start query chain
        let testimonialQuery = Testimonial.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        // Conditionally populate project data
        if (projectData) {
            testimonialQuery = testimonialQuery.populate({
                path: 'projectID',
                model: 'Project', // Must match model name
                options: { 
                  strictPopulate: false // Bypass validation if needed
                }
              })
              .lean();;
        }

        const testimonials = await testimonialQuery.exec();

        //console.log("Testimonials:", testimonials);

        return NextResponse.json({
            testimonials,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        // Admin authentication
        const isAdmin = await checkRole("admin");
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await dbConnect();

        const formData = await request.formData();

        // Parse required fields
        const fields = {
            name: formData.get("name") as string,
            position: formData.get("position") as string || undefined,
            company: formData.get("company") as string,
            starCount: Number(formData.get("starCount") || 5),
            testimonial: formData.get("testimonial") as string,
            projectID: formData.get("projectID") as string || undefined,
            isFeatured: formData.get("isFeatured") === "true",
            isActive: formData.get("isActive") === "true" || true,
        };

        // Create testimonial first (without image URLs)
        const createdTestimonial = await Testimonial.create({
            ...fields,
            imgDisplayURL: "",
            imgDeleteURL: "",
        });

        // Upload image if file exists
        const file = formData.get("file");
        if (file && file instanceof Blob) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const blob = new Blob([buffer]);
            const { url, public_id } = await uploadImageToCloudinary(blob);

            // Update testimonial with image URLs
            createdTestimonial.imgDisplayURL = url;
            createdTestimonial.imgDeleteURL = public_id;
            await createdTestimonial.save();
        }

        return NextResponse.json({ testimonial: createdTestimonial }, { status: 201 });
    } catch (error: any) {
        console.error("Create Testimonial Error:", error);
        return NextResponse.json(
            { error: error.message || 'Failed to create testimonial' },
            { status: 500 }
        );
    }
}

