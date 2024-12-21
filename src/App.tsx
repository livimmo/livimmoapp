import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyManagement from "./pages/PropertyManagement";
import HotDeals from "./pages/HotDeals";
import { BottomNav } from "./components/BottomNav";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/hot-deals" element={<HotDeals />} />
      </Routes>
      <BottomNav />
    </Router>
  );
};

export default App;