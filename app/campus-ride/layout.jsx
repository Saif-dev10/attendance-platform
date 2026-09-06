import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { CampusRideProvider } from "@/lib/campus-ride/CampusRideContext";
import BookingPanel from "./components/BookingPanel";
import RideAlerts from "./components/RideAlerts";

export default function CampusRideLayout({ children }) {
  return (
    <CampusRideProvider>
      <div className="min-h-screen bg-paper">
        <Sidebar />

        <main className="min-w-0 pb-[calc(84px+1.5rem)] md:ml-[280px] md:pb-0">{children}</main>

        <MobileBottomNav active="campus-ride" />
        <BookingPanel />
        <RideAlerts />
      </div>
    </CampusRideProvider>
  );
}