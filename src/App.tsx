import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import PropertyManagement from "./pages/PropertyManagement";
import HotDeals from "./pages/HotDeals";
import BottomNav from "./components/BottomNav";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-management" element={<PropertyManagement />} />
          <Route path="/hot-deals" element={<HotDeals />} />
        </Routes>
        <BottomNav />
      </Router>
    </AuthProvider>
  );
};

export default App;