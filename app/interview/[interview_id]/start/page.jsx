"use client";
import { InterviewDataContext } from "@/context/interviewDataContext";
import { Image, Timer } from "lucide-react";
import React, { useContext } from "react";

const StartInterview = () => {
  const { interviewinfo, setInterviewInfo } = useContext(InterviewDataContext);

  return (
    <div className="p-20 lg:px-48 xl:px-56 bg-gradient-to-r from-gray-200 to-gray-200 rounded-xl">
      <div className="flex justify-between items-center">
        {/* Left Title */}
        <h2 className="font-bold text-xl">AI Interview Session</h2>

        {/* Right Timer */}
        <span className="flex items-center gap-2 text-gray-700">
          <Timer className="h-5 w-5" />
          00:00:00
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div>
            <Image
              src={"/a.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-b-full"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
