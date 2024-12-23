import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Home, 
  Heart,
  AlertOctagon,
  BarChart2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BuyForm } from "./forms/BuyForm";
import { RentForm } from "./forms/RentForm";
import { ReportForm } from "./forms/ReportForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FavoriteButton } from "../property/FavoriteButton";

interface VideoActionBarProps {
  propertyId: string;
  propertyTitle: string;
  offersCount: number;
  onClose: () => void;
  className?: string;
}

export const VideoActionBar = ({
  propertyId,
  propertyTitle,
  offersCount,
  onClose,
  className
}: VideoActionBarProps) => {
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showRentForm, setShowRentForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAction = (action: "buy" | "rent" | "report") => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour effectuer cette action",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    switch (action) {
      case "buy":
        setShowBuyForm(true);
        break;
      case "rent":
        setShowRentForm(true);
        break;
      case "report":
        setShowReportForm(true);
        break;
    }
  };

  return (
    <>
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-sm p-4",
        "flex items-center justify-between gap-2",
        "transition-all duration-300",
        className
      )}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => handleAction("buy")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">J'achète</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => handleAction("rent")}
          >
            <Home className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Je loue</span>
          </Button>

          <FavoriteButton
            propertyId={parseInt(propertyId)}
            title={propertyTitle}
            className="text-white hover:bg-white/20"
          />

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => handleAction("report")}
          >
            <AlertOctagon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Signaler</span>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <BarChart2 className="w-4 h-4" />
            <span className="font-semibold">{offersCount}</span>
            <span className="hidden sm:inline text-sm">offres reçues</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Dialog open={showBuyForm} onOpenChange={setShowBuyForm}>
        <DialogContent>
          <BuyForm
            propertyId={propertyId}
            propertyTitle={propertyTitle}
            onClose={() => setShowBuyForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showRentForm} onOpenChange={setShowRentForm}>
        <DialogContent>
          <RentForm
            propertyId={propertyId}
            propertyTitle={propertyTitle}
            onClose={() => setShowRentForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
        <DialogContent>
          <ReportForm
            propertyId={propertyId}
            propertyTitle={propertyTitle}
            onClose={() => setShowReportForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};