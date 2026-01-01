import { prisma } from "@/lib/prisma";

// Auto-delete messages older than 24 hours
export async function cleanupOldMessages() {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete messages older than 24 hours
    const deleted = await prisma.message.deleteMany({
      where: {
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });

    // Find and delete empty conversations (no messages left)
    const conversations = await prisma.conversation.findMany({
      include: {
        messages: true,
      },
    });

    for (const conversation of conversations) {
      if (conversation.messages.length === 0) {
        // Delete participants first
        await prisma.conversationParticipant.deleteMany({
          where: {
            conversationId: conversation.id,
          },
        });
        
        // Delete conversation
        await prisma.conversation.delete({
          where: {
            id: conversation.id,
          },
        });
      }
    }

    return {
      success: true,
      deletedMessages: deleted.count,
    };
  } catch (error) {
    console.error("Error cleaning up messages:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
