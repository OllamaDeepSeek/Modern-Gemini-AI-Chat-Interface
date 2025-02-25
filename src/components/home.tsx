import React, { useState } from "react";
import ChatHeader from "./chat/ChatHeader";
import MessageContainer from "./chat/MessageContainer";
import MessageInput from "./chat/MessageInput";
import { sendMessage } from "@/lib/api";

interface Message {
  id: string;
  isAI: boolean;
  message: string;
  timestamp: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      isAI: true,
      message: "Hello! How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      isAI: false,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Get AI response
    setIsLoading(true);
    try {
      const response = await sendMessage(message);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        isAI: true,
        message: response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-screen">
        <ChatHeader />
        <div className="flex-1 p-4 overflow-hidden">
          <MessageContainer messages={messages} />
        </div>
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
