import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LiveSearchFilters } from "./LiveSearchFilters";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LiveSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  suggestions: string[];
}

export const LiveSearchBar = ({
  searchTerm,
  setSearchTerm,
  suggestions,
}: LiveSearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  const handleReset = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const searchBar = (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Recherchez un live, un bien ou un agent..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-4"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => setSearchTerm(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              <Search className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh]">
            <div className="space-y-4 pt-4">
              {searchBar}
              <LiveSearchFilters />
              <Button
                variant="outline"
                className="w-full"
                onClick={handleReset}
              >
                Réinitialiser
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {searchBar}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtres
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Réinitialiser
        </Button>
      </div>
      {showFilters && <LiveSearchFilters />}
    </div>
  );
};