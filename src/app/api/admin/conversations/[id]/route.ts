import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/conversations/[id] - Admin view of specific conversation
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                phoneNumber: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            receiver: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Get item details
    let itemDetails = null;
    switch (conversation.itemType) {
      case "LOST_ITEM":
        itemDetails = await prisma.lostItem.findUnique({
          where: { id: conversation.itemId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        break;
      case "FOUND_ITEM":
        itemDetails = await prisma.foundItem.findUnique({
          where: { id: conversation.itemId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        break;
      case "BOOK":
        itemDetails = await prisma.book.findUnique({
          where: { id: conversation.itemId },
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        break;
      case "EVENT":
        itemDetails = await prisma.event.findUnique({
          where: { id: conversation.itemId },
          include: {
            postedBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        break;
    }

    return NextResponse.json({
      ...conversation,
      itemDetails,
    });
  } catch (error) {
    console.error("Error fetching admin conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}
