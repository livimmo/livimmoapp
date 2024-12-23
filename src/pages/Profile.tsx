import { useState } from "react";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { type UserRole } from "@/types/user";

export const Profile = () => {
  const [role, setRole] = useState<UserRole>("owner");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890"
  });

  const handlePersonalInfoChange = (info: typeof personalInfo) => {
    setPersonalInfo(info);
  };

  const handlePersonalInfoSubmit = async (info: typeof personalInfo) => {
    // Handle submission
    console.log("Submitting:", info);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Mon Profil</h1>
      
      <div className="space-y-8">
        <ProfileAvatar
          firstName={personalInfo.firstName}
          lastName={personalInfo.lastName}
          avatar="/placeholder.svg"
          accountType={role}
        />
        
        <PersonalInfo
          {...personalInfo}
          accountType={role}
          onSubmit={handlePersonalInfoSubmit}
          onChange={handlePersonalInfoChange}
        />
      </div>
    </div>
  );
};
