"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface ChatModalProps {
  itemType: "LOST_ITEM" | "FOUND_ITEM" | "BOOK" | "EVENT";
  itemId: string;
  receiverId: string;
  receiverName: string;
  receiverImage?: string;
  itemTitle: string;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  read: boolean;
  sender: {
    id: string;
    name: string;
    image?: string;
  };
}

interface Conversation {
  id: string;
  itemType: string;
  itemId: string;
  messages: Message[];
  participants: Array<{
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }>;
}

export function ChatModal({
  itemType,
  itemId,
  receiverId,
  receiverName,
  receiverImage,
  itemTitle,
  onClose,
}: ChatModalProps) {
  const { data: session } = useSession();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversation();
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [itemType, itemId, receiverId]);

  const loadConversation = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType, itemId, receiverId }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversation(data);
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversation || sending) return;

    const messageContent = newMessage.trim();
    const tempId = `temp-${Date.now()}`;
    
    // Optimistic update: Add message immediately
    const optimisticMessage: Message = {
      id: tempId,
      content: messageContent,
      senderId: session?.user?.id || "",
      receiverId: receiverId,
      createdAt: new Date().toISOString(),
      read: false,
      sender: {
        id: session?.user?.id || "",
        name: session?.user?.name || "You",
        image: session?.user?.image ?? undefined,
      },
    };

    setMessages([...messages, optimisticMessage]);
    setNewMessage("");

    try {
      setSending(true);
      const response = await fetch(
        `/api/conversations/${conversation.id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: messageContent }),
        }
      );

      if (response.ok) {
        const message = await response.json();
        // Replace optimistic message with real one
        setMessages(prev => prev.map(msg => msg.id === tempId ? message : msg));
      } else {
        // Remove optimistic message on failure
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
        const error = await response.json();
        alert(error.error || "Failed to send message");
        setNewMessage(messageContent); // Restore message text
      }
    } catch (error) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      console.error("Error sending message:", error);
      alert("Failed to send message");
      setNewMessage(messageContent); // Restore message text
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" style={{ isolation: 'isolate' }}>
      <div className="bg-card text-card-foreground rounded-lg w-full max-w-2xl flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10">
              {receiverImage ? (
                <img src={receiverImage} alt={receiverName} />
              ) : (
                <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full">
                  {receiverName.charAt(0).toUpperCase()}
                </div>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground">{receiverName}</h3>
              <p className="text-sm text-muted-foreground truncate max-w-xs">
                Re: {itemTitle}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hidden md:flex"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.senderId === session?.user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
                      isOwnMessage
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card text-card-foreground border border-border rounded-bl-md"
                    }`}
                  >
                    <p className="break-words whitespace-pre-wrap text-sm">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1.5 ${
                        isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {format(new Date(message.createdAt), "d MMM yyyy, h:mm a")}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
              className="resize-none"
              maxLength={2000}
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || loading}
              size="icon"
              className="self-end"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {newMessage.length}/2000 characters
          </p>
        </div>
      </div>
    </div>
  );
}
