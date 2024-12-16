import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { SocialConnect } from "@/components/profile/SocialConnect";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { ProgressSteps } from "@/components/auth/ProgressSteps";
import { BasicInfoStep } from "@/components/auth/BasicInfoStep";
import { RoleSpecificStep } from "@/components/auth/RoleSpecificStep";
import { ConfirmationStep } from "@/components/auth/ConfirmationStep";

const steps = ["Informations", "Rôle", "Détails", "Confirmation"];

export const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // Role specific fields
    companyName: "",
    sector: "",
    agency: "",
    location: "",
    propertyType: "",
    budget: "",
    desiredLocation: "",
    phone: "",
  });

  const { signup } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleConfirm = async () => {
    if (selectedRole) {
      await signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        selectedRole
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData}
            onChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <RoleSelector
            selectedRole={selectedRole}
            onSelect={(role) => {
              setSelectedRole(role);
              handleNext();
            }}
          />
        );
      case 2:
        return selectedRole ? (
          <RoleSpecificStep
            role={selectedRole}
            formData={formData}
            onChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        ) : null;
      case 3:
        return selectedRole ? (
          <ConfirmationStep
            role={selectedRole}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Créez votre compte
          </h1>
          <p className="text-muted-foreground">
            Rejoignez notre communauté en quelques étapes simples
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} steps={steps} />

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          {renderStep()}
        </div>

        {currentStep === 0 && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou inscrivez-vous avec
                </span>
              </div>
            </div>

            <SocialConnect />

            <p className="text-center text-sm">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Connectez-vous ici
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;