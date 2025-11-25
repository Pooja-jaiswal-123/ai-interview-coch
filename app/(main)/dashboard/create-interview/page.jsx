"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";

const CreateInterview = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    interviewType: [], // <-- Array because multiple selection
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };
      console.log("Updated form data:", updatedData);
      return updatedData;
    });
  };

  const handleNextStep = () => {
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.duration ||
      !formData.interviewType.length // <-- correct validation
    ) {
      toast.warning("⚠️ Please fill all fields");
      return;
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>

      <Progress value={step * 25} className="my-5" />

      {step === 1 && (
        <FormContainer
          onHandleInputChange={handleInputChange}
          GoToNext={handleNextStep}
        />
      )}

      {step === 2 && <QuestionList formData={formData} />}
    </div>
  );
};

export default CreateInterview;
