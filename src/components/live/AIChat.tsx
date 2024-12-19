import { useState, useEffect } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Property } from "@/types/property";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIChatProps {
  property: Property;
  onClose: () => void;
}

export const AIChat = ({ property, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Message de bienvenue initial
    setMessages([
      {
        id: 1,
        text: `Bonjour ! Je suis votre assistant virtuel pour la visite de ${property.title}. Je peux vous donner des informations sur le prix, la localisation, et les caractéristiques du bien. Que souhaitez-vous savoir ?`,
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, [property.title]);

  const generateAIResponse = async (userMessage: string) => {
    // Simuler une réponse IA basée sur les propriétés du bien
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let response = "";
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes("prix")) {
      response = `Le prix de ce bien est de ${property.price.toLocaleString()} DH. Souhaitez-vous plus d'informations sur les modalités de paiement ?`;
    } else if (lowercaseMessage.includes("localisation") || lowercaseMessage.includes("adresse")) {
      response = `Ce bien est situé à ${property.location}. C'est un quartier très prisé avec de nombreux commerces et services à proximité.`;
    } else if (lowercaseMessage.includes("surface") || lowercaseMessage.includes("taille")) {
      response = `La surface habitable est de ${property.surface}m². Le bien dispose de ${property.rooms} pièces et ${property.bathrooms} salles de bain.`;
    } else if (lowercaseMessage.includes("contact") || lowercaseMessage.includes("agent")) {
      response = `Vous pouvez contacter ${property.agent.name} au ${property.agent.phone} ou par email à ${property.agent.email}.`;
    } else {
      response = "Je peux vous donner des informations sur le prix, la localisation, la surface, ou vous mettre en contact avec l'agent. Que souhaitez-vous savoir ?";
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponse = await generateAIResponse(input);
    const botMessage: Message = {
      id: Date.now() + 1,
      text: aiResponse,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot
                    ? "bg-primary/10 text-primary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.isBot && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs font-medium">Assistant IA</span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-primary/10 rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-150"></span>
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