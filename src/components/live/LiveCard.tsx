import { LiveEvent } from "@/types/live";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";

interface LiveCardProps {
  live: LiveEvent;
}

export const LiveCard = ({ live }: LiveCardProps) => {
  const formattedDate = live.date
    ? new Date(live.date).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
      <Link
        to={live.status === "live" ? `/live/${live.id}` : `/live/schedule/${live.id}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden rounded-md">
          <img
            src={live.thumbnail}
            alt={live.title}
            className="object-cover transition-transform group-hover:scale-105"
          />
          {live.status === "live" && (
            <div className="absolute left-2 top-2">
              <Badge variant="destructive" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                En direct
              </Badge>
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="font-semibold">{live.title}</h3>
          <p className="text-sm text-muted-foreground">
            {live.status === "live"
              ? `${live.viewers} spectateurs`
              : formattedDate}
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <img
              src={`https://i.pravatar.cc/150?u=${live.agent}`}
              alt={live.agent}
              className="h-6 w-6 rounded-full"
            />
            <span>{live.agent}</span>
          </div>
          {live.status !== "live" && (
            <Button 
              className="w-full mt-4"
              variant="outline"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Réserver
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
};