import { type UserRole } from "@/types/user";

export interface PropertySubmissionFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
  userRole: UserRole;
}

export const PropertySubmissionForm = ({
  onSubmit,
  isSubmitting,
  userRole
}: PropertySubmissionFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    location: "",
    type: "",
    surface: 0,
    rooms: 0,
    bathrooms: 0,
    description: "",
    features: [],
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
        required
      />
      <input
        type="number"
        name="surface"
        value={formData.surface}
        onChange={handleChange}
        placeholder="Surface (m²)"
        required
      />
      <input
        type="number"
        name="rooms"
        value={formData.rooms}
        onChange={handleChange}
        placeholder="Rooms"
        required
      />
      <input
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        placeholder="Bathrooms"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <div>
        <h3>Features</h3>
        {["Pool", "Garden", "Garage"].map(feature => (
          <label key={feature}>
            <input
              type="checkbox"
              checked={formData.features.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
            />
            {feature}
          </label>
        ))}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
