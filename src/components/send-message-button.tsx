"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2 } from "lucide-react";
import { ChatModal } from "./chat-modal";

interface SendMessageButtonProps {
  itemType: "LOST_ITEM" | "FOUND_ITEM" | "BOOK" | "EVENT";
  itemId: string;
  ownerId: string;
  ownerName: string;
  ownerImage?: string;
  itemTitle: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function SendMessageButton({
  itemType,
  itemId,
  ownerId,
  ownerName,
  ownerImage,
  itemTitle,
  variant = "outline",
  size = "default",
  className = "",
}: SendMessageButtonProps) {
  const { data: session, status } = useSession();
  const [showChat, setShowChat] = useState(false);

  // Don't show button if not logged in or if user is the owner
  if (status === "loading") {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading
      </Button>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (session?.user?.id === ownerId) {
    return null;
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setShowChat(true)}
        className={className}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Send Message
      </Button>

      {showChat && (
        <ChatModal
          itemType={itemType}
          itemId={itemId}
          receiverId={ownerId}
          receiverName={ownerName}
          receiverImage={ownerImage}
          itemTitle={itemTitle}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
}
