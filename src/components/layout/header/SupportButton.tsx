import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SupportButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSupportClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Convert support agent ID to string
    const supportAgentId = "1";
    navigate(`/messages/agent/${supportAgentId}`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSupportClick}
            className="text-muted-foreground hover:text-primary"
          >
            Support
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chattez avec notre support client</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};