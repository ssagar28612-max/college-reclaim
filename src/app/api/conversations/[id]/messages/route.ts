import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimitMessages } from "@/lib/rate-limit";

// POST /api/conversations/[id]/messages - Send a message
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitResult = rateLimitMessages(session.user.id);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: "You're sending messages too quickly. Please slow down.",
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime 
        },
        { status: 429 }
      );
    }

    const { content } = await req.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    // Basic content validation (prevent excessively long messages)
    if (content.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    // Verify user is a participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId: session.user.id,
      },
    });

    if (!participant) {
      return NextResponse.json(
        { error: "You are not a participant in this conversation" },
        { status: 403 }
      );
    }

    // Get the other participant (receiver)
    const otherParticipant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId: {
          not: session.user.id,
        },
      },
    });

    if (!otherParticipant) {
      return NextResponse.json(
        { error: "Receiver not found" },
        { status: 404 }
      );
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: session.user.id,
        receiverId: otherParticipant.userId,
        content: content.trim(),
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // Get conversation details for notification
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        itemType: true,
        itemId: true,
      },
    });

    // Create notification for the receiver
    const senderName = session.user.name || "Someone";
    await prisma.notification.create({
      data: {
        userId: otherParticipant.userId,
        title: "New Message",
        message: `${senderName} sent you a message`,
        type: "NEW_MESSAGE",
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
