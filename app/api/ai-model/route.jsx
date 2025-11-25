import { QUESTIONS_PROMPT } from "@/public/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  const FINAL_PROMPT = `
  ${QUESTIONS_PROMPT}
  
  ---- IMPORTANT ----
  Return the output **only** in this **strict JSON format**:

  {
    "questions": [
      {"question": "string", "type": "Easy | Medium | Hard", "answer": "string"}
    ]
  }

  No explanation, no intro text, no markdown, no extra text. 
  ONLY JSON.
  --------------------
  
  Details:
  Job Title: ${jobPosition}
  Job Description: ${jobDescription}
  Duration: ${duration}
  Type: ${type}
`;

  try {
    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await client.chat.completions.create({
      // Use a valid OpenRouter model ID
      // You can swap this to any other supported model, e.g. "google/gemini-2.0-flash-001"
      model: "openai/gpt-4.1-mini",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      temperature: 0.4,
    });

    let responseText = completion.choices[0].message.content;

    responseText = responseText.replace(/```json|```/g, "").trim();

    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error("API ERROR :", error);

    // 🛑 Handle Rate Limit
    if (error.code === 429)
      return NextResponse.json(
        {
          error:
            "⚠️ Too many requests. Wait 20–30 seconds before trying again.",
        },
        { status: 429 }
      );

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
