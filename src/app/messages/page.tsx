"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, ArrowLeft, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ChatModal } from "@/components/chat-modal";
import { toast } from "sonner";

interface ConversationListItem {
  id: string;
  itemType: string;
  itemId: string;
  updatedAt: string;
  unreadCount: number;
  participants: Array<{
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }>;
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
      image?: string;
    };
  }>;
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    receiverId: string;
    receiverName: string;
    receiverImage?: string;
    itemType: string;
    itemId: string;
    itemTitle: string;
  } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      loadConversations();
    }
  }, [status, router]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/conversations");
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the chat modal
    
    if (!confirm("Are you sure you want to delete this conversation? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/conversations/${conversationId}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Conversation deleted successfully");
        loadConversations(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete conversation");
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Failed to delete conversation");
    }
  };

  const getOtherParticipant = (conversation: ConversationListItem) => {
    return conversation.participants.find(
      (p) => p.user.id !== session?.user?.id
    )?.user;
  };

  const getItemTitle = (conversation: ConversationListItem) => {
    const lastMessage = conversation.messages[0];
    return `${conversation.itemType.replace("_", " ")} conversation`;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Your conversations about items and events
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : conversations.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No messages yet
            </h3>
            <p className="text-muted-foreground">
              Start a conversation by clicking "Send Message" on any listing
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => {
              const otherUser = getOtherParticipant(conversation);
              const lastMessage = conversation.messages[0];

              if (!otherUser) return null;

              return (
                <Card
                  key={conversation.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                  onClick={() => {
                    setSelectedConversation({
                      id: conversation.id,
                      receiverId: otherUser.id,
                      receiverName: otherUser.name || "User",
                      receiverImage: otherUser.image,
                      itemType: conversation.itemType,
                      itemId: conversation.itemId,
                      itemTitle: getItemTitle(conversation),
                    });
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      {otherUser.image ? (
                        <img src={otherUser.image} alt={otherUser.name} />
                      ) : (
                        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full">
                          {otherUser.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-card-foreground">
                          {otherUser.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => handleDeleteConversation(conversation.id, e)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-1">
                        {conversation.itemType.replace(/_/g, " ")}
                      </p>

                      {lastMessage && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate flex-1">
                            {lastMessage.senderId === session?.user?.id && "You: "}
                            {lastMessage.content}
                          </p>
                          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                            {format(new Date(lastMessage.createdAt), "d MMM, h:mm a")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {selectedConversation && (
        <ChatModal
          itemType={selectedConversation.itemType as any}
          itemId={selectedConversation.itemId}
          receiverId={selectedConversation.receiverId}
          receiverName={selectedConversation.receiverName}
          receiverImage={selectedConversation.receiverImage}
          itemTitle={selectedConversation.itemTitle}
          onClose={() => {
            setSelectedConversation(null);
            loadConversations(); // Refresh to update unread counts
          }}
        />
      )}
    </div>
  );
}
