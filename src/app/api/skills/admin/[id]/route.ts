import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/app/api/_models/SkillModel";
import { checkRole } from "@/utils/roles";
import { dbConnect } from "@/utils/dbConnects";


// 🔁 PUT (Update)
export async function PUT(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const {id} = await context.params
    await dbConnect();
    const body = await req.json();
    const updated = await Skill.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// ❌ DELETE
export async function DELETE(
    _: NextRequest, 
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const {id} = await context.params
    await dbConnect();
    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}




