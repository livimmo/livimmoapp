import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Calendar } from "lucide-react";
import { useState } from "react";
import { QuickReplies } from "./QuickReplies";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
  agentName: string;
  propertyId?: number;
  propertyTitle?: string;
}

interface Message {
  id: number;
  sender: "user" | "agent";
  content: string;
  timestamp: Date;
}

export const ChatWindow = ({
  isOpen,
  onClose,
  agentId,
  agentName,
  propertyId,
  propertyTitle,
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSend = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour envoyer un message à l'agent.",
      });
      navigate("/login");
      return;
    }

    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: "user",
        content: newMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Simuler une réponse de l'agent
      setTimeout(() => {
        const agentResponse: Message = {
          id: Date.now() + 1,
          sender: "agent",
          content: "Je vous réponds dans les plus brefs délais.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Chat avec {agentName}</h2>
          {propertyTitle && (
            <p className="text-sm text-muted-foreground">
              À propos de : {propertyTitle}
            </p>
          )}
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-4">
          <QuickReplies onSelect={handleQuickReply} />
          
          <div className="flex gap-2">
            <Input
              placeholder="Votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => toast({
              title: "Planification de visite",
              description: "Cette fonctionnalité sera bientôt disponible.",
            })}>
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};