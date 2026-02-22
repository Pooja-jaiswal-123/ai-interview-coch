"use client";

import React, { useEffect, useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // useRouter add kiya redirect ke liye
import { supabase } from "@/lib/supabaseClient";
import { InterviewDataContext } from "@/context/interviewDataContext";
import StartInterview from "./_components/AlertConfirmation";
import { Loader2 } from "lucide-react";

const InterviewPage = () => {
  const { id } = useParams();
  const router = useRouter(); // Optional: Agar user logged in nahi hai toh redirect karne ke liye
  const { setInterviewInfo } = useContext(InterviewDataContext);

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    // Ek naya function banaya jo pehle session check karega
    const checkSessionAndFetch = async () => {
      if (!id) return;
      
      setLoading(true);

      // 1. Supabase ko force karo session LocalStorage se load karne ke liye
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      // Agar session nahi mila, toh error set kardo ya login page par bhej do
      if (!session || sessionError) {
        console.error("No active session found. RLS will block the request.");
        setAuthError(true);
        setLoading(false);
        // router.push('/login'); // Tum chaho toh login page par redirect kar sakte ho
        return; 
      }

      // 2. Session mil gaya! Ab safely data fetch karo
      await fetchInterview(session);
    };

    checkSessionAndFetch();
  }, [id]);

  // Session ko as a parameter paas kiya (optional but good practice)
  const fetchInterview = async (session) => {
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", id)
      .single();

    if (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
      return;
    }

    // ✅ VERY IMPORTANT
    setInterviewInfo({
      // Bonus: Ab tum "Guest" ki jagah actual logged-in user ka naam bhi dikha sakte ho
      userName: session?.user?.user_metadata?.full_name || "Guest", 
      interviewData: data,
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  // Agar user bina login kiye URL access karne ki koshish kare
  if (authError) {
    return (
      <div className="h-screen flex justify-center items-center flex-col gap-4">
        <h2 className="text-xl font-bold text-red-500">Authentication Error</h2>
        <p>Please log in to view this interview.</p>
      </div>
    );
  }

  return <StartInterview />;
};

export default InterviewPage;