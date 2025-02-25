import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "./MessageBubble";
import { motion } from "framer-motion";

interface Message {
  id: string;
  isAI: boolean;
  message: string;
  timestamp: string;
  avatarUrl?: string;
}

interface MessageContainerProps {
  messages?: Message[];
}

const MessageContainer = ({
  messages = [
    {
      id: "1",
      isAI: true,
      message: "Hello! How can I help you today?",
      timestamp: "10:00 AM",
    },
    {
      id: "2",
      isAI: false,
      message: "I have a question about AI.",
      timestamp: "10:01 AM",
    },
    {
      id: "3",
      isAI: true,
      message:
        "Sure! I'd be happy to help answer any questions you have about AI.",
      timestamp: "10:02 AM",
    },
  ],
}: MessageContainerProps) => {
  return (
    <div className="h-full w-full bg-background border rounded-md">
      <ScrollArea className="h-full w-full p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-2"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageBubble
                isAI={message.isAI}
                message={message.message}
                timestamp={message.timestamp}
                avatarUrl={message.avatarUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default MessageContainer;
