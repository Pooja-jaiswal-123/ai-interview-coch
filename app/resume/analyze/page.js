"use client";

import React, { useState } from "react";
import { 
  UploadCloud, 
  FileText, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  X,
  Sparkles
} from "lucide-react";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file || !jobDesc) {
      alert("Please upload a resume and add a job description.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // AI ANALYSIS Simulation
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        score: 72,
        matchStatus: "Good Match",
        summary: "Your resume aligns well with the core requirements, but lacks specific technical keywords mentioned in the JD.",
        missingKeywords: ["TypeScript", "Docker", "CI/CD", "System Design"],
        strengths: ["Strong React experience", "Good project descriptions", "Clear formatting"],
        improvements: [
          "Add more quantifiable metrics (e.g., 'Reduced load time by 20%')",
          "Include the missing keywords listed above in your skills section.",
          "Shorten the professional summary."
        ]
      });
    }, 3000);
  };

  return (
    // 'pl-72' aur 'pt-24' hata diya gaya hai
    <div className="w-full font-sans animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tight uppercase">
          <Search className="w-8 h-8 text-indigo-600" />
          AI Resume Analyzer
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Paste a Job Description and upload your resume to see your ATS match score.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Inputs */}
        <div className="space-y-6">
            
          {/* 1. Job Description Input */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
               <FileText className="w-4 h-4 text-indigo-500" /> Job Description
            </label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste requirements here..."
              className="w-full h-56 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none resize-none text-sm font-medium transition-all"
            />
          </div>

          {/* 2. Resume Upload */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
               <UploadCloud className="w-4 h-4 text-indigo-500" /> Upload Resume (PDF)
            </label>
            
            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-indigo-400 transition-all cursor-pointer relative group">
               <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               
               {file ? (
                 <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-indigo-100 animate-in zoom-in-95 duration-300">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    <span className="text-sm font-black text-gray-700 truncate max-w-[150px]">{file.name}</span>
                    <button onClick={(e) => {e.preventDefault(); setFile(null)}} className="p-1 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                 </div>
               ) : (
                 <>
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-100">
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-widest">Click to upload</p>
                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">PDF or DOCX (Max 2MB)</p>
                 </>
               )}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !file || !jobDesc}
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isAnalyzing || !file || !jobDesc 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
            }`}
          >
            {isAnalyzing ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                </>
            ) : (
                <> <Sparkles className="w-4 h-4" /> Scan Resume </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="space-y-6">
            
            {!result && !isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 text-center p-12 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-gray-200" />
                    </div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Ready to Analyze</h3>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mt-4 tracking-widest leading-loose">
                        Add details to see your <br/> ATS match score.
                    </p>
                </div>
            )}

            {isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12">
                    <div className="relative w-20 h-20 mb-8">
                        <div className="absolute inset-0 border-4 border-gray-50 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em]">Scanning Assets...</h3>
                    <p className="text-[10px] text-gray-400 mt-4 font-black uppercase tracking-widest">Keywords & Relevance Check</p>
                </div>
            )}

            {result && (
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 border border-gray-100 overflow-hidden animate-in slide-in-from-right-8 duration-700">
                    
                    {/* Score Header */}
                    <div className={`p-10 text-center ${result.score > 70 ? 'bg-emerald-50/50' : 'bg-amber-50/50'}`}>
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" className={`${result.score > 70 ? 'text-emerald-100' : 'text-amber-100'}`} />
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={351.86} strokeDashoffset={351.86 - (351.86 * result.score) / 100} className={`${result.score > 70 ? 'text-emerald-500' : 'text-amber-500'} transition-all duration-1000 ease-out`} />
                            </svg>
                            <span className={`absolute text-3xl font-black ${result.score > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>{result.score}%</span>
                        </div>
                        <h2 className={`text-xl font-black mt-6 uppercase tracking-widest ${result.score > 70 ? 'text-emerald-700' : 'text-amber-700'}`}>{result.matchStatus}</h2>
                        <p className="text-gray-500 mt-3 text-xs font-medium max-w-sm mx-auto leading-relaxed">{result.summary}</p>
                    </div>

                    {/* Feedback Details */}
                    <div className="p-8 space-y-8">
                        
                        {/* Missing Keywords */}
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" /> Critical Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.missingKeywords.map((keyword, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-black rounded-lg border border-red-100 uppercase tracking-wider">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {/* Strengths */}
                            <div className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-50">
                                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Top Strengths
                                </h4>
                                <ul className="space-y-3">
                                    {result.strengths.map((item, i) => (
                                        <li key={i} className="text-[11px] font-bold text-gray-700 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Improvements */}
                            <div className="p-5 bg-amber-50/30 rounded-2xl border border-amber-50">
                                <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Action Items
                                </h4>
                                <ul className="space-y-3">
                                    {result.improvements.map((item, i) => (
                                        <li key={i} className="text-[11px] font-bold text-gray-700 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ResumeAnalyzer;