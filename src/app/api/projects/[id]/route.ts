// app/api/projects/[id]/route.ts
import { dbConnect } from "@/utils/dbConnects";
import { checkRole } from "@/utils/roles";
import { NextRequest, NextResponse } from "next/server";
import { Project } from "../../_models/ProjectModel";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/utils/cloudinary";


// GET a specific project by ID
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const isAdmin = await checkRole('admin')

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        // Connect to the database
        await dbConnect();

        const { id } = await context.params;
        const project = await Project.findById(id);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json(
            { error: "Failed to fetch project" },
            { status: 500 }
        );
    }
}

// UPDATE a project by ID
export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const isAdmin = await checkRole("admin");
        if (!isAdmin)
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

        await dbConnect();
        const { id } = await context.params;

        const formData = await req.formData();

        // Load the project
        const project = await Project.findById(id);
        if (!project)
            return NextResponse.json({ error: "Project not found" }, { status: 404 });

        // Handle file (if any)
        const file = formData.get("file") as Blob | null;
        if (file && file instanceof Blob) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const newBlob = new Blob([buffer]);

            // Delete previous image from Cloudinary
            if (project.imgDeleteURL) {
                await deleteImageFromCloudinary(project.imgDeleteURL);
            }

            // Upload new image
            const uploadRes = await uploadImageToCloudinary(newBlob);
            project.imgDisplayURL = uploadRes.url;
            project.imgDeleteURL = uploadRes.public_id;
        }

        // Update all fields
        const fields = [
            "title", "description", "category", "startDate", "deadline",
            "status", "clientName", "clientContact", "visible", "budget",
            "gitHubURL", "liveURL"
        ];
        for (const field of fields) {
            const value = formData.get(field);
            if (value !== null) {
                project[field] = value;
            }
        }

        // Handle techStacks[]
        const techStacks = formData.getAll("techStacks[]");
        if (techStacks.length) {
            project.techStacks = techStacks;
        }

        await project.save();
        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json(
            { error: "Failed to update project." },
            { status: 500 }
        );
    }
}


// DELETE a project by ID
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const isAdmin = await checkRole("admin");
        if (!isAdmin)
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

        await dbConnect();
        const { id } = await context.params;

        const project = await Project.findById(id);
        if (!project)
            return NextResponse.json({ error: "Project not found" }, { status: 404 });

        // Delete associated image
        if (project.imgDeleteURL) {
            await deleteImageFromCloudinary(project.imgDeleteURL);
        }

        // Delete the project
        await Project.findByIdAndDelete(id);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        );
    }
}



