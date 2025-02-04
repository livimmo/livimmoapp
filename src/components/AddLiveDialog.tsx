import { useState } from "react";
import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropertyForm } from "./live/PropertyForm";
import { LiveForm } from "./live/LiveForm";
import { ConfirmationStep } from "./live/ConfirmationStep";

export const AddLiveDialog = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("property");
  const [propertyData, setPropertyData] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const isMobile = useIsMobile();

  const handlePropertySubmit = (data) => {
    setPropertyData(data);
    setActiveTab("live");
  };

  const handleLiveSubmit = (data) => {
    setLiveData(data);
    setActiveTab("confirmation");
  };

  const handleConfirmation = () => {
    setOpen(false);
    setActiveTab("property");
    setPropertyData(null);
    setLiveData(null);
  };

  return (
    <>
      {isMobile ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="relative"
        >
          <div className="relative flex items-center gap-1">
            <Video className="h-4 w-4 text-[#ea384c]" />
            <Plus className="h-3 w-3 text-[#ea384c]" />
          </div>
        </Button>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90 relative gap-1"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          <div className="relative flex items-center gap-2">
            <Video className="h-4 w-4" />
          </div>
          Ajouter un Live
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Ajouter un Live</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-8rem)]">
            <div className="p-6 pt-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="property">Bien immobilier</TabsTrigger>
                  <TabsTrigger value="live" disabled={!propertyData}>
                    Configuration du Live
                  </TabsTrigger>
                  <TabsTrigger value="confirmation" disabled={!liveData}>
                    Confirmation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="property">
                  <PropertyForm 
                    onSubmit={handlePropertySubmit}
                    initialData={propertyData}
                  />
                </TabsContent>

                <TabsContent value="live">
                  <LiveForm 
                    onSubmit={handleLiveSubmit}
                    propertyData={propertyData}
                    initialData={liveData}
                  />
                </TabsContent>

                <TabsContent value="confirmation">
                  <ConfirmationStep
                    propertyData={propertyData}
                    liveData={liveData}
                    onConfirm={handleConfirmation}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};