// app/api/social-links/[id]/route.ts
import { dbConnect } from "@/utils/dbConnects";
import { checkRole } from "@/utils/roles";
import { NextResponse } from "next/server";
import { SocialLink } from "../../_models/SocialLinksModel";


export async function PUT(
    req: Request, 
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    const {id} = await context.params

    const updated = await SocialLink.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();

    const deleted = await SocialLink.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
