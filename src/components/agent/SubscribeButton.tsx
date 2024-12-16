import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface SubscribeButtonProps {
  agentId: string;
  initialSubscriberCount?: number;
}

export const SubscribeButton = ({ agentId, initialSubscriberCount = 0 }: SubscribeButtonProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(initialSubscriberCount);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubscribe = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous abonner à cet agent.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribed(!isSubscribed);
    setSubscriberCount(prev => isSubscribed ? prev - 1 : prev + 1);
    
    toast({
      title: isSubscribed ? "Désabonnement réussi" : "Abonnement réussi",
      description: isSubscribed 
        ? "Vous ne suivez plus cet agent" 
        : "Vous suivez maintenant cet agent",
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleSubscribe}
        variant={isSubscribed ? "secondary" : "default"}
        size="sm"
        className="transition-all duration-200 hover:scale-105"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        {isSubscribed ? "Abonné" : "S'abonner"}
      </Button>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>{subscriberCount} abonnés</span>
      </div>
    </div>
  );
};