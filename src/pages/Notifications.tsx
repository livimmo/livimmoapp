import { useState } from "react";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationTabs } from "@/components/notifications/NotificationTabs";
import { VisitsCalendarSection } from "@/components/notifications/VisitsCalendarSection";
import { Notification } from "@/types/notification";

// Données de démonstration
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "live",
    title: "Live imminent",
    message: "Le live 'Visite de villa à Casablanca' commence dans 15 minutes !",
    date: new Date(),
    read: false,
    actionUrl: "/lives",
  },
  {
    id: "2",
    type: "live",
    title: "Nouveau live programmé",
    message: "Un live pour la villa moderne à Marrakech est programmé pour demain à 15h",
    date: new Date(Date.now() - 1800000), // 30 minutes ago
    read: false,
    actionUrl: "/lives",
  },
  {
    id: "3",
    type: "favorite",
    title: "Baisse de prix !",
    message: "Le prix de la villa que vous suivez à Marrakech a baissé de 200,000 MAD",
    date: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
    actionUrl: "/favorites",
  },
  {
    id: "4",
    type: "offer",
    title: "Offre acceptée",
    message: "Votre offre pour l'appartement à Rabat a été acceptée !",
    date: new Date(Date.now() - 7200000), // 2 hours ago
    read: true,
    actionUrl: "/properties/1",
  },
  {
    id: "5",
    type: "favorite",
    title: "Nouveau bien similaire",
    message: "Un nouveau bien correspondant à vos critères est disponible à Tanger",
    date: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
    actionUrl: "/properties/2",
  },
  {
    id: "6",
    type: "offer",
    title: "Nouvelle contre-offre",
    message: "Le propriétaire a fait une contre-offre pour la villa à Agadir",
    date: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
    actionUrl: "/properties/3",
  },
  {
    id: "7",
    type: "live",
    title: "Live terminé disponible",
    message: "Le replay de la visite 'Appartement vue mer à Tanger' est maintenant disponible",
    date: new Date(Date.now() - 259200000), // 3 days ago
    read: true,
    actionUrl: "/lives/replay/1",
  },
  {
    id: "8",
    type: "general",
    title: "Mise à jour de votre profil",
    message: "Votre vérification d'identité a été validée avec succès",
    date: new Date(Date.now() - 345600000), // 4 days ago
    read: true,
  },
  {
    id: "9",
    type: "favorite",
    title: "Changement de disponibilité",
    message: "Un bien que vous suivez n'est plus disponible à la vente",
    date: new Date(Date.now() - 432000000), // 5 days ago
    read: true,
    actionUrl: "/favorites",
  },
  {
    id: "10",
    type: "offer",
    title: "Rappel de visite",
    message: "N'oubliez pas votre visite programmée demain à 14h",
    date: new Date(Date.now() - 518400000), // 6 days ago
    read: true,
    actionUrl: "/properties/4",
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const liveNotifications = notifications.filter(n => n.type === "live");
  const unreadLiveCount = liveNotifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (notification: Notification) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAll}
      />

      <div className="space-y-6">
        <VisitsCalendarSection />

        <NotificationTabs
          notifications={notifications}
          unreadCount={unreadCount}
          unreadLiveCount={unreadLiveCount}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onMarkAsRead={handleMarkAsRead}
        />
      </div>
    </div>
  );
};

export default Notifications;