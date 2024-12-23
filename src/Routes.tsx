import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { Properties } from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Search from "@/pages/Search";
import Agents from "@/pages/Agents";
import AgentDetail from "@/pages/AgentDetail";
import Developers from "@/pages/Developers";
import DeveloperDetail from "@/pages/DeveloperDetail";
import Lives from "@/pages/Lives";
import { LiveStream } from "@/pages/JoinLive";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Profile from "@/pages/Profile";
import Favorites from "@/pages/Favorites";
import PropertyManagement from "@/pages/PropertyManagement";
import OwnerDashboard from "@/pages/OwnerDashboard";
import Notifications from "@/pages/Notifications";
import DeveloperDashboard from "@/pages/DeveloperDashboard";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/agents/:id" element={<AgentDetail />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/developers/:id" element={<DeveloperDetail />} />
      <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
      <Route path="/lives" element={<Lives />} />
      <Route path="/lives/:id" element={<LiveStream />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/property-management" element={<PropertyManagement />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/notifications" element={<Notifications />} />
    </RouterRoutes>
  );
};