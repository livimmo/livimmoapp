import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Search from "./pages/Search";
import Lives from "./pages/Lives";
import JoinLive from "./pages/JoinLive";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Favorites from "./pages/Favorites";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import Developers from "./pages/Developers";
import DeveloperDetail from "./pages/DeveloperDetail";
import PropertyManagement from "./pages/PropertyManagement";
import SubmitProperty from "./pages/SubmitProperty";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/lives" element={<Lives />} />
        <Route path="/join-live/:id" element={<JoinLive />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/developer/:id" element={<DeveloperDetail />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/submit-property" element={<SubmitProperty />} />
      </Routes>
    </Router>
  );
}

export default App;