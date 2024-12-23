import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuickActions } from "./QuickActions";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow = ({ onClose }: ChatWindowProps) => {
  return (
    <div className="fixed bottom-20 right-4 z-50 w-[350px] rounded-lg border bg-background shadow-lg md:bottom-4">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Support</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex h-[500px] flex-col">
        <ScrollArea className="flex-1 p-4">
          <ChatMessages />
        </ScrollArea>

        <div className="border-t p-4">
          <QuickActions />
          <ChatInput />
        </div>
      </div>
    </div>
  );
};