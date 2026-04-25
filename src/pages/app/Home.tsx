import { useAuth } from "@/contexts/AuthContext";
import RiderHome from "./RiderHome";
import SubscriberHome from "./SubscriberHome";

const Home = () => {
  const { profile } = useAuth();
  return profile?.active_role === "rider" ? <RiderHome /> : <SubscriberHome />;
};

export default Home;
