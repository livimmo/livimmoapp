import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LiveControls = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 left-4 flex items-start">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/50 text-white hover:bg-black/75"
        onClick={() => navigate(-1)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};