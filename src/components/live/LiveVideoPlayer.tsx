import { useEffect } from "react";

interface LiveVideoPlayerProps {
  videoId: string;
}

export const LiveVideoPlayer = ({ videoId }: LiveVideoPlayerProps) => {
  useEffect(() => {
    // Cleanup function pour arrêter la vidéo quand le composant est démonté
    return () => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        // Envoie un message pour arrêter la vidéo
        iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black">
      <iframe
        key={videoId}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};