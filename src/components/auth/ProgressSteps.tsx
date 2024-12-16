import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

export const ProgressSteps = ({ currentStep, steps }: ProgressStepsProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        {steps.map((step, index) => (
          <div
            key={step}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center z-10",
                "transition-colors duration-200",
                index <= currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-400"
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};