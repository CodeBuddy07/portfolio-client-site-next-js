import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/app/api/_models/SkillModel";
import { checkRole } from "@/utils/roles";
import { dbConnect } from "@/utils/dbConnects";
 // Assuming this exists

// 🔁 GET all (Admin)
export async function GET() {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    await dbConnect();
    const skills = await Skill.find().sort({ createdAt: -1 });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// ➕ POST (Create)
export async function POST(req: NextRequest) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    await dbConnect();
    const body = await req.json();
    const newSkill = await Skill.create(body);
    return NextResponse.json(newSkill);
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
