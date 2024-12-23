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
import Directory from "./pages/Directory";
import DeveloperDetail from "./pages/DeveloperDetail";
import AgentDetail from "./pages/AgentDetail";
import PropertyManagement from "./pages/PropertyManagement";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";

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
              <Route path="/directory" element={<Directory />} />
              <Route path="/developer/:id" element={<DeveloperDetail />} />
              <Route path="/agent/:id" element={<AgentDetail />} />
              <Route path="/my-properties" element={<PropertyManagement />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="agents" element={<AdminAgents />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
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