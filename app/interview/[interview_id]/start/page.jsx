"use client";

import { InterviewDataContext } from "@/context/interviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import NextImage from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";

const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [time, setTime] = useState(0);

  // Create VAPI instance only once
  const vapiRef = useRef(null);
  if (!vapiRef.current) {
    console.log("Initializing Vapi Instance...");
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }
  const vapi = vapiRef.current;

  // Unlock autoplay
  const unlockAudioAutoplay = () => {
    const audio = document.createElement("audio");
    audio.src = "";
    audio.play().catch(() => {});
  };

  useEffect(() => {
    console.log("InterviewInfo Changed:", interviewInfo);

    if (interviewInfo?.interviewData?.questionList?.length > 0) {
      console.log("Questions found → Starting Interview...");
      startInterview();
    }

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [interviewInfo]);

  const startInterview = async () => {
    const questions = interviewInfo?.interviewData?.questionList;
    if (!questions || questions.length === 0) {
      console.log("No questions found.");
      return;
    }

    const questionList = questions
      .map((q, i) => `${i + 1}. ${q?.question}`)
      .join("\n");

    // ⭐⭐ SCREENSHOT WALA EXACT PROMPT ⭐⭐
    const assistantOptions = {
      model: "gpt-4o-mini",
      voice: {
        provider: "vapi",
        voice_id: "verse",
      },
      instructions: `
You are an experienced AI interviewer.  
Ask questions naturally, one at a time, based on the candidate's CV and job role.  
Never ask multiple questions together.  
Wait for the candidate's full reply before asking the next question.  
Speak in a friendly, encouraging tone.  
If the user takes long pauses, politely continue.  
If they are confused, give a small hint, not the full answer.  
Do not speak too fast.  
Keep responses short and conversational.

Start with:  
"Hi ${interviewInfo?.userName}, welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's begin!"

Here are the questions you must ask in order:
${questionList}

After finishing all questions:  
Give a short evaluation including:  
• Strengths  
• Weak areas  
• Overall confidence level  
• Final score out of 10  

Then end with:  
"Thank you for attending your mock interview. Good luck!"
`.trim(),
    };

    try {
      console.log("Requesting Microphone...");
      await navigator.mediaDevices.getUserMedia({ audio: true });

      console.log("Mic Permission Granted ✔");

      unlockAudioAutoplay();

      console.log("Starting VAPI assistant...");
      await vapi.start({ assistant: assistantOptions });

      console.log("🟢 VAPI Started Successfully!");

      vapi.on("speech-start", () => console.log("🗣 Speaking..."));
      vapi.on("speech-end", () => console.log("🔇 Speech End"));
      vapi.on("error", (err) => console.error("❌ Vapi Error:", err));
    } catch (error) {
      console.error("❌ Mic permission or VAPI start error:", error);
      alert("Mic permission allow karo Pooja! Reload page.");
    }
  };

  const stopInterview = () => {
    console.log("Stopping Interview...");
    vapi.stop();
    console.log("Interview Stopped.");
  };

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56 bg-gradient-to-r from-gray-200 to-gray-200 rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">AI Interview Session</h2>
        <span className="flex items-center gap-2 text-gray-700">
          <Timer className="h-5 w-5" />
          {formatTime(time)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-xl border flex flex-col items-center justify-center gap-4">
          <NextImage
            src="/ai.png"
            alt="ai"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-xl border flex flex-col items-center justify-center gap-4">
          <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
            {interviewInfo?.userName?.[0]?.toUpperCase()}
          </div>
          <h2 className="text-lg font-semibold">
            {interviewInfo?.userName || "Guest"}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />

        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress.....
      </h2>
    </div>
  );
};

export default StartInterview;
