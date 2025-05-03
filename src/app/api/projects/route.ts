/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/projects/route.ts
import { dbConnect } from "@/utils/dbConnects";
import { NextRequest, NextResponse } from "next/server";
import { Project } from "../_models/ProjectModel";
import { checkRole } from "@/utils/roles";
import { uploadImageToCloudinary } from "@/utils/cloudinary";



// API route with search, filters, and pagination
export async function GET(req: NextRequest) {
  try {
    const isAdmin = await checkRole("admin");

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();

    const url = new URL(req.url);
    const visibility = url.searchParams.get("visible");
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search")?.trim();
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Build query object
    const query: Record<string, any> = {};

    if (visibility !== null) {
      query.visible = visibility === "true";
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [projects, total] = await Promise.all([
      Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    console.log("Projects fetched:", projects.length, "Total:", total , search);

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    await dbConnect();

    const formData = await req.formData();

    // 1️⃣ Parse required fields
    const fields = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      startDate: formData.get("startDate") as string,
      deadline: formData.get("deadline") as string,
      clientName: formData.get("clientName") as string,
      clientContact: formData.get("clientContact") as string,
      visible: formData.get("visible") === "true",
      status: (formData.get("status") as string) || "pending",
      budget: Number(formData.get("budget") || 0),
      liveURL: formData.get("liveURL") as string,
      gitHubURL: formData.get("gitHubURL") as string,
      techStacks: formData.getAll("techStacks[]") as string[],
    };

 



    // 3️⃣ Create project first (without image URLs)
    const createdProject = await Project.create({
      ...fields,
      imgDisplayURL: "",
      imgDeleteURL: "",
    });

    // 4️⃣ Upload image if file exists
    const file = formData.get("file");
    if (file && file instanceof Blob) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const blob = new Blob([buffer]);
      const { url, public_id } = await uploadImageToCloudinary(blob);

      // 5️⃣ Update project with image URLs
      createdProject.imgDisplayURL = url;
      createdProject.imgDeleteURL = public_id;
      await createdProject.save();
    }

    return NextResponse.json({ project: createdProject }, { status: 201 });
  } catch (err) {
    console.error("Create Project Error:", err);
    return NextResponse.json({ error: "Project creation failed" }, { status: 500 });
  }
}

