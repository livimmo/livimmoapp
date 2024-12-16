import React from "react";
import { LiveCalendarView } from "@/components/live/LiveCalendarView";
import { ScheduledLivesList } from "@/components/live/ScheduledLivesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLives } from "@/data/mockLives";

const Lives = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lives programmés</h1>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <ScheduledLivesList lives={mockLives} />
        </TabsContent>
        <TabsContent value="calendar">
          <LiveCalendarView scheduledLives={mockLives} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Lives;