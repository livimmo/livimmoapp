import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const ConfirmationStep = ({ propertyData, liveData, onConfirm }) => {
  if (!propertyData || !liveData) return null;

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Informations du bien</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Titre:</span> {propertyData.title}</p>
              <p><span className="font-medium">Description:</span> {propertyData.description}</p>
              <p><span className="font-medium">Localisation:</span> {propertyData.location}</p>
              {propertyData.tags?.length > 0 && (
                <div>
                  <span className="font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {propertyData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Configuration du Live</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Titre du Live:</span> {liveData.title}</p>
              <p>
                <span className="font-medium">Type:</span>{" "}
                {liveData.type === "immediate" ? "Immédiat" : "Programmé"}
              </p>
              {liveData.type === "scheduled" && (
                <p>
                  <span className="font-medium">Date et heure:</span>{" "}
                  {format(liveData.date, "d MMMM yyyy", { locale: fr })} à {liveData.time}
                </p>
              )}
              <div className="space-y-1">
                <p className="font-medium">Paramètres d'interaction:</p>
                <ul className="list-disc list-inside">
                  <li>Chat en direct: {liveData.enableChat ? "Activé" : "Désactivé"}</li>
                  <li>Offres: {liveData.enableOffers ? "Activées" : "Désactivées"}</li>
                  <li>Questions: {liveData.enableQuestions ? "Activées" : "Désactivées"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="flex justify-end gap-2">
        <Button
          onClick={onConfirm}
          className="bg-[#ea384c] text-white hover:bg-[#ea384c]/90"
        >
          {liveData.type === "immediate" ? "Lancer le Live" : "Programmer le Live"}
        </Button>
      </div>
    </div>
  );
};