import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";

interface ChatButtonProps {
  agentId: string;
  agentName: string;
  propertyId?: number;
  propertyTitle?: string;
}

export const ChatButton = ({ agentId, agentName, propertyId, propertyTitle }: ChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="outline" 
        className="w-full gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        Chat avec l'agent
      </Button>

      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        agentId={agentId}
        agentName={agentName}
        propertyId={propertyId}
        propertyTitle={propertyTitle}
      />
    </>
  );
};