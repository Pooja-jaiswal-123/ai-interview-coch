"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/lib/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FormContainer = ({ onHandleInputChange, GoToNext }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleInterviewTypeClick = (type) => {
    setSelectedTypes((prev) => {
      let newSelection;

      if (prev.includes(type.title)) {
        newSelection = prev.filter((t) => t !== type.title);
      } else {
        newSelection = [...prev, type.title];
      }

      onHandleInputChange?.("interviewType", newSelection);
      return newSelection;
    });
  };

  return (
    <div className="p-5 bg-white rounded-2xl">
      {/* Job Position */}
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          onChange={(e) =>
            onHandleInputChange?.("jobPosition", e.target.value)
          }
        />
      </div>

      {/* Job Description */}
      <div className="mt-4">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter detailed job description"
          className="h-[200px] mt-2"
          onChange={(e) =>
            onHandleInputChange?.("jobDescription", e.target.value)
          }
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange?.("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Min</SelectItem>
            <SelectItem value="15">15 Min</SelectItem>
            <SelectItem value="30">30 Min</SelectItem>
            <SelectItem value="45">45 Min</SelectItem>
            <SelectItem value="60">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <h2 className="text-sm font-semibold">Interview Type</h2>

        <div className="flex gap-4 flex-wrap mt-3">
          {InterviewType.map((type, index) => {
            const isSelected = selectedTypes.includes(type.title);

            return (
              <div
                key={index}
                onClick={() => handleInterviewTypeClick(type)}
                className={`flex items-center gap-3 cursor-pointer p-3 px-4 rounded-2xl border transition-all shadow-sm
                  ${
                    isSelected
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                <type.icon
                  className={`h-5 w-5 ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                />
                <span className="text-base font-medium">{type.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <div className="mt-10 flex justify-end">
        <Button
          className="cursor-pointer flex items-center gap-2"
          onClick={GoToNext}
        >
          Generate Question <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
