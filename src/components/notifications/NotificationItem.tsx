import { Bell, Home, MessageCircle, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NotificationItemProps {
  notification: {
    id: string;
    type: "live" | "favorite" | "offer" | "general";
    title: string;
    message: string;
    date: Date;
    read: boolean;
    actionUrl?: string;
  };
  onMarkAsRead: () => void;
}

export const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (notification.type) {
      case "live":
        return <Calendar className="h-5 w-5 text-primary" />;
      case "favorite":
        return <Home className="h-5 w-5 text-primary" />;
      case "offer":
        return <DollarSign className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const handleClick = () => {
    onMarkAsRead();
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <Card
      className={cn(
        "p-4 mb-2 cursor-pointer hover:bg-accent transition-colors",
        !notification.read && "bg-accent/50"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">{notification.title}</h3>
            <span className="text-sm text-muted-foreground">
              {new Date(notification.date).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          {notification.actionUrl && (
            <Button variant="link" className="p-0 h-auto mt-2" size="sm">
              Voir plus
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};