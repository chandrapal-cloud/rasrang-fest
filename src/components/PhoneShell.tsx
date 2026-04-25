import { ReactNode } from "react";

interface PhoneShellProps {
  children: ReactNode;
  className?: string;
}

/** Mobile-first frame that mimics a phone viewport on desktop. */
export const PhoneShell = ({ children, className = "" }: PhoneShellProps) => (
  <div className="min-h-screen w-full bg-secondary flex items-center justify-center md:p-6">
    <div className={`phone-shell shadow-card md:rounded-[2.5rem] md:my-6 md:max-h-[920px] md:min-h-[820px] ${className}`}>
      {children}
    </div>
  </div>
);
