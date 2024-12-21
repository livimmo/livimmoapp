interface AgentCertificationBadgeProps {
  rating: number;
  className?: string;
  showLevel?: boolean;
}

export const AgentCertificationBadge = ({ rating, className = "", showLevel = true }: AgentCertificationBadgeProps) => {
  const getBadgeColor = () => {
    if (rating >= 4.5) return "bg-green-500";
    if (rating >= 3.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`inline-block w-3 h-3 rounded-full ${getBadgeColor()}`} />
      {showLevel && <span className="ml-2 text-sm">{rating}</span>}
    </div>
};
