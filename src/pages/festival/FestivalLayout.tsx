import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import FestivalHeader from "@/components/festival/FestivalHeader";
import FestivalFooter from "@/components/festival/FestivalFooter";
import "@/styles/festival.css";

export default function FestivalLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="festival-root">
      <FestivalHeader />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <FestivalFooter />
    </div>
  );
}
