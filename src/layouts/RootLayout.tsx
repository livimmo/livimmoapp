import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;