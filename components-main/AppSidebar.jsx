"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, 
  MessageSquare, 
  FileText, 
  Search, 
  Map,
  LogOut,
  Sparkles,
  Bot,       
  UserCircle,
  Menu, 
  X     
} from "lucide-react";

const AppSidebar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/dashboard/analytics" },
    // Line 30 in image_98277a.png
{ label: "Interview Prep", icon: <MessageSquare className="w-5 h-5" />,href: "/interview" },
    { label: "Resume Builder", icon: <FileText className="w-5 h-5" />, href: "/resume" },
    { label: "Resume Analyzer", icon: <Search className="w-5 h-5" />, href: "/resume/analyze" },
    { label: "Career Roadmap", icon: <Map className="w-5 h-5" />, href: "/roadmap" },
  ];

  return (
    <>
      {/* 1. MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <Sparkles className="w-6 h-6 text-indigo-600 fill-indigo-100" />
            <span className="text-lg font-bold text-gray-800">AI Coach</span>
        </Link>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />}

      {/* 2. SIDEBAR */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
        `}
      >
        {/* SIDEBAR HEADER - Fixed at top */}
        <div className="p-5 flex justify-between items-center shrink-0 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-transform">
              <Sparkles className="w-8 h-8 text-indigo-600 fill-indigo-100 group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-black text-gray-800 tracking-tight">AI Coach</span>
          </Link>
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden p-1 text-gray-400 hover:text-red-500">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200">
          <p className="text-[10px] font-bold text-gray-400 px-3 mb-2 uppercase tracking-[0.2em]">Main Menu</p>
          
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard" && item.href !== "/resume"); 
            return (
              <Link key={index} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"}`}>
                <div className={`${isActive ? "" : "group-hover:scale-110 transition-transform shrink-0"}`}>{item.icon}</div>
                <span className="font-semibold text-[15px]">{item.label}</span>
              </Link>
            );
          })}

          {/* AI Assistant Box inside Scroll Area */}
          <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 px-3 mb-3 uppercase tracking-[0.2em]">Assistant</p>
              
              <Link href="/dashboard/chat">
                  <div className="relative rounded-[18px] overflow-hidden group cursor-pointer p-[3px] transition-all active:scale-[0.98]">
                      <div className="absolute inset-[-400%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] opacity-100 blur-xl" />
                      <div className="relative z-10 bg-slate-950 rounded-[15px] p-3.5 flex items-center gap-4">
                          <div className="p-2 bg-indigo-600 rounded-lg shrink-0 shadow-lg">
                               <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                              <p className="font-bold text-sm text-white truncate tracking-tight">Ask AI Coach</p>
                              <p className="text-[10px] text-gray-400 truncate font-medium tracking-tight">Get instant answers</p>
                          </div>
                          <div className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                          </div>
                      </div>
                  </div>
              </Link>
          </div>
        </nav>

        {/* FOOTER - Fixed at bottom */}
        <div className="px-4 py-4 border-t border-gray-100 shrink-0 bg-white">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 shrink-0 transition-colors">
                  <UserCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate leading-tight">Pooja</p>
                  <p className="text-[10px] text-gray-500 truncate font-semibold mt-0.5 tracking-tight">Free Plan</p>
              </div>
              <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0">
                  <LogOut className="w-4 h-4" />
              </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;