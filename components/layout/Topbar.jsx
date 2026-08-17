import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="fixed left-[280px] top-0 right-0 h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
      
      {/* Header text */}
      <div className="flex items-center gap-4">

        <h1 className="text-xl font-bold text-[#0c426e]">Student Dashboard</h1>
      </div>

      {/* Right side: search + bell */}
      <div className="flex items-center gap-3">

        {/* Input section */}
        <div className="relative w-64 mr-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#0e91e9]/20 transition-all placeholder:text-xs"
            placeholder="Search courses, materials..."
          />
        </div>

        {/* Bell Icon Section */}
        <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50 transition-colors relative cursor-pointer">

          <Bell size={20} />

          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
}