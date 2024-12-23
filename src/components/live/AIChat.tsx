import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type AIChatProps } from "./chat/types";
import { useAIChat } from "./chat/useAIChat";
import { MessageBubble } from "./chat/MessageBubble";

export const AIChat = ({ property, onClose }: AIChatProps) => {
  const { messages, input, setInput, isTyping, handleSendMessage } = useAIChat(property, onClose);

  return (
    <div className="flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-blue-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-600/50 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-600/50 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-blue-600/50 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Posez votre question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};