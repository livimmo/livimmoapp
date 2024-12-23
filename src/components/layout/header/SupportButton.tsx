import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSupportClick}
      className="text-muted-foreground hover:text-primary"
    >
      <HelpCircle className="w-5 h-5 mr-2" />
      Support
    </Button>
  );
};