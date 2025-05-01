// app/api/projects/route.ts
import { dbConnect } from "@/utils/dbConnects";
import { NextRequest, NextResponse } from "next/server";
import { Project } from "../_models/ProjectModel";
import { checkRole } from "@/utils/roles";
import { uploadImageToCloudinary } from "@/utils/cloudinary";


export async function GET(req: NextRequest) {
  try {
    const isAdmin = await checkRole('admin')

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Connect to the database
    await dbConnect();

    // Get query parameters
    const url = new URL(req.url);
    const visibility = url.searchParams.get("visible");
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    
    // Add filters if they exist
    if (visibility !== null) {
      query.visible = visibility === "true";
    }
    
    if (category) {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    }

    // Fetch projects
    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ projects }, { status: 200 });
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

