import { useState, useEffect } from "react";
import { Bot, Send, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actions?: {
    type: "contact" | "call" | "whatsapp";
    label: string;
    action: () => void;
  }[];
}

interface AIChatProps {
  property: Property;
  onClose: () => void;
}

export const AIChat = ({ property, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Bonjour ! Je suis votre assistant virtuel pour la visite de ${property.title}. Je peux vous donner des informations sur le prix, la localisation, les caractéristiques du bien ou vous mettre en relation avec un agent. Que souhaitez-vous savoir ?`,
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, [property.title]);

  const handleContactAgent = () => {
    if (property.agent.phone) {
      window.location.href = `tel:${property.agent.phone}`;
    }
  };

  const handleWhatsAppAgent = () => {
    if (property.agent.phone) {
      // Format phone number for WhatsApp (remove spaces and add country code if needed)
      const formattedPhone = property.agent.phone.replace(/\s+/g, '');
      const message = encodeURIComponent(`Bonjour, je suis intéressé(e) par le bien "${property.title}"`);
      window.location.href = `https://wa.me/${formattedPhone}?text=${message}`;
    }
  };

  const generateAgentResponse = () => {
    return {
      id: Date.now(),
      text: `Bien sûr ! Voici les coordonnées de ${property.agent.name} :\n\nTéléphone : ${property.agent.phone}\n\nVous pouvez le contacter directement ou utiliser les boutons ci-dessous.`,
      isBot: true,
      timestamp: new Date(),
      actions: [
        {
          type: "call",
          label: "Appeler maintenant",
          action: handleContactAgent,
        },
        {
          type: "whatsapp",
          label: "Envoyer un WhatsApp",
          action: handleWhatsAppAgent,
        },
      ],
    };
  };

  const generateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let response = "";
    const lowercaseMessage = userMessage.toLowerCase();

    if (
      lowercaseMessage.includes("agent") ||
      lowercaseMessage.includes("contact") ||
      lowercaseMessage.includes("parler") ||
      lowercaseMessage.includes("appeler")
    ) {
      setIsTyping(false);
      return generateAgentResponse();
    }

    if (lowercaseMessage.includes("prix")) {
      response = `Le prix de ce bien est de ${property.price.toLocaleString()} DH. Souhaitez-vous être mis en relation avec l'agent pour plus d'informations ?`;
    } else if (lowercaseMessage.includes("localisation") || lowercaseMessage.includes("adresse")) {
      response = `Ce bien est situé à ${property.location}. C'est un quartier très prisé avec de nombreux commerces et services à proximité.`;
    } else if (lowercaseMessage.includes("surface") || lowercaseMessage.includes("taille")) {
      response = `La surface habitable est de ${property.surface}m². Le bien dispose de ${property.rooms} pièces et ${property.bathrooms} salles de bain.`;
    } else {
      response = "Je peux vous donner des informations sur le prix, la localisation, la surface, ou vous mettre en contact avec l'agent. Que souhaitez-vous savoir ?";
    }

    setIsTyping(false);
    return {
      id: Date.now(),
      text: response,
      isBot: true,
      timestamp: new Date(),
    };
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
    setMessages((prev) => [...prev, aiResponse]);
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