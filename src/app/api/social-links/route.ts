/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/utils/dbConnects";

import { NextRequest, NextResponse } from "next/server";
import { checkRole } from "@/utils/roles";
import { SocialLink } from "../_models/SocialLinksModel";



export async function GET(req: NextRequest) {
    try {
      await dbConnect();
  
      const { searchParams } = new URL(req.url);
      const visibleParam = searchParams.get("visible");
  
      const filter: any = {};
      if (visibleParam !== null) {
        filter.visible = visibleParam === "true";
      }
  
      const links = await SocialLink.find(filter).sort({ createdAt: -1 });
      return NextResponse.json(links);
    } catch (error) {
      console.error("Error fetching social links:", error);
      return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
    }
  }
// POST a new link (admin only)
export async function POST(req: Request) {
    try {
        const isAdmin = await checkRole("admin");
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await dbConnect();
        const body = await req.json();

        const newLink = await SocialLink.create(body);
        return NextResponse.json(newLink);
    } catch (error) {
        console.error("Error creating social link:", error);
        return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
    }
}
