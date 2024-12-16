import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye } from "lucide-react";
import { LiveCalendarView } from "@/components/live/LiveCalendarView";
import { ScheduledLivesList } from "@/components/live/ScheduledLivesList";
import { AddLiveDialog } from "@/components/AddLiveDialog";

// Mock data moved to a separate file for better organization
import { liveStreams, scheduledLives } from "@/data/mockLives";

const Lives = () => {
  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Lives</h1>
          <AddLiveDialog />
        </div>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Rechercher un live..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="appartement">Appartement</SelectItem>
              <SelectItem value="bureau">Bureau</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="casablanca">Casablanca</SelectItem>
              <SelectItem value="rabat">Rabat</SelectItem>
              <SelectItem value="marrakech">Marrakech</SelectItem>
              <SelectItem value="tanger">Tanger</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container px-4">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="live" className="flex-1">En direct</TabsTrigger>
            <TabsTrigger value="scheduled" className="flex-1">Programmés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live">
            <ScheduledLivesList lives={liveStreams} />
          </TabsContent>
          
          <TabsContent value="scheduled">
            <LiveCalendarView scheduledLives={scheduledLives} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Lives;