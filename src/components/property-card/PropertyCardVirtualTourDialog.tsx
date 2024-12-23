import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VirtualTourViewer360 } from "@/components/virtual-tour/VirtualTourViewer360";

interface PropertyCardVirtualTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: number;
  title: string;
  agentName: string;
  onContactAgent: () => void;
  onBookVisit: () => void;
}

export const PropertyCardVirtualTourDialog = ({
  open,
  onOpenChange,
  id,
  title,
  agentName,
  onContactAgent,
  onBookVisit,
}: PropertyCardVirtualTourDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-6xl h-[90vh] p-0 md:p-6">
        <VirtualTourViewer360
          tourUrl="TzhRashYdRt"
          propertyId={id}
          propertyTitle={title}
          agentName={agentName}
          onContactAgent={onContactAgent}
          onBookVisit={onBookVisit}
        />
      </DialogContent>
    </Dialog>
  );
};