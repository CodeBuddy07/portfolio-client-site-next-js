import { dbConnect } from "@/utils/dbConnects";
import { NextResponse } from "next/server";
import { EmailModel } from "../../_models/EmailModel";
import { checkRole } from "@/utils/roles";

// DELETE email
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse>{
  try {

    const isAdmin = await checkRole("admin");

      if (!isAdmin) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

    await dbConnect();

    const { id } = await context.params;

    const deletedEmail = await EmailModel.findByIdAndDelete(id);

    if (!deletedEmail) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    return NextResponse.json(deletedEmail);
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json(
      { error: "Failed to delete email" },
      { status: 500 }
    );
  }
}


// PATCH - Update email (mark as read/archive)
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse>{
  try {

      const isAdmin = await checkRole("admin");

      if (!isAdmin) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      await dbConnect();

      const { id } = await context.params;

      const { isRead, isArchived } = await request.json();

      const updatedEmail = await EmailModel.findByIdAndUpdate(
          id,
          { isRead, isArchived },
          { new: true }
      );

      if (!updatedEmail) {
          return NextResponse.json({ error: "Email not found" }, { status: 404 });
      }

      return NextResponse.json(updatedEmail);
  } catch (error) {
      console.error("Error updating email:", error);
      return NextResponse.json(
          { error: "Failed to update email" },
          { status: 500 }
      );
  }
}