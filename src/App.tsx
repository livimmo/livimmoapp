import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Lives from "./pages/Lives";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import JoinLive from "./pages/JoinLive";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Developers from "./pages/Developers";
import DeveloperDetail from "./pages/DeveloperDetail";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import PropertyManagement from "./pages/PropertyManagement";
import SubmitProperty from "./pages/SubmitProperty";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <div className="pt-16 pb-20 min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/lives" element={<Lives />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/live/:id" element={<JoinLive />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/developer/:id" element={<DeveloperDetail />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agent/:id" element={<AgentDetail />} />
              <Route path="/my-properties" element={<PropertyManagement />} />
              <Route path="/submit-property" element={<SubmitProperty />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            </Routes>
          </div>
          <BottomNav />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;