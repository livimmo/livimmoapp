import { Building2 } from "lucide-react";

export const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
        <Building2 className="h-4 w-4 md:h-5 md:w-5" />
        <span className="font-medium">
          Découvrez les meilleures offres immobilières en direct avec nos lives exclusifs !
        </span>
      </div>
    </div>
  );
};