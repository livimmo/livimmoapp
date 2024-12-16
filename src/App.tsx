```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JoinLive } from "@/pages/JoinLive";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/Index";
import { PropertyDetails } from "@/pages/PropertyDetails";
import { SearchResults } from "@/pages/SearchResults";
import { Contact } from "@/pages/Contact";
import { About } from "@/pages/About";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/join-live/:id" element={<JoinLive />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
```