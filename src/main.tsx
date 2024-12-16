import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import router from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

const Root = () => (
  <RouterProvider router={router}>
    <AuthProvider>
      {/* Router children will be rendered here */}
    </AuthProvider>
  </RouterProvider>
);

createRoot(document.getElementById("root")!).render(<Root />);