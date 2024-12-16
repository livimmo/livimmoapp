import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Directory from "@/pages/Directory";
import AgentDetail from "@/pages/AgentDetail";
import DeveloperDetail from "@/pages/DeveloperDetail";
import Developers from "@/pages/Developers";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import { AuthProvider } from "@/contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/directory",
        element: <Directory />,
      },
      {
        path: "/agent/:id",
        element: <AgentDetail />,
      },
      {
        path: "/developer/:id",
        element: <DeveloperDetail />,
      },
      {
        path: "/developers",
        element: <Developers />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export default router;