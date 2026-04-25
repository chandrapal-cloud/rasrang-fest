import logo from "@/assets/bhar-logo.jpeg";

export const BharLogo = ({ size = 56, withWord = true }: { size?: number; withWord?: boolean }) => (
  <div className="flex items-center gap-3">
    <div
      className="relative rounded-2xl overflow-hidden bg-white shadow-soft flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <img src={logo} alt="BHAR" className="object-contain w-full h-full" />
    </div>
    {withWord && (
      <span
        className="font-display font-bold tracking-tight text-secondary-foreground"
        style={{ fontSize: size * 0.5 }}
      >
        BHA<span className="text-primary">र</span>
      </span>
    )}
  </div>
);
