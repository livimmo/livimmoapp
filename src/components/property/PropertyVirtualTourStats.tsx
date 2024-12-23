import { Property } from "@/types/property";
import { Card } from "@/components/ui/card";
import { Eye, Clock, BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PropertyVirtualTourStatsProps {
  property: Property;
}

export const PropertyVirtualTourStats = ({ property }: PropertyVirtualTourStatsProps) => {
  if (!property.virtual_tour?.statistics) return null;

  const { totalVisits, averageTime, popularRooms, lastVisits } = property.virtual_tour.statistics;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Statistiques de visite virtuelle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total des visites</p>
              <p className="text-2xl font-bold">{totalVisits}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Temps moyen</p>
              <p className="text-2xl font-bold">{averageTime}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Pièce la plus visitée</p>
              <p className="text-2xl font-bold">{popularRooms[0]?.name}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Popularité des pièces</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={popularRooms}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Dernières visites</h3>
        <div className="space-y-4">
          {lastVisits.map((visit, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{visit.date}</span>
              <span className="font-medium">{visit.duration}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};