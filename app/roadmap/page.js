"use client";

import React, { useState } from "react";
import { 
  Map, 
  Search, 
  CheckCircle2, 
  Loader2, 
  BookOpen, 
  Code,
  Sparkles
} from "lucide-react";

const CareerRoadmap = () => {
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = () => {
    if (!role) return;
    
    setIsLoading(true);
    setRoadmap(null);

    // AI Generation Simulation
    setTimeout(() => {
      setIsLoading(false);
      setRoadmap(mockRoadmapData);
    }, 2500);
  };

  return (
    // 'pl-72' aur 'pt-24' hata diya gaya hai, Layout.js ise handle karega
    <div className="w-full font-sans animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
          <Map className="w-8 h-8 text-indigo-600" />
          AI Career Roadmap
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Enter your dream job role, and our AI will generate a personalized step-by-step learning path for you.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
         <div className="flex flex-col md:flex-row gap-4 items-end max-w-4xl">
            <div className="flex-1 w-full">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block px-1">
                  Target Job Role
                </label>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Full Stack Developer, UX Designer..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>
            </div>
            <button
                onClick={handleGenerate}
                disabled={isLoading || !role}
                className={`h-[58px] px-8 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl flex items-center gap-2 transition-all active:scale-95 ${
                    isLoading || !role
                    ? "bg-gray-200 cursor-not-allowed shadow-none"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                }`}
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isLoading ? "Designing..." : "Generate"}
            </button>
         </div>
      </div>

      {/* RESULT SECTION */}
      {isLoading && (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest">Designing Your Path</h3>
            <p className="text-xs text-gray-400 mt-2 font-medium tracking-tight">Analyzing industry standards for {role}...</p>
          </div>
      )}

      {roadmap && !isLoading && (
        <div className="animate-in slide-in-from-bottom-8 duration-700">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <h2 className="text-xl font-black text-gray-800 tracking-tight">
                    Roadmap for <span className="text-indigo-600">{role}</span>
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-black bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100 uppercase tracking-widest">
                    Estimated Time: 6 Months
                </div>
            </div>

            <div className="relative border-l-2 border-indigo-100 ml-4 space-y-10 pb-10">
                
                {roadmap.map((step, index) => (
                    <div key={index} className="relative pl-10 group">
                        
                        {/* Timeline Dot */}
                        <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full group-hover:scale-125 transition-transform shadow-sm"></div>
                        
                        {/* Content Card */}
                        <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 group-hover:border-indigo-200 transition-all">
                            
                            <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                                <div>
                                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1 block">
                                        Phase {index + 1}
                                    </span>
                                    <h3 className="text-lg font-black text-gray-800 tracking-tight">{step.title}</h3>
                                </div>
                                <span className="text-[10px] font-black bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-100 uppercase tracking-widest">
                                    {step.duration}
                                </span>
                            </div>

                            <p className="text-gray-500 mb-6 text-xs leading-relaxed font-medium">
                                {step.description}
                            </p>

                            {/* Topics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {step.topics.map((topic, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100 group-hover:bg-white transition-colors">
                                        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                          {i % 2 === 0 ? <BookOpen className="w-3 h-3 text-indigo-500" /> : <Code className="w-3 h-3 text-indigo-500" />}
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">{topic}</span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}

                {/* Success Node */}
                <div className="relative pl-10">
                     <div className="absolute -left-[11px] top-0 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-md animate-bounce"></div>
                     <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 inline-flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-black text-emerald-800 text-[10px] uppercase tracking-[0.2em]">
                           Goal Achieved!
                        </h4>
                     </div>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

// --- MOCK DATA ---
const mockRoadmapData = [
    {
        title: "Foundations of Web Development",
        duration: "Month 1-2",
        description: "Start by mastering the core building blocks of the web. Focus on semantic HTML, modern CSS layouts, and the basics of programming with JavaScript.",
        topics: ["HTML5 & Semantic Markup", "CSS3, Flexbox & Grid", "JavaScript (ES6+)", "Git & Version Control"]
    },
    {
        title: "Frontend Frameworks & Libraries",
        duration: "Month 3-4",
        description: "Move to modern frontend development. Learn React to build dynamic user interfaces and manage state effectively.",
        topics: ["React.js Core Concepts", "Tailwind CSS", "State Management (Redux/Zustand)", "API Integration (Fetch/Axios)"]
    },
    {
        title: "Backend & Database Basics",
        duration: "Month 5",
        description: "Expand your skills to the server-side. Learn how to create APIs and interact with databases to become a full-stack developer.",
        topics: ["Node.js & Express", "MongoDB / SQL Basics", "RESTful API Design", "Authentication (JWT/Auth.js)"]
    },
    {
        title: "Advanced Concepts & Deployment",
        duration: "Month 6",
        description: "Polish your skills with advanced topics and learn how to deploy your applications to the world.",
        topics: ["Next.js (App Router)", "Testing (Jest/Cypress)", "CI/CD Pipelines", "Deployment (Vercel/AWS)"]
    }
];

export default CareerRoadmap;