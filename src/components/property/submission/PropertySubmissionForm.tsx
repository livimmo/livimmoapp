import { UserRole } from "@/types/user";

export interface PropertySubmissionFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
  userRole: UserRole;
}

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PropertySubmissionForm = ({ onSubmit, isSubmitting, userRole }: PropertySubmissionFormProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [surface, setSurface] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title,
      price,
      location,
      type,
      surface,
      rooms,
      bathrooms,
      description,
      images,
      userRole,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="surface">Surface</Label>
        <Input
          id="surface"
          type="number"
          value={surface}
          onChange={(e) => setSurface(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="rooms">Rooms</Label>
        <Input
          id="rooms"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="bathrooms">Bathrooms</Label>
        <Input
          id="bathrooms"
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="images">Images</Label>
        <Input
          id="images"
          value={images.join(", ")}
          onChange={(e) => setImages(e.target.value.split(",").map(img => img.trim()))}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default PropertySubmissionForm;
