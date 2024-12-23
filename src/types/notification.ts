export interface Notification {
  id: string;
  type: "live" | "favorite" | "offer" | "general";
  title: string;
  message: string;
  date: Date;
  read: boolean;
  actionUrl?: string;
}