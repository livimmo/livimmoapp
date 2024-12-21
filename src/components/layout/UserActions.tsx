import { User, House, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AIChat } from "@/components/live/AIChat";
import { type Property } from "@/types/property";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReservationForm } from "@/components/home/ReservationForm";

const mockProperty: Property = {
  id: 0,
  title: "Support Client",
  price: 0,
  location: "",
  type: "Support",
  surface: 0,
  rooms: 0,
  bathrooms: 0,
  description: "Service client Livimmo",
  features: [],
  images: ["/placeholder.svg"],
  agent: {
    id: 0,
    name: "Support",
    email: "support@livimmo.com",
    phone: "+212 123 456 789",
    image: "/placeholder.svg",
    verified: true,
    company: "Livimmo Support"
  },
  coordinates: {
    lat: 0,
    lng: 0
  },
  transactionType: "Vente"
};

export const UserActions = ({ isBuyerOrTenant }: { isBuyerOrTenant: boolean }) => {
  const navigate = useNavigate();
  const [showVisitDialog, setShowVisitDialog] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleCallClick = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      window.location.href = 'tel:+212123456789';
    } else {
      window.location.href = 'mailto:support@livimmo.com';
    }
  };

  return (
    <>
      {isBuyerOrTenant && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVisitDialog(true)}
                className="relative"
              >
                <House className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Planifier une visite privée</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu open={showChatbot} onOpenChange={setShowChatbot}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  aria-label="Contactez notre support client"
                >
                  <Headset className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[350px] h-[500px] p-0 bg-white border border-gray-200 shadow-lg rounded-lg"
              >
                {showChatbot ? (
                  <AIChat 
                    property={mockProperty}
                    onClose={() => setShowChatbot(false)}
                  />
                ) : (
                  <div className="space-y-4 p-4">
                    <div className="text-sm font-medium text-gray-900">Support Client</div>
                    <div className="space-y-2">
                      <DropdownMenuItem onClick={() => handleCallClick('phone')} className="cursor-pointer hover:bg-gray-100">
                        <span className="font-medium">Téléphone:</span>
                        <span className="ml-2">+212 123 456 789</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCallClick('email')} className="cursor-pointer hover:bg-gray-100">
                        <span className="font-medium">Email:</span>
                        <span className="ml-2">support@livimmo.com</span>
                      </DropdownMenuItem>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>Horaires d'ouverture:</div>
                      <div>Lun-Ven: 8h00 - 18h00</div>
                      <div>Sam: 9h00 - 13h00</div>
                    </div>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Contacter le support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/profile')}
      >
        <User className="h-4 w-4" />
      </Button>

      {showVisitDialog && (
        <ReservationForm
          live={{ id: 0, title: "", date: new Date() }}
          onClose={() => setShowVisitDialog(false)}
        />
      )}
    </>
  );
};