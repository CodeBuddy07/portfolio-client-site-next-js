/* eslint-disable @typescript-eslint/no-explicit-any */

import { dbConnect } from "@/utils/dbConnects";
import { NextResponse } from "next/server";
import { EmailModel } from "../_models/EmailModel";
import { checkRole } from "@/utils/roles";
import { sendEmailNotification } from "@/utils/nodemailer";



// GET all emails with pagination, search, and filtering
export async function GET(req: Request) {
    try {
        const isAdmin = await checkRole("admin");

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await dbConnect();

        // Parse query params from request URL
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("query") || "";
        const isRead = searchParams.get("isRead");
        const isArchived = searchParams.get("isArchived");

        const filter: any = {};

        // Text search on name, email, or message
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { message: { $regex: search, $options: "i" } },
            ];
        }

        // Optional filters
        if (isRead !== null) {
            filter.isRead = isRead === "true";
        }

        if (isArchived !== null) {
            filter.isArchived = isArchived === "true";
        }

        const skip = (page - 1) * limit;

        const [emails, total] = await Promise.all([
            EmailModel.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            EmailModel.countDocuments(filter),
        ]);

        return NextResponse.json({
            emails,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching emails:", error);
        return NextResponse.json(
            { error: "Failed to fetch emails" },
            { status: 500 }
        );
    }
}


// POST - Create new email (from contact form)
export async function POST(request: Request) {
    try {
        await dbConnect();
        const { name, email, message } = await request.json();
        const newEmail = new EmailModel({
            name,
            email,
            message,
        });

        await newEmail.save();

        // Send email using Nodemailer (will implement this next)
        await sendEmailNotification(name, email, message);

        return NextResponse.json(newEmail, { status: 201 });
    } catch (error) {
        console.error("Error creating email:", error);
        return NextResponse.json(
            { error: "Failed to create email" },
            { status: 500 }
        );
    }
}

