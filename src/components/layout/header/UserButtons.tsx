import { Bell, User, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AddLiveDialog } from "@/components/AddLiveDialog";
import { SubmitPropertyButton } from "../SubmitPropertyButton";
import { SupportButton } from "./SupportButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const UserButtons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAgentOrPromoter = user?.role === 'agent' || user?.role === 'promoter';
  const isOwner = user?.role === 'owner';

  return (
    <>
      {isOwner && <SubmitPropertyButton />}
      {isAgentOrPromoter && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AddLiveDialog />
            </TooltipTrigger>
            <TooltipContent>
              <p>Démarrer ou programmer un live</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <SupportButton />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/directory')}
            >
              <Book className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Annuaire Promoteurs & Agents</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
    </>
  );
};