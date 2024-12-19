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
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, X, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VisitStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Visit {
  id: string;
  propertyId: number;
  propertyTitle: string;
  userId: string;
  userName: string;
  requestedDate: Date;
  status: VisitStatus;
  message?: string;
}

export const VisitManagement = () => {
  const { toast } = useToast();
  const [visits] = useState<Visit[]>([
    {
      id: "1",
      propertyId: 1,
      propertyTitle: "Villa moderne à Casablanca",
      userId: "user1",
      userName: "John Doe",
      requestedDate: new Date(),
      status: "pending",
      message: "Je souhaite voir particulièrement la terrasse",
    },
    // Add more mock visits as needed
  ]);

  const handleAccept = (visitId: string) => {
    toast({
      title: "Visite acceptée",
      description: "Un email de confirmation a été envoyé au client.",
    });
  };

  const handleReject = (visitId: string) => {
    toast({
      title: "Visite refusée",
      description: "Le client sera notifié du refus.",
    });
  };

  const getStatusBadge = (status: VisitStatus) => {
    const variants = {
      pending: "warning",
      confirmed: "success",
      cancelled: "destructive",
      completed: "secondary",
    };

    const labels = {
      pending: "En attente",
      confirmed: "Confirmée",
      cancelled: "Annulée",
      completed: "Terminée",
    };

    return <Badge variant={variants[status] as any}>{labels[status]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Gestion des visites privées</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Bien</TableHead>
            <TableHead>Date demandée</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell>{visit.userName}</TableCell>
              <TableCell>{visit.propertyTitle}</TableCell>
              <TableCell>
                {format(visit.requestedDate, "PPP 'à' HH'h'mm", { locale: fr })}
              </TableCell>
              <TableCell>{getStatusBadge(visit.status)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {visit.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleAccept(visit.id)}
                      >
                        <Check className="h-4 w-4" />
                        Accepter
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleReject(visit.id)}
                      >
                        <X className="h-4 w-4" />
                        Refuser
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </Button>
                  {visit.status === "confirmed" && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      Modifier
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};