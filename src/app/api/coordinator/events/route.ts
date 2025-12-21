import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is coordinator or admin
    if (session.user.role !== "COORDINATOR" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Coordinator access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, date, time, venue, clubOrDept, contactInfo, imageUrl } = body;

    if (!title || !description || !date || !time || !venue || !clubOrDept) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        venue,
        clubOrDept,
        contactInfo: contactInfo || null,
        imageUrl: imageUrl || null,
        postedByUserId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
