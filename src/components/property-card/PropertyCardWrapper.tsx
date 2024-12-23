import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PropertyCardWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PropertyCardWrapper = ({ children, className }: PropertyCardWrapperProps) => {
  return (
    <div className={cn(
      "group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300",
      "transform hover:-translate-y-1",
      className
    )}>
      {children}
    </div>
  );
};