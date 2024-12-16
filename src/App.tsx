import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="pt-16">
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
          </Routes>
        </div>
        <BottomNav />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;