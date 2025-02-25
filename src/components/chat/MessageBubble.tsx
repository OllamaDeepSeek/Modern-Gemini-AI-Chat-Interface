import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  isAI?: boolean;
  message?: string;
  timestamp?: string;
  avatarUrl?: string;
}

const MessageBubble = ({
  isAI = false,
  message = "This is a sample message",
  timestamp = new Date().toLocaleTimeString(),
  avatarUrl = isAI
    ? "https://api.dicebear.com/7.x/bottts/svg?seed=ai"
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 bg-background",
        isAI ? "flex-row" : "flex-row-reverse",
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} alt={isAI ? "AI Avatar" : "User Avatar"} />
        <AvatarFallback>{isAI ? "AI" : "U"}</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col max-w-[80%]",
          isAI ? "items-start" : "items-end",
        )}
      >
        <div
          className={cn(
            "rounded-lg p-3",
            isAI ? "bg-secondary" : "bg-primary text-primary-foreground",
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
