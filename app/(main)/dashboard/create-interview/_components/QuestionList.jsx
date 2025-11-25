import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuestionList = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [questionlist, setQuestionlist] = useState(null);

  useEffect(() => {
    if (formData) {
      GenrateQuestionList();
    }
  }, [formData]);

  const GenrateQuestionList = async () => {
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log("API Response:", result.data.result);

      const Content = JSON.parse(result.data.result);
      setQuestionlist(Content);

      toast.success("Questions Generated Successfully!");
    } catch (error) {
      console.log("Error:", error);
      toast.error("⚠️ Server Error, Try Again!");
    }

    setLoading(false);
  };

  // ⭐ Fixed function: now button can call it
  const onFinish = () => {
    toast.success("Interview Questions Saved!");
    console.log("Final question list:", questionlist);
  };

  return (
    <div>
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

      {!loading && questionlist && (
        <div className="mt-5 p-5 bg-white rounded-xl shadow-md border">
          <h3 className="font-bold text-lg mb-3 text-primary">
            Generated Questions:
          </h3>

          {questionlist.questions?.map((item, index) => (
            <div key={index} className="border-b py-3 text-sm">
              <strong>{index + 1}.</strong> {item.question}
              <p className="text-primary text-xs mt-1 font-medium">
                {item.type}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <Button onClick={onFinish}>Finish</Button>
      </div>
    </div>
  );
};

export default QuestionList;
