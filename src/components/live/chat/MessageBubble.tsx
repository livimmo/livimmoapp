import { Bot } from "lucide-react";
import { Message } from "./types";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.isBot
            ? "bg-blue-100 text-blue-900"
            : "bg-primary text-white"
        }`}
      >
        {message.isBot && (
          <div className="flex items-center gap-2 mb-1">
            <Bot className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Assistant IA</span>
          </div>
        )}
        <p className="text-sm whitespace-pre-line">{message.text}</p>
        {message.actions && (
          <div className="flex flex-col gap-2 mt-3">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={action.action}
                className="w-full"
              >
                {action.type === "call" && <Phone className="w-4 h-4 mr-2" />}
                {action.type === "whatsapp" && <MessageSquare className="w-4 h-4 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
        <span className={`text-xs mt-1 block ${
          message.isBot ? "text-blue-600/70" : "text-white/70"
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};