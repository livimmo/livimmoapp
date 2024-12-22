import { Video, Bell, User, LogIn, UserPlus, House, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AddLiveDialog } from "@/components/AddLiveDialog";
import { useState } from "react";
import { ReservationForm } from "@/components/home/ReservationForm";
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
import { SubmitPropertyButton } from "./SubmitPropertyButton";

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

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.camera-icon')) {
      navigate('/lives?filter=live');
      toast({
        title: "Lives en cours",
        description: "Affichage des biens en live direct",
      });
    } else {
      navigate('/');
    }
  };

  const isAgentOrPromoter = user?.role === 'agent' || user?.role === 'promoter';
  const isOwner = user?.role === 'owner';

  const handleCallClick = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      window.location.href = 'tel:+212123456789';
    } else {
      window.location.href = 'mailto:support@livimmo.com';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <div 
          className="flex items-center gap-1.5 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Video className="h-4 w-4 text-[#ea384c] camera-icon" />
          <h1 className="text-lg font-bold text-primary">
            Livimmo
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isOwner && <SubmitPropertyButton />}
          {isAuthenticated ? (
            <>
              {isAgentOrPromoter && (
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
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/profile')}
              >
                <User className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                S'inscrire
              </Button>
              <Button 
                variant="default"
                size="sm"
                onClick={() => navigate('/login')}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Connexion
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
