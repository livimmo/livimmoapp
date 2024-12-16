import { LiveEvent } from "@/types/live";
import { Radio, ChevronDown, ChevronUp, Eye, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";

interface LiveSidebarProps {
  currentLiveId: number;
  lives: LiveEvent[];
}

export const LiveSidebar = ({ currentLiveId, lives }: LiveSidebarProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Prix max 10M DH
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]); // Surface max 1000m²
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filtrer les lives qui ne sont pas le live actuel et qui sont en direct
  const otherLives = lives.filter(live => live.id !== currentLiveId && live.status === 'live');

  // Convertir le prix de string à number pour le filtrage
  const getPriceAsNumber = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^\d]/g, ""));
  };

  // Filtrer les lives en fonction de tous les critères
  const filteredLives = otherLives.filter(live => {
    const searchLower = searchTerm.toLowerCase();
    const price = getPriceAsNumber(live.price);
    const surface = live.surface || 0; // Utiliser 0 si la surface n'est pas définie

    return (
      (live.title.toLowerCase().includes(searchLower) ||
      live.location.toLowerCase().includes(searchLower) ||
      live.type.toLowerCase().includes(searchLower) ||
      live.agent.toLowerCase().includes(searchLower)) &&
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      surface >= surfaceRange[0] &&
      surface <= surfaceRange[1]
    );
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isCollapsed && filteredLives.length > 1) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const nextIndex = (currentIndex + 1) % filteredLives.length;
          const cardWidth = 256 + 16;
          scrollRef.current.scrollTo({
            left: nextIndex * cardWidth,
            behavior: 'smooth'
          });
          setCurrentIndex(nextIndex);
        }
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCollapsed, currentIndex, filteredLives.length]);

  if (otherLives.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-b shadow-lg transition-all duration-300 z-40",
        isCollapsed ? "h-12" : "h-[400px]"
      )}
      style={{
        bottom: "calc(64px + 56px)",
      }}
    >
      <div className="absolute inset-x-0 -top-8 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative bg-black/50 hover:bg-black/75 px-3",
            "text-white shadow-lg transition-all duration-300",
            "hover:scale-110 backdrop-blur-sm"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="relative flex items-center gap-2">
            <Radio className="h-4 w-4" />
            <span className="text-sm font-medium">
              {otherLives.length} lives en cours
            </span>
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </Button>
      </div>

      {!isCollapsed && (
        <div className="h-full flex flex-col">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un live..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Prix (DH)</label>
              <Slider
                value={priceRange}
                min={0}
                max={10000000}
                step={100000}
                onValueChange={setPriceRange}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{priceRange[0].toLocaleString()} DH</span>
                <span>{priceRange[1].toLocaleString()} DH</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Surface (m²)</label>
              <Slider
                value={surfaceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={setSurfaceRange}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{surfaceRange[0]} m²</span>
                <span>{surfaceRange[1]} m²</span>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div 
              ref={scrollRef}
              className="flex gap-4 px-4 overflow-x-auto scroll-smooth pb-4"
            >
              {filteredLives.map(live => (
                <div
                  key={live.id}
                  className="group cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors flex-shrink-0 w-64"
                  onClick={() => navigate(`/live/${live.id}`)}
                >
                  <div className="space-y-2">
                    <div className="relative">
                      <img 
                        src={live.thumbnail} 
                        alt={live.title}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <Badge 
                        variant="destructive" 
                        className="absolute top-1 left-1 scale-75"
                      >
                        Live
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className="absolute bottom-1 left-1 scale-75 flex items-center gap-1 bg-black/75 text-white"
                      >
                        <Eye className="w-3 h-3" />
                        {live.viewers}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {live.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{live.location}</span>
                        <Badge variant="outline" className="scale-75">
                          {live.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-primary">{live.price}</span>
                        <span className="text-xs text-muted-foreground">{live.surface}m²</span>
                      </div>
                      <span className="text-xs text-muted-foreground block mt-1">
                        {live.agent}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};