import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { mockAgents } from "@/data/mockAgents";

interface SmartSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  suggestions: string[];
}

export const SmartSearchBar = ({
  searchTerm,
  setSearchTerm,
  suggestions,
}: SmartSearchBarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

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

  const handleAgentSelect = (agentId: number) => {
    navigate(`/agent/${agentId}`);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un agent par nom ou localisation... (⌘+K)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-4"
          onClick={() => setOpen(true)}
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Rechercher un agent..." />
          <CommandList>
            <CommandEmpty>Aucun agent trouvé.</CommandEmpty>
            {filteredAgents.length > 0 && (
              <CommandGroup heading="Agents">
                {filteredAgents.map((agent) => (
                  <CommandItem
                    key={`agent-${agent.id}`}
                    onSelect={() => handleAgentSelect(agent.id)}
                  >
                    <SearchIcon className="mr-2 h-4 w-4" />
                    {agent.name} - {agent.location}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};