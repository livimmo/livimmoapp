import { useState, useEffect } from "react";
import { Search as SearchIcon, User, Building, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { mockProperties } from "@/data/mockProperties";

interface SmartSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  suggestions: string[];
}

// Extraire les agents uniques
const uniqueAgents = Array.from(
  new Map(mockProperties.map((p) => [p.agent.id, p.agent])).values()
);

export const SmartSearchBar = ({
  searchTerm,
  setSearchTerm,
  suggestions,
}: SmartSearchBarProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par ville, région, type de bien ou agent... (⌘+K)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-4"
          onClick={() => setOpen(true)}
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Que recherchez-vous ?" />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Lieux">
              {suggestions
                .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    onSelect={() => {
                      setSearchTerm(suggestion);
                      setOpen(false);
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {suggestion}
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Agents">
              {uniqueAgents
                .filter((agent) =>
                  agent.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((agent) => (
                  <CommandItem
                    key={agent.id}
                    onSelect={() => {
                      setSearchTerm(agent.name);
                      setOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {agent.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};