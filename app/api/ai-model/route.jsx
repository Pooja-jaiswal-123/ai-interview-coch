import { QUESTIONS_PROMPT } from "@/lib/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  const FINAL_PROMPT = `
${QUESTIONS_PROMPT}

Return the output **only** in this **strict JSON format**:

{
  "questions": [
    {"question": "string", "type": "Easy | Medium | Hard", "answer": "string"}
  ]
}

No extra text, only JSON.

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
      model: "openai/gpt-4.1-mini",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      temperature: 0.4,
      max_tokens: 1000, // Reduce tokens to fit your account limit
    });

    let responseText = completion.choices[0].message.content;
    responseText = responseText.replace(/```json|```/g, "").trim();

    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error("API ERROR :", error);

    // Handle Rate Limit
    if (error.code === 429)
      return NextResponse.json(
        {
          error:
            "⚠️ Too many requests. Wait 20–30 seconds before trying again.",
        },
        { status: 429 }
      );

    // Handle Credits / Payment Required
    if (error.code === 402)
      return NextResponse.json(
        {
          error:
            "⚠️ Not enough credits. Reduce max_tokens or upgrade your OpenRouter account.",
        },
        { status: 402 }
      );

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
