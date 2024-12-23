import { useEffect, useState } from "react";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Message de bienvenue
    setMessages([
      {
        id: 1,
        content: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`rounded-lg px-4 py-2 ${
              message.isBot
                ? "bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};