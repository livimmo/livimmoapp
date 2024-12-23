import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AddLiveDialog } from "@/components/AddLiveDialog";
import { SubmitPropertyButton } from "../SubmitPropertyButton";
import { SupportButton } from "./SupportButton";
import { ChatbotButton } from "@/components/chat/ChatbotButton";
import { useState } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";

export const UserButtons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  const isAgentOrPromoter = user?.role === 'agent' || user?.role === 'promoter';
  const isOwner = user?.role === 'owner';

  return (
    <>
      {isOwner && <SubmitPropertyButton />}
      {isAgentOrPromoter && (
        <AddLiveDialog />
      )}
      <SupportButton />
      <ChatbotButton onClick={() => setShowChat(true)} />
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/notifications')}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
          3
        </span>
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/profile')}
      >
        <User className="h-4 w-4" />
      </Button>

      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
    </>
  );
};