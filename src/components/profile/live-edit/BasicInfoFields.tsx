import { Input } from "@/components/ui/input";

interface BasicInfoFieldsProps {
  title: string;
  description: string;
  price: string;
  surface: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSurfaceChange: (value: string) => void;
}

export const BasicInfoFields = ({
  title,
  description,
  price,
  surface,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onSurfaceChange,
}: BasicInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Titre du Live*</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Ex: Visite Villa Moderne Casablanca"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description de la visite..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Prix*</label>
        <div className="relative">
          <Input
            type="number"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="Prix en DH"
            required
            className="pl-8"
          />
          <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">DH</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Surface*</label>
        <div className="relative">
          <Input
            type="number"
            value={surface}
            onChange={(e) => onSurfaceChange(e.target.value)}
            placeholder="Surface en m²"
            required
            className="pl-8"
          />
          <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">m²</span>
        </div>
      </div>
    </div>
  );
};