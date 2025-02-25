import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "@/lib/theme-provider";

interface ChatHeaderProps {
  title?: string;
}

const ChatHeader = ({ title = "Gemini Chat" }: ChatHeaderProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 w-full bg-background border-b border-border px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </Button>
    </header>
  );
};

export default ChatHeader;
