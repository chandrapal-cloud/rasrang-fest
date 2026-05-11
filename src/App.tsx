import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import RoleSelect from "./pages/RoleSelect";
import AppLayout from "./pages/app/AppLayout";
import Home from "./pages/app/Home";
import Bookings from "./pages/app/Bookings";
import Maintenance from "./pages/app/Maintenance";
import Tracker from "./pages/app/Tracker";
import Subscription from "./pages/app/Subscription";
import Deliveries from "./pages/app/Deliveries";
import Earnings from "./pages/app/Earnings";
import Profile from "./pages/app/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBikes from "./pages/admin/AdminBikes";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminDeliveries from "./pages/admin/AdminDeliveries";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import NotFound from "./pages/NotFound.tsx";

// Rang Manch — Festival of Art, Film & Literature (added below existing app routes)
import FestivalLayout from "./pages/festival/FestivalLayout";
import FestivalHome from "./pages/festival/Home";
import FestivalEvents from "./pages/festival/Events";
import FestivalBlogs from "./pages/festival/Blogs";
import FestivalAbout from "./pages/festival/About";
import FestivalBook from "./pages/festival/Book";
import FestivalMembership from "./pages/festival/Membership";
import FestivalTeam from "./pages/festival/Team";
import FestivalMagazine from "./pages/festival/Magazine";

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
            <Route path="/role" element={<RoleSelect />} />
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
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="bikes" element={<AdminBikes />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="deliveries" element={<AdminDeliveries />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} />
            </Route>
            {/* Festival website (Rang Manch) — independent section */}
            <Route path="/festival" element={<FestivalLayout />}>
              <Route index element={<FestivalHome />} />
              <Route path="events" element={<FestivalEvents />} />
              <Route path="blogs" element={<FestivalBlogs />} />
              <Route path="about" element={<FestivalAbout />} />
              <Route path="book" element={<FestivalBook />} />
              <Route path="membership" element={<FestivalMembership />} />
              <Route path="team" element={<FestivalTeam />} />
              <Route path="magazine" element={<FestivalMagazine />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
