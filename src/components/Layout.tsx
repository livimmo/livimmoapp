import { Outlet } from "react-router-dom";
import { Header } from "./layout/Header";
import { BottomNav } from "./BottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px] pb-[70px] min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;