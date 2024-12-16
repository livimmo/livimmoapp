import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import router from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);