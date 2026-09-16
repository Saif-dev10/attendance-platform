import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import SettingsPageHeader from './SettingsPageHeader';

export default function SettingsPageShell({ title, subtitle, description, children }) {
  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar />
      <MobileBottomNav active="settings" />
      <Topbar title={title} subtitle={subtitle} />
      <main className="min-h-screen overflow-y-auto bg-paper pb-[calc(84px+1.5rem)] pt-[72px] md:ml-[280px] md:pb-0">
        <div className="mx-auto max-w-3xl px-3 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <SettingsPageHeader title={title} description={description} />
          {children}
        </div>
      </main>
    </div>
  );
}
