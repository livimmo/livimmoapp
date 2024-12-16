import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { AgentCard } from "@/components/agents/AgentCard";
import { mockAgents } from "@/data/mockAgents";

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRating, setSelectedRating] = useState("0");

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || agent.location === selectedLocation;
    const matchesType = selectedType === "all" || agent.type === selectedType;
    const matchesRating = Number(selectedRating) <= agent.rating;
    
    return matchesSearch && matchesLocation && matchesType && matchesRating;
  });

  const locations = Array.from(new Set(mockAgents.map(a => a.location)));

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Agents et Promoteurs</h1>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Rechercher un agent ou promoteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les localisations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="agent">Agents</SelectItem>
                <SelectItem value="promoter">Promoteurs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Note minimale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Toutes les notes</SelectItem>
                <SelectItem value="4">4+ étoiles</SelectItem>
                <SelectItem value="4.5">4.5+ étoiles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default Agents;