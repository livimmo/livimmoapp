import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for live streams
const liveStreams = [
  {
    id: 1,
    title: "Visite Villa Moderne",
    date: new Date(),
    type: "Villa",
    location: "Marrakech",
    viewers: 35,
    status: "live",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    agent: "Sarah Martin",
    price: "2,500,000 MAD",
    tags: ["Coup de fusil"]
  },
  {
    id: 2,
    title: "Appartement Vue Mer",
    date: new Date(),
    type: "Appartement",
    location: "Tanger",
    viewers: 28,
    status: "live",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    agent: "Mohammed Alami",
    price: "1,800,000 MAD",
    tags: ["Nouveauté", "Exclusivité"]
  },
  {
    id: 3,
    title: "Penthouse Luxueux",
    date: new Date(),
    type: "Appartement",
    location: "Casablanca",
    viewers: 42,
    status: "live",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    agent: "Karim Hassan",
    price: "3,200,000 MAD",
    tags: ["Exclusivité"]
  },
  {
    id: 4,
    title: "Riad Traditionnel",
    date: new Date(),
    type: "Riad",
    location: "Marrakech",
    viewers: 56,
    status: "live",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    agent: "Yasmine Benali",
    price: "4,500,000 MAD",
    tags: ["Coup de fusil", "Nouveauté"]
  },
];

const scheduledStreams = [
  {
    id: 5,
    title: "Bureau Centre-Ville",
    date: new Date(Date.now() + 86400000), // Tomorrow
    type: "Bureau",
    location: "Casablanca",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    agent: "Karim Benani",
    price: "3,500,000 MAD",
    tags: ["Nouveauté"]
  },
  {
    id: 6,
    title: "Villa avec Piscine",
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    type: "Villa",
    location: "Rabat",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    agent: "Leila Amrani",
    price: "4,200,000 MAD",
    tags: ["Exclusivité"]
  },
  {
    id: 7,
    title: "Duplex Moderne",
    date: new Date(Date.now() + 259200000), // In 3 days
    type: "Appartement",
    location: "Fès",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    agent: "Omar Tazi",
    price: "2,800,000 MAD",
    tags: ["Coup de fusil", "Nouveauté"]
  },
  {
    id: 8,
    title: "Local Commercial",
    date: new Date(Date.now() + 345600000), // In 4 days
    type: "Commercial",
    location: "Tanger",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    agent: "Sofia Alaoui",
    price: "1,900,000 MAD",
    tags: ["Exclusivité", "Nouveauté"]
  },
];

const LiveCard = ({ stream }: { stream: any }) => (
  <Card className="overflow-hidden">
    <div className="relative">
      <img 
        src={stream.thumbnail} 
        alt={stream.title} 
        className="w-full h-48 object-cover"
      />
      {stream.status === "live" && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {stream.viewers} spectateurs
        </div>
      )}
      <div className="absolute top-2 left-2 flex gap-1 flex-wrap max-w-[70%]">
        {stream.tags.map((tag: string) => (
          <Badge 
            key={tag} 
            variant={
              tag === "Coup de fusil" ? "destructive" : 
              tag === "Nouveauté" ? "default" : 
              "secondary"
            }
            className="text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
    <CardHeader>
      <CardTitle className="text-lg">{stream.title}</CardTitle>
      <div className="text-sm text-muted-foreground">
        {stream.type} • {stream.location}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-sm space-y-2">
        <div>Agent: {stream.agent}</div>
        <div>Prix: {stream.price}</div>
        <div>
          {stream.status === "scheduled" 
            ? `Date: ${stream.date.toLocaleDateString()}`
            : "En direct"
          }
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={stream.status === "live" ? "default" : "secondary"}>
        {stream.status === "live" ? "Rejoindre le live" : "S'inscrire au live"}
      </Button>
    </CardFooter>
  </Card>
);

const Lives = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Lives</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveStreams.map((stream) => (
                <LiveCard key={stream.id} stream={stream} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledStreams.map((stream) => (
                <LiveCard key={stream.id} stream={stream} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Lives;