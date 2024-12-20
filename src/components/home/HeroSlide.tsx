import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SlideContent {
  image: string;
  title: string;
  description?: string;
  buttonText: string;
  link: string;
  viewers?: number;
  duration?: string;
  agent?: string;
}

interface HeroSlideProps {
  type: "ad" | "live" | "replay";
  content: SlideContent;
}

export const HeroSlide = ({ type, content }: HeroSlideProps) => {
  const navigate = useNavigate();

  const getBadgeContent = () => {
    switch (type) {
      case "live":
        return (
          <Badge variant="destructive" className="animate-pulse">
            <span className="relative flex h-2 w-2 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            En direct
          </Badge>
        );
      case "replay":
        return (
          <Badge variant="secondary" className="bg-primary text-white">
            Replay
          </Badge>
        );
      case "ad":
        return (
          <Badge variant="secondary" className="bg-white/80 text-primary backdrop-blur-sm">
            Publicité
          </Badge>
        );
    }
  };

  return (
    <div className="relative w-full aspect-[21/9] overflow-hidden rounded-lg group">
      <img
        src={content.image}
        alt={content.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="absolute top-4 left-4 flex gap-2">
          {getBadgeContent()}
          {type === "live" && content.viewers && (
            <Badge variant="secondary" className="bg-white/80 text-primary backdrop-blur-sm">
              <Users className="w-3 h-3 mr-1" />
              {content.viewers} spectateurs
            </Badge>
          )}
          {type === "replay" && content.duration && (
            <Badge variant="secondary" className="bg-white/80 text-primary backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" />
              {content.duration}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
              {content.description}
            </p>
          )}
          {content.agent && (
            <p className="text-white/80 text-sm mb-4">
              Par {content.agent}
            </p>
          )}
          <Button
            onClick={() => navigate(content.link)}
            variant={type === "live" ? "destructive" : "default"}
            size="lg"
            className={`
              transform transition-all duration-300 
              hover:scale-105 active:scale-95
              ${type === "live" ? "animate-pulse" : ""}
            `}
          >
            {type === "live" && <Eye className="w-4 h-4 mr-2" />}
            {content.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};