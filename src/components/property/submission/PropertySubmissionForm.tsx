import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { OwnerInfoStep } from "./steps/OwnerInfoStep";
import { MediaUploadStep } from "./steps/MediaUploadStep";
import { AvailabilityStep } from "./steps/AvailabilityStep";
import { ConsentStep } from "./steps/ConsentStep";

interface PropertySubmissionFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export const PropertySubmissionForm = ({ onSubmit, isSubmitting }: PropertySubmissionFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {},
    ownerInfo: {},
    media: [],
    availability: {},
    consent: false,
  });

  const updateFormData = (step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={formData.basicInfo}
            onUpdate={(data) => updateFormData("basicInfo", data)}
          />
        );
      case 2:
        return (
          <OwnerInfoStep
            data={formData.ownerInfo}
            onUpdate={(data) => updateFormData("ownerInfo", data)}
          />
        );
      case 3:
        return (
          <MediaUploadStep
            data={formData.media}
            onUpdate={(data) => updateFormData("media", data)}
          />
        );
      case 4:
        return (
          <AvailabilityStep
            data={formData.availability}
            onUpdate={(data) => updateFormData("availability", data)}
          />
        );
      case 5:
        return (
          <ConsentStep
            data={formData.consent}
            onUpdate={(data) => updateFormData("consent", data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-1/5 h-1 rounded ${
                step <= currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Précédent
            </Button>
          )}
          
          {currentStep < 5 ? (
            <Button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="ml-auto"
            >
              Suivant
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !formData.consent}
              className="ml-auto"
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre mon bien"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};