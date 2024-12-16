import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsDialog = ({ open, onOpenChange }: TermsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Conditions Générales d'Utilisation (CGU)</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Bienvenue sur notre plateforme ! Les présentes Conditions Générales d'Utilisation (CGU) régissent votre accès et votre utilisation de nos services. En utilisant notre plateforme, vous acceptez pleinement et sans réserve les termes ci-dessous.
            </p>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">1. Objet des CGU</h3>
              <p>Ces CGU définissent les conditions dans lesquelles :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Les utilisateurs (agents, promoteurs ou clients) peuvent accéder à nos services.</li>
                <li>Les contenus (lives, biens immobiliers, informations) peuvent être partagés et consultés sur la plateforme.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">2. Définitions</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-medium">Plateforme :</span> Désigne le site web et l'application mobile mis à disposition pour la diffusion et la gestion de lives immobiliers.</li>
                <li><span className="font-medium">Utilisateur :</span> Toute personne inscrite ou non inscrite accédant à la plateforme.</li>
                <li><span className="font-medium">Agent/Promoteur :</span> Professionnel utilisant la plateforme pour diffuser des lives ou publier des biens immobiliers.</li>
                <li><span className="font-medium">Client :</span> Personne assistant à des lives ou consultant des biens immobiliers.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">3. Inscription et Compte Utilisateur</h3>
              <div className="space-y-2">
                <h4 className="font-medium">3.1. Création de compte</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Pour accéder à certains services, l'utilisateur doit créer un compte.</li>
                  <li>Les informations fournies lors de l'inscription doivent être exactes, complètes et à jour.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">3.2. Responsabilité de l’utilisateur</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>L’utilisateur est seul responsable de la confidentialité de ses identifiants et des actions réalisées sur son compte.</li>
                  <li>Toute utilisation frauduleuse de votre compte doit être signalée immédiatement.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">4. Services proposés</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Diffusion de lives immobiliers : Les agents et promoteurs peuvent planifier, gérer et diffuser des lives pour présenter leurs biens.</li>
                <li>Consultation de biens : Les clients peuvent consulter les biens immobiliers et participer aux lives pour poser des questions ou soumettre des offres.</li>
                <li>Offres et interactions : Les utilisateurs peuvent soumettre des offres sur les biens, sous réserve des règles en vigueur.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">5. Engagements des utilisateurs</h3>
              <div className="space-y-2">
                <h4 className="font-medium">5.1. Règles générales</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Les utilisateurs s’engagent à utiliser la plateforme de manière légale et respectueuse des autres utilisateurs.</li>
                  <li>Toute activité frauduleuse, diffamatoire, ou portant atteinte à la réputation d’autrui est strictement interdite.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">5.2. Contenus publiés</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Les agents/promoteurs doivent garantir que les informations et visuels publiés (biens, descriptions, photos) sont exacts et conformes à la réalité.</li>
                  <li>La plateforme se réserve le droit de supprimer tout contenu inapproprié ou non conforme.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">6. Notifications et rappels</h3>
              <p>En s’inscrivant, l’utilisateur accepte de recevoir :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Des rappels pour les lives programmés.</li>
                <li>Des notifications importantes concernant les mises à jour de services.</li>
              </ul>
              <p>Les utilisateurs peuvent gérer leurs préférences de notifications dans les paramètres de leur compte.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">7. Propriété intellectuelle</h3>
              <p>Tous les contenus présents sur la plateforme (textes, images, vidéos, logiciels, design) sont protégés par les lois relatives à la propriété intellectuelle.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Toute reproduction ou utilisation non autorisée des contenus est strictement interdite.</li>
                <li>Les utilisateurs conservent les droits sur les contenus qu’ils publient, mais accordent à la plateforme une licence limitée pour diffuser ces contenus.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">8. Responsabilités</h3>
              <div className="space-y-2">
                <h4 className="font-medium">8.1. Limitation de responsabilité</h4>
                <p>La plateforme ne saurait être tenue responsable :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Des interruptions de service liées à des problèmes techniques.</li>
                  <li>Des interactions ou transactions entre utilisateurs (agents/promoteurs et clients).</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">8.2. Exclusion de garanties</h4>
                <p>La plateforme est fournie “en l’état”. Nous ne garantissons pas que les services répondront parfaitement à vos attentes.</p>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">9. Modification des CGU</h3>
              <p>Nous nous réservons le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des modifications et invités à les accepter pour continuer à utiliser la plateforme.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">10. Résiliation</h3>
              <p>La plateforme se réserve le droit de suspendre ou de résilier un compte utilisateur en cas de non-respect des présentes CGU.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">11. Données personnelles</h3>
              <p>Vos données personnelles sont collectées et traitées conformément à notre Politique de Confidentialité. En utilisant la plateforme, vous acceptez ces traitements.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">12. Loi applicable et juridiction compétente</h3>
              <p>Ces CGU sont régies par les lois du [Pays]. Tout litige sera soumis à la juridiction compétente du lieu du siège social de la plateforme.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base">13. Contact</h3>
              <p>Pour toute question ou réclamation concernant les CGU, vous pouvez nous contacter :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email : contact@example.com</li>
                <li>Téléphone : +212 XXX XXX XXX</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
