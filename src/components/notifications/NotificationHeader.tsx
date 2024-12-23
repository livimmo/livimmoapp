import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationHeader = ({
  unreadCount,
  onMarkAllAsRead,
  onClearAll,
}: NotificationHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <Badge variant="destructive">{unreadCount}</Badge>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
          Tout marquer comme lu
        </Button>
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Tout effacer
        </Button>
      </div>
    </div>
  );
};