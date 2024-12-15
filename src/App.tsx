import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/layout/Header";
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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
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
        </Routes>
      </div>
      <BottomNav />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;