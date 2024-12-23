import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const QuickActions = () => {
  const actions = [
    { label: "FAQ", action: () => console.log("FAQ clicked") },
    { label: "Réserver une visite", action: () => console.log("Réserver clicked") },
    { label: "Lives en cours", action: () => console.log("Lives clicked") },
    { label: "Parler à un agent", action: () => console.log("Agent clicked") },
  ];

  return (
    <ScrollArea className="mb-4 whitespace-nowrap">
      <div className="flex gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={action.action}
            className="flex-shrink-0"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};