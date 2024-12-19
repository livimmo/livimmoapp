import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MessageCircle, Calendar as CalendarIcon } from "lucide-react";

interface PrivateVisit {
  id: string;
  propertyId: number;
  propertyTitle: string;
  propertyImage: string;
  userId: string;
  userName: string;
  requestedDate: Date;
  requestedTime: string;
  status: "pending" | "confirmed" | "cancelled";
  comment?: string;
}

// Mock data for demonstration
const mockVisits: PrivateVisit[] = [
  {
    id: "1",
    propertyId: 1,
    propertyTitle: "Villa moderne à Casablanca",
    propertyImage: "/placeholder.svg",
    userId: "user1",
    userName: "John Doe",
    requestedDate: new Date(),
    requestedTime: "14:00",
    status: "pending",
    comment: "Je souhaiterais visiter le jardin en particulier",
  },
  {
    id: "2",
    propertyId: 2,
    propertyTitle: "Appartement vue mer à Tanger",
    propertyImage: "/placeholder.svg",
    userId: "user2",
    userName: "Jane Smith",
    requestedDate: new Date(),
    requestedTime: "16:30",
    status: "confirmed",
  },
];

export const PrivateVisitsManagement = () => {
  const { toast } = useToast();
  const [visits, setVisits] = useState<PrivateVisit[]>(mockVisits);
  const [selectedVisit, setSelectedVisit] = useState<PrivateVisit | null>(null);
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date>();
  const [newTime, setNewTime] = useState("");
  const [modificationComment, setModificationComment] = useState("");

  const handleConfirm = (visit: PrivateVisit) => {
    setVisits(visits.map(v => 
      v.id === visit.id ? { ...v, status: "confirmed" } : v
    ));
    toast({
      title: "Visite confirmée",
      description: `La visite pour ${visit.propertyTitle} a été confirmée.`,
    });
  };

  const handleModify = (visit: PrivateVisit) => {
    setSelectedVisit(visit);
    setNewDate(visit.requestedDate);
    setNewTime(visit.requestedTime);
    setIsModifyDialogOpen(true);
  };

  const handleCancel = (visit: PrivateVisit) => {
    setVisits(visits.map(v => 
      v.id === visit.id ? { ...v, status: "cancelled" } : v
    ));
    toast({
      title: "Visite annulée",
      description: `La visite pour ${visit.propertyTitle} a été annulée.`,
      variant: "destructive",
    });
  };

  const handleModifySubmit = () => {
    if (!selectedVisit || !newDate || !newTime) return;

    setVisits(visits.map(v => 
      v.id === selectedVisit.id 
        ? { 
            ...v, 
            requestedDate: newDate, 
            requestedTime: newTime,
            status: "pending",
          } 
        : v
    ));

    toast({
      title: "Nouvelle date proposée",
      description: `Une nouvelle date a été proposée pour la visite de ${selectedVisit.propertyTitle}.`,
    });

    setIsModifyDialogOpen(false);
    setSelectedVisit(null);
    setModificationComment("");
  };

  const getStatusBadge = (status: PrivateVisit["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "confirmed":
        return <Badge variant="default">Confirmée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Visites Privées</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Synchroniser le calendrier
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bien</TableHead>
            <TableHead>Visiteur</TableHead>
            <TableHead>Date et heure</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={visit.propertyImage}
                    alt={visit.propertyTitle}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{visit.propertyTitle}</div>
                    {visit.comment && (
                      <div className="text-sm text-muted-foreground">
                        {visit.comment}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{visit.userName}</TableCell>
              <TableCell>
                {format(visit.requestedDate, "dd MMMM yyyy", { locale: fr })}
                <br />
                <span className="text-muted-foreground">{visit.requestedTime}</span>
              </TableCell>
              <TableCell>{getStatusBadge(visit.status)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {visit.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleConfirm(visit)}
                      >
                        Confirmer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleModify(visit)}
                      >
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancel(visit)}
                      >
                        Annuler
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModifyDialogOpen} onOpenChange={setIsModifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la date de visite</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nouvelle date</Label>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                className="rounded-md border"
                locale={fr}
              />
            </div>
            <div className="space-y-2">
              <Label>Nouvelle heure</Label>
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Commentaire (optionnel)</Label>
              <Input
                value={modificationComment}
                onChange={(e) => setModificationComment(e.target.value)}
                placeholder="Raison du changement..."
              />
            </div>
            <Button onClick={handleModifySubmit} className="w-full">
              Proposer la nouvelle date
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};