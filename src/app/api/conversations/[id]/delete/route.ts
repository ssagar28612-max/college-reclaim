import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/conversations/[id] - Delete conversation (user must be participant)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
        { error: "You are not authorized to delete this conversation" },
        { status: 403 }
      );
    }

    // Delete all messages in the conversation
    await prisma.message.deleteMany({
      where: {
        conversationId,
      },
    });

    // Delete all participants
    await prisma.conversationParticipant.deleteMany({
      where: {
        conversationId,
      },
    });

    // Delete the conversation
    await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
    });

    return NextResponse.json({ success: true, message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
