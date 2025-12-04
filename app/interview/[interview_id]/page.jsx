"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Clock, Video, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/interviewDataContext";

const Interview = () => {
  const { interview_id } = useParams();
  const router = useRouter();

  const [interviewDetails, setInterviewDetails] = useState(null);
  const [userName, setUserName] = useState("");

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const { setInterviewInfo } = useContext(InterviewDataContext);

  // ---------------------------
  // FETCH INTERVIEW BASIC DETAILS
  // ---------------------------
  useEffect(() => {
    if (interview_id) fetchInterviewDetails();
  }, [interview_id]);

  const fetchInterviewDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("jobPosition, jobDescription, duration, interviewType")
        .eq("interview_id", interview_id)
        .single();

      if (error || !data) {
        toast.error("Invalid or expired interview link");
        router.push("/404");
        return;
      }

      setInterviewDetails(data);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingPage(false);
    }
  };

  // ---------------------------
  // START INTERVIEW
  // ---------------------------
  const handleStartInterview = async () => {
    setLoadingButton(true);

    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("*, questions(*)") // Fetch questions also
        .eq("interview_id", interview_id)
        .single();

      if (error || !data) {
        toast.error("Something went wrong!");
        setLoadingButton(false);
        return;
      }

      // Save data globally for next pages
      setInterviewInfo(data);

      // -------------------------------
      // Console Logs for checking
      // -------------------------------
      console.log("🟦 Username:", userName);
      console.log("🟩 Total Questions:", data?.questions?.length);
      console.log("🟨 Questions List:", data?.questions);

      router.push(`/interview/${interview_id}/start`);
    } catch (e) {
      console.error(e);
      toast.error("Unable to start interview!");
    }

    setLoadingButton(false);
  };

  return (
    <div className="w-full flex justify-center bg-[#f7f8fa] py-4">
      <div className="w-full max-w-3xl bg-white rounded-xl p-6 shadow-md">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image src={"/logo.png"} alt="Logo" width={150} height={70} />
          <h2 className="text-gray-600 font-medium text-xs md:text-sm">
            AI-Powered Interview Platform
          </h2>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mt-3">
          <Image
            src={"/interview.png"}
            alt="interview"
            width={300}
            height={300}
            className="w-[200px] md:w-[250px]"
          />
        </div>

        {/* Title */}
        <h2 className="font-bold text-lg md:text-xl text-center mt-3">
          {loadingPage ? "Loading..." : interviewDetails?.jobPosition}
        </h2>

        {/* Duration */}
        <div className="flex justify-center mt-1">
          <p className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
            <Clock className="h-4 w-4" />
            {interviewDetails?.duration || 0} Minutes
          </p>
        </div>

        {/* Name Input */}
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-md">
            <label className="text-xs md:text-sm font-medium">
              Enter your full name
            </label>
            <Input
              placeholder="e.g. John Smith"
              className="h-8 mt-2 text-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="flex justify-center mt-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl w-full max-w-md">
            <div className="flex gap-2">
              <Info className="text-blue-600 h-4 w-4" />
              <div>
                <h2 className="font-semibold text-blue-800 text-sm">
                  Before you begin
                </h2>
                <ul className="mt-1 space-y-1 text-blue-700 text-xs">
                  <li>• Test your Camera and Microphone</li>
                  <li>• Ensure a stable Internet connection</li>
                  <li>• Find a quiet place for your interview</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="flex justify-center mt-5">
          <Button
            onClick={handleStartInterview}
            className="w-[200px] h-9 font-semibold rounded-lg text-sm flex items-center justify-center gap-2"
            disabled={loadingButton || !userName.trim()}
          >
            {loadingButton ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Video className="h-4 w-4" />
            )}
            Join Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
