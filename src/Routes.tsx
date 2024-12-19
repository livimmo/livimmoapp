import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Lives from "./pages/Lives";
import JoinLive from "./pages/JoinLive";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/lives" element={<Lives />} />
      <Route path="/join-live/:id" element={<JoinLive />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/notifications" element={<Notifications />} />
    </RouterRoutes>
  );
};