import { NextResponse } from "next/server";
import { Skill } from "@/app/api/_models/SkillModel";
import { dbConnect } from "@/utils/dbConnects";


export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({ visible: true }).sort({ percentage: -1 });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}


