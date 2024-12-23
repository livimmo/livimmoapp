import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ChatbotButtonProps {
  onClick: () => void;
  className?: string;
}

export const ChatbotButton = ({ onClick, className }: ChatbotButtonProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Button
        onClick={onClick}
        size="icon"
        className={cn(
          "fixed bottom-20 right-4 z-50 h-12 w-12 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90",
          className
        )}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn("gap-2", className)}
    >
      <MessageSquare className="h-4 w-4" />
      Support
    </Button>
  );
};