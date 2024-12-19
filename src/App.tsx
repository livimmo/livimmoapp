import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { VisitNotifications } from "./components/notifications/VisitNotifications";

// Mock data pour les visites (à remplacer par les vraies données)
const mockVisits = [
  {
    id: "1",
    propertyId: 1,
    propertyTitle: "Villa moderne à Casablanca",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Dans 24h
    status: "confirmed" as const,
    isLive: true,
    liveUrl: "https://meet.google.com/abc-defg-hij"
  },
  // Ajoutez d'autres visites si nécessaire
];

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <VisitNotifications visits={mockVisits} />
          <Routes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;