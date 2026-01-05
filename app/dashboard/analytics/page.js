"use client";

import React from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  FileText, 
  Search, 
  Map, 
  ArrowRight,
  Zap,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

const HomePage = () => {
  return (
    // Yahan se pl-72 aur pt-24 hata diya gaya hai taaki layout.js ke saath conflict na ho
    <div className="w-full font-sans animate-in fade-in duration-700">
      
      {/* 1. Welcome Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome back, <span className="text-indigo-600">Pooja!</span> 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Here is your daily career progress overview. You are doing great!
            </p>
        </div>
        <div className="hidden md:flex gap-3">
             <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">System Online</span>
             </div>
        </div>
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 group transition-all">
             <div className="flex justify-between items-start">
                 <div>
                    <p className="text-indigo-100 text-sm font-medium mb-1">Total Interviews</p>
                    <h3 className="text-4xl font-black">12</h3>
                 </div>
                 <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-white" />
                 </div>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-100 mt-4 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2 this week
             </p>
         </div>

         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
             <div className="flex justify-between items-start">
                 <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Resume Score</p>
                    <h3 className="text-4xl font-black text-gray-800">85%</h3>
                 </div>
                 <div className="p-3 bg-emerald-50 rounded-xl">
                    <Search className="w-6 h-6 text-emerald-600" />
                 </div>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mt-4 tracking-tighter">Top 15% of candidates</p>
         </div>

         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
             <div className="flex justify-between items-start">
                 <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Learning Goals</p>
                    <h3 className="text-4xl font-black text-gray-800">4/10</h3>
                 </div>
                 <div className="p-3 bg-amber-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                 </div>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mt-4 tracking-tighter">Keep going!</p>
         </div>
      </div>

      {/* 3. Quick Actions Grid */}
      <h2 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2 uppercase tracking-widest">
         <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { title: "Interview Prep", desc: "Practice with AI mock interviews.", icon: <MessageSquare />, color: "indigo", href: "/dashboard", btn: "Start Interview" },
            { title: "Resume Builder", desc: "Create professional ATS resumes.", icon: <FileText />, color: "violet", href: "/resume", btn: "Build Resume" },
            { title: "Resume Analyzer", desc: "Scan resume against job desc.", icon: <Search />, color: "emerald", href: "/resume/analyze", btn: "Analyze Now" },
            { title: "Career Roadmap", desc: "Generate personalized learning path.", icon: <Map />, color: "amber", href: "/roadmap", btn: "View Path" }
          ].map((item, i) => (
            <Link key={i} href={item.href} className="group">
               <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-indigo-600 hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col justify-between">
                  <div>
                      <div className={`w-10 h-10 bg-${item.color}-50 rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                          {React.cloneElement(item.icon, { className: `w-5 h-5 text-${item.color}-600` })}
                      </div>
                      <h3 className="text-base font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className={`mt-4 flex items-center text-${item.color}-600 text-[10px] font-black uppercase tracking-widest`}>
                      {item.btn} <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
            </Link>
          ))}
      </div>

      {/* 4. Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-gray-800 mb-6 uppercase tracking-widest">Recent Activity</h3>
          <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-gray-700">Mock Interview: React Developer</p>
                          <p className="text-[10px] text-gray-400 font-medium">2 hours ago</p>
                      </div>
                  </div>
                  <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-1 rounded-lg uppercase tracking-wider">Score: 8/10</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-violet-50 text-violet-600 rounded-lg">
                          <FileText className="w-4 h-4" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-gray-700">Updated Resume: Software Engineer</p>
                          <p className="text-[10px] text-gray-400 font-medium">Yesterday</p>
                      </div>
                  </div>
                  <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded-lg uppercase tracking-wider">Edited</span>
              </div>
          </div>
      </div>

    </div>
  );
};

export default HomePage;