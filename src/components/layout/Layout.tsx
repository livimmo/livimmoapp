import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { BottomNav } from "../BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

export const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
};