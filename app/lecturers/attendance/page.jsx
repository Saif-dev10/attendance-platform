import QRGenerator from "@/components/qr/QRGenerator";
import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AttendancePage() {
  return (
    <main>
      <Sidebar
        sections={lecturerSections}
        dashboardHref="/lecturers"
        user={{
          name: "Dr. Ibrahim",
          role: "Lecturer",
          avatar: "/avatar-placeholder.svg",
        }}
      />
      <Topbar title="Lecturer Console" />

      <div className="ml-0 md:ml-[280px] pt-[72px] h-screen overflow-y-auto bg-paper">
        
      <QRGenerator />
      
      </div>
    </main>
  );
};