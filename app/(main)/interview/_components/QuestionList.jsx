"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabaseClient";

const QuestionList = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState(null);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  const [generatedId, setGeneratedId] = useState(null); // ⬅️ NEW

  useEffect(() => {
    if (formData) generateQuestionList();
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      const content = JSON.parse(result.data.result);
      const questionsArray = Array.isArray(content.questions)
        ? content.questions
        : [];

      setQuestionList(questionsArray);
      toast.success("Questions Generated Successfully!");
    } catch (error) {
      toast.error("⚠️ Server Error, Try Again!");
    }
    setLoading(false);
  };

  const onFinish = async () => {
    setSaveLoading(true);

    if (!questionList || questionList.length === 0) {
      toast.error("No questions to save!");
      setSaveLoading(false);
      return;
    }

    const interview_id = uuidv4(); // ⬅️ SAME ID FROM DB & UI
    setGeneratedId(interview_id);

    const payload = {
      jobPosition: formData.jobPosition || "",
      jobDescription: formData.jobDescription || "",
      duration: formData.duration?.toString() || "0",
      interviewType: Array.isArray(formData.interviewType)
        ? formData.interviewType.join(", ")
        : formData.interviewType || "",
      questionList: questionList,
      userEmail: user?.email || "no-email@example.com",
      interview_id,
    };

    const { error } = await supabase.from("interviews").insert([payload]);

    if (error) {
      toast.error("Error saving interview!");
    } else {
      toast.success("Interview saved successfully!");
      setQuestionList(null);
    }

    setSaveLoading(false);

    onCreateLink(interview_id);
  };

  const copyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_HOST_URL}/${generatedId}`;
    navigator.clipboard.writeText(link);
    toast.success("Interview link copied!");
  };

  return (
    <div>
      {/* Loading while AI generates questions */}
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2 className="animate-spin" />
          <div>
            <h1 className="font-medium">Generating Interview Questions...</h1>
            <p className="text-sm text-primary">
              Our AI is crafting personalized questions based on your job
              details.
            </p>
          </div>
        </div>
      )}

      {/* Show Questions */}
      {!loading && questionList && questionList.length > 0 && (
        <div className="mt-5 p-5 bg-white rounded-xl shadow-md border">
          <QuestionListContainer questionlist={questionList} />
        </div>
      )}

      {/* Finish Button */}
      <div className="mt-5 flex justify-end">
        <Button onClick={onFinish} disabled={saveLoading}>
          {saveLoading && <Loader2 className="animate-spin mr-2" />}
          Create Interview Link & Finish
        </Button>
      </div>

      {/* Show Interview ID + Link */}
      {generatedId && (
        <div className="mt-5 p-4 bg-gray-100 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-lg">Interview Link Created!</h3>

          <p className="mt-2 text-sm">
            <strong>Interview ID:</strong> {generatedId}
          </p>

          <p className="mt-1 text-sm break-all">
            <strong>Link:</strong>{" "}
            {`${process.env.NEXT_PUBLIC_HOST_URL}/${generatedId}`}
          </p>

          <Button
            onClick={copyLink}
            className="mt-3 flex items-center gap-2 w-full sm:w-auto"
          >
            <Copy size={16} /> Copy Link
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
