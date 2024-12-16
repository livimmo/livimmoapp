import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Lives from "@/pages/Lives";
import AgentProfile from "@/pages/AgentProfile";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
