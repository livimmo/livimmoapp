import { useState, FormEvent } from "react";
import { AccountTypeSelector } from "@/components/profile/AccountTypeSelector";
import { type AccountType } from "@/types/user";

export const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accountType: "user" as AccountType,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const info = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };
    console.log("Submitting form:", info);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold">Mon Profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <AccountTypeSelector
            value={formData.accountType}
            onChange={(value) => handleFieldChange("accountType", value)}
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Mettre à jour</button>
      </form>
    </div>
  );
};

export default Profile;