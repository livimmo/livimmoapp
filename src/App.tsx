import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/layout/Header";
import { BottomNav } from "./components/BottomNav";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Lives from "./pages/Lives";
import AgentProfile from "./pages/AgentProfile";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/lives" element={<Lives />} />
              <Route path="/agent/:id" element={<AgentProfile />} />
            </Routes>
          </main>
          <BottomNav />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;