import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { Loader2 } from "lucide-react";

const AppLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <PhoneShell>
      <div className="flex flex-col h-full min-h-screen md:min-h-[820px]">
        <main className="flex-1 overflow-y-auto pb-2">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </PhoneShell>
  );
};

export default AppLayout;
