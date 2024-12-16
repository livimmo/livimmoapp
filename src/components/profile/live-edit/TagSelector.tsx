import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagSelectorProps {
  tags: string[];
  availableTags: string[];
  onTagToggle: (tag: string) => void;
}

export const TagSelector = ({ tags, availableTags, onTagToggle }: TagSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Button
            key={tag}
            type="button"
            variant={tags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};