import { Outlet } from "react-router-dom";
import { Header } from "../layout/Header";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};