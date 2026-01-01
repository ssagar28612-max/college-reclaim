"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AdminConversation {
  id: string;
  itemType: string;
  itemId: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  participants: Array<{
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: string;
    };
  }>;
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    read: boolean;
  }>;
  itemDetails: any;
}

export default function AdminConversationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<AdminConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedConversation, setSelectedConversation] = useState<AdminConversation | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/admin-signin");
    } else if (status === "authenticated") {
      loadConversations();
    }
  }, [status, page, router]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/conversations?page=${page}&limit=20`);
      
      if (response.status === 403) {
        router.push("/admin");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewConversation = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/admin/conversations/${conversationId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedConversation(data);
      }
    } catch (error) {
      console.error("Error loading conversation details:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedConversation(null)}
            className="mb-4"
          >
            ← Back to all conversations
          </Button>

          <Card className="p-6 dark:bg-gray-900 dark:border-gray-800">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Conversation Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <span className="font-semibold">Type:</span>{" "}
                  {selectedConversation.itemType.replace(/_/g, " ")}
                </div>
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {formatDistanceToNow(new Date(selectedConversation.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Participants</h3>
              <div className="space-y-2">
                {selectedConversation.participants.map((participant) => (
                  <div key={participant.user.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <Avatar className="h-10 w-10">
                      {participant.user.image ? (
                        <img src={participant.user.image} alt={participant.user.name} />
                      ) : (
                        <div className="bg-blue-600 text-white flex items-center justify-center h-full w-full">
                          {participant.user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{participant.user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{participant.user.email}</p>
                      <Badge variant="outline" className="mt-1">
                        {participant.user.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedConversation.itemDetails && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Related Item</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Title:</strong>{" "}
                  {selectedConversation.itemDetails.title}
                </p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Messages ({selectedConversation.messages.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedConversation.messages.map((message) => {
                  const sender = selectedConversation.participants.find(
                    (p) => p.user.id === message.senderId
                  )?.user;

                  return (
                    <div key={message.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {sender?.image ? (
                              <img src={sender.image} alt={sender.name} />
                            ) : (
                              <div className="bg-blue-600 text-white flex items-center justify-center h-full w-full text-xs">
                                {sender?.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </Avatar>
                          <span className="font-semibold text-sm text-gray-900 dark:text-white">
                            {sender?.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {message.content}
                      </p>
                      {!message.read && (
                        <Badge variant="outline" className="mt-2">
                          Unread
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Chat Monitoring Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and monitor all user conversations
          </p>
        </div>

        {conversations.length === 0 ? (
          <Card className="p-12 text-center dark:bg-gray-900 dark:border-gray-800">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No conversations yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              User conversations will appear here
            </p>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {conversations.map((conversation) => (
                <Card key={conversation.id} className="p-4 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge>{conversation.itemType.replace(/_/g, " ")}</Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {conversation.messageCount} messages
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                          Updated{" "}
                          {formatDistanceToNow(new Date(conversation.updatedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        {conversation.participants.map((participant) => (
                          <div key={participant.user.id} className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              {participant.user.image ? (
                                <img
                                  src={participant.user.image}
                                  alt={participant.user.name}
                                />
                              ) : (
                                <div className="bg-blue-600 text-white flex items-center justify-center h-full w-full text-xs">
                                  {participant.user.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {participant.user.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {participant.user.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {conversation.itemDetails && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Item:</strong> {conversation.itemDetails.title}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewConversation(conversation.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
