import { Button } from "@/components/ui/button";

interface QuickRepliesProps {
  onSelect: (reply: string) => void;
}

export const QuickReplies = ({ onSelect }: QuickRepliesProps) => {
  const quickReplies = [
    "Ce bien est-il disponible pour une visite privée ?",
    "Quel est le prix final ?",
    "Ce bien est-il négociable ?",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {quickReplies.map((reply) => (
        <Button
          key={reply}
          variant="secondary"
          size="sm"
          className="text-xs"
          onClick={() => onSelect(reply)}
        >
          {reply}
        </Button>
      ))}
    </div>
  );
};