import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/conversations - Admin view of all conversations
export async function GET(req: Request) {
  try {
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Get all conversations with full details
    const [conversations, total] = await Promise.all([
      prisma.conversation.findMany({
        skip,
        take: limit,
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
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
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
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.conversation.count(),
    ]);

    // Get item details for each conversation
    const conversationsWithItems = await Promise.all(
      conversations.map(async (conv) => {
        let itemDetails = null;

        try {
          switch (conv.itemType) {
            case "LOST_ITEM":
              itemDetails = await prisma.lostItem.findUnique({
                where: { id: conv.itemId },
                select: {
                  id: true,
                  title: true,
                  category: true,
                  status: true,
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
                where: { id: conv.itemId },
                select: {
                  id: true,
                  title: true,
                  category: true,
                  status: true,
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
                where: { id: conv.itemId },
                select: {
                  id: true,
                  title: true,
                  author: true,
                  type: true,
                  available: true,
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
                where: { id: conv.itemId },
                select: {
                  id: true,
                  title: true,
                  date: true,
                  venue: true,
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
        } catch (error) {
          console.error(`Error fetching item details for ${conv.itemType}:`, error);
        }

        return {
          ...conv,
          itemDetails,
          messageCount: conv.messages.length,
        };
      })
    );

    return NextResponse.json({
      conversations: conversationsWithItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
