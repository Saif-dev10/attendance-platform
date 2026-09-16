import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import SettingsSection from "@/components/features/settings/SettingsSection";
import SettingsRow from "@/components/features/settings/SettingsRow";
import {
  UserCircle,
  MapPin,
  LockKeyhole,
  Bell,
  MessageSquare,
  CircleHelp,
  Info,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar />
      <MobileBottomNav active="settings" />

      <Topbar
        title="Settings"
        subtitle="Manage your SKUL account and preferences"
      />

      <main className="min-h-screen overflow-y-auto bg-paper px-3 pb-28 pt-[92px] sm:px-6 md:ml-[280px] md:pb-10">
        <div className="mx-auto max-w-2xl space-y-6">
          <SettingsSection title="Account">
            <SettingsRow
              icon={UserCircle}
              label="Personal Information"
              description="View your university-provided personal information."
              href="/students/profile"
            />
            <SettingsRow
              icon={MapPin}
              label="Address"
              description="View your university-provided address information."
              href="/students/profile"
            />
            <SettingsRow
              icon={LockKeyhole}
              label="Password"
              description="Change your SKUL account password."
              href="/students/settings/password"
              last
            />
          </SettingsSection>

          <SettingsSection title="Notifications">
            <SettingsRow
              icon={Bell}
              label="Notification Preferences"
              description="Manage academic and important SKUL notifications."
              href="/students/settings/notifications"
              last
            />
          </SettingsSection>

          <SettingsSection title="Support">
            <SettingsRow
              icon={MessageSquare}
              label="Complaints"
              description="View your complaints and submit a new complaint."
              href="/complaints"
            />
            <SettingsRow
              icon={CircleHelp}
              label="Help & Feedback"
              description="Get help or share feedback about SKUL."
              href="/students/settings/help"
              last
            />
          </SettingsSection>

          <SettingsSection title="About">
            <SettingsRow
              icon={Info}
              label="About SKUL"
              description="Learn more about SKUL and your university portal."
              href="/students/settings/about"
              last
            />
          </SettingsSection>
        </div>
      </main>
    </div>
  );
}