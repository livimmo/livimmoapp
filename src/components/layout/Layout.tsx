import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { BottomNav } from "../BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

export const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
};