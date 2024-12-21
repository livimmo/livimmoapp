export interface AgentBadge {
  color: string;
  textColor: string;
  borderColor: string;
}

export const getBadgeForAgent = (rating: number): AgentBadge => {
  return {
    color: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-200"
  };
};