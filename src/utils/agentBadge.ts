import { Award } from "lucide-react";

export type BadgeLevel = "Gold" | "Silver" | "Bronze";

export interface AgentBadge {
  level: BadgeLevel;
  color: string;
  textColor: string;
  borderColor: string;
}

export const getBadgeForAgent = (rating: number): AgentBadge => {
  if (rating >= 4.8) {
    return {
      level: "Gold",
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200"
    };
  } else if (rating >= 4.5) {
    return {
      level: "Silver",
      color: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200"
    };
  } else {
    return {
      level: "Bronze",
      color: "bg-orange-100",
      textColor: "text-orange-800",
      borderColor: "border-orange-200"
    };
  }
};