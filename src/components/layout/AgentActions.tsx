import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { AddLiveDialog } from "@/components/AddLiveDialog";

export const AgentActions = () => {
  return (
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
  );
};