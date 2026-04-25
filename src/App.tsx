import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import AppLayout from "./pages/app/AppLayout";
import Home from "./pages/app/Home";
import Bookings from "./pages/app/Bookings";
import Maintenance from "./pages/app/Maintenance";
import Tracker from "./pages/app/Tracker";
import Subscription from "./pages/app/Subscription";
import Deliveries from "./pages/app/Deliveries";
import Earnings from "./pages/app/Earnings";
import Profile from "./pages/app/Profile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="tracker" element={<Tracker />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="deliveries" element={<Deliveries />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
