import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LiveVideoPlayerProps {
  videoId: string;
  isReplay?: boolean;
  onLoad?: () => void;
}

export const LiveVideoPlayer = ({ videoId, isReplay = false, onLoad }: LiveVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isMobile = useIsMobile();

  const getEmbedUrl = () => {
    const baseUrl = 'https://www.youtube.com/embed/';
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
      playsinline: '1',
      enablejsapi: '1',
      origin: window.location.origin,
      controls: '1',
      ...(isPlaying && { autoplay: '1' }),
      // Ajout des paramètres spécifiques pour mobile
      ...(isMobile && {
        fs: '1', // Active le mode plein écran
        playsinline: '1', // Permet la lecture en ligne sur iOS
      }),
    });
    
    return `${baseUrl}${videoId}?${params.toString()}`;
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (iframeRef.current) {
      iframeRef.current.src = getEmbedUrl();
    }
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    onLoad?.();
  };

  useEffect(() => {
    setIsPlaying(false);
    setIframeLoaded(false);
  }, [videoId]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {(!isPlaying || !iframeLoaded) && (
        <div 
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 cursor-pointer"
          onClick={handlePlayClick}
        >
          <button className={`
            px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors
            ${isReplay ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-red-500 text-white hover:bg-red-600"}
          `}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {isReplay ? "Lancer le replay" : "Lancer le live"}
          </button>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={getEmbedUrl()}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        className="w-full h-full"
        onLoad={handleIframeLoad}
        style={{
          aspectRatio: isMobile ? "16/9" : undefined,
          maxHeight: isMobile ? "calc(100vh - 200px)" : undefined,
        }}
      />
    </div>
  );
};