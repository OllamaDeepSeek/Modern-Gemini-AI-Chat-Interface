import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ImagePlus, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend?: (message: string, image?: File) => void;
  isLoading?: boolean;
}

const MessageInput = ({
  onSend = () => {},
  isLoading = false,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (message.trim() || image) {
      onSend(message, image || undefined);
      setMessage("");
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      {imagePreview && (
        <div className="mb-4 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-32 rounded-lg object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1"
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
          >
            ×
          </Button>
        </div>
      )}
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[60px] max-h-[200px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <ImagePlus className="h-4 w-4" />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </Button>
          <Button
            size="icon"
            className={cn(
              "rounded-full",
              (message.trim() || image) && !isLoading && "animate-pulse",
            )}
            onClick={handleSend}
            disabled={(!message.trim() && !image) || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
