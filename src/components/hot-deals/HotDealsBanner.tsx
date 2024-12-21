import { Flame } from "lucide-react";

export const HotDealsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 mb-8 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Flame className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Hot Deals</h1>
      </div>
      <p className="text-white/90">
        Découvrez nos meilleures offres du moment ! Ces biens exceptionnels sont disponibles 
        pour une durée limitée à des prix avantageux.
      </p>
    </div>
  );
};