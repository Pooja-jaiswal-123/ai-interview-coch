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

  // Create VAPI instance only ONCE
  const vapiRef = useRef(
    new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE")
  );
  const vapi = vapiRef.current;

  const interviewStarted = useRef(false);

  // Unlock autoplay audio (Fixes browser audio blocking)
  const unlockAudioAutoplay = () => {
    const audio = document.createElement("audio");
    audio.src = "";
    audio.play().catch(() => {});
  };

  useEffect(() => {
    console.log("InterviewInfo Changed:", interviewInfo);

    if (
      interviewInfo?.interviewData?.questionList?.length > 0 &&
      !interviewStarted.current
    ) {
      interviewStarted.current = true; // avoid double trigger
      console.log("Questions found → Starting Interview...");
      startInterview();
    }

    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
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

    // ✅ FIXED: Correct Vapi Ephemeral Assistant Structure
    const assistantOptions = {
      name: "Interviewer",
      firstMessage: `Hi ${interviewInfo?.userName}, welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's begin!`,

      // 1. Voice Settings (Using 11Labs for high quality male voice)
      voice: {
        provider: "11labs",
        voiceId: "burt", // 'burt' is a standard male voice ID in 11Labs
      },

      // 2. Model Settings (Instructions go inside 'system' message)
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are an experienced male interviewer. 
              Ask one question at a time in a natural conversation tone.
              Wait for user reply before asking next question.
              Don't speak too fast, keep the voice realistic and friendly.

              Here are the questions:
              ${questionList}

              After finishing all questions:
              Give a short evaluation including strengths, weak areas, confidence level and a score out of 10.

              End with:
              "Thank you for attending your mock interview. All the best!"
            `,
          },
        ],
      },
    };

    try {
      console.log("Requesting Microphone...");
      await navigator.mediaDevices.getUserMedia({ audio: true });

      console.log("Mic Permission Granted ✔");

      unlockAudioAutoplay();

      console.log("Starting VAPI assistant...");

      // ✅ Correct call format
      await vapi.start(assistantOptions);

      console.log("🟢 VAPI Started Successfully!");

      vapi.on("speech-start", () => console.log("🗣 Speaking..."));
      vapi.on("speech-end", () => console.log("🔇 Speech End"));
      vapi.on("error", (err) => console.error("❌ Vapi Error:", err));

      // Optional: Add event listener for call end
      vapi.on("call-end", () => {
        console.log("Call ended.");
        stopInterview();
      });
    } catch (error) {
      console.error("❌ Mic permission or VAPI start error:", error);
      alert("Mic permission error or API config issue. Check console.");
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

        <AlertConfirmation stopInterview={stopInterview}>
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