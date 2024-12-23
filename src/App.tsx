import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Routes } from "./Routes";

function App() {
  const isMobile = useIsMobile();

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="pb-16">
            <Routes />
          </div>
          <BottomNav />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;