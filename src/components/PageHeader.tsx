import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const PageHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-hero text-secondary-foreground rounded-b-[2rem] px-6 pt-12 pb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/15"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {action}
      </div>
      <div className="mt-4">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
      </div>
    </header>
  );
};
