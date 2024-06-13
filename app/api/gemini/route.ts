import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "edge";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "당신은 최고의 게임행동심리분석박사이다. 여러 롤 챔피언의 숙련도보고 플레이어의 성격의 장점과 단점을 명료하게 분석해낸다.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(input: any) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
  const simplifiedInput = input.map((champion: any) => ({
    championName: champion.championName,
    championPoints: champion.championPoints,
  }));

  const geminiInput = `${JSON.stringify(simplifiedInput, null, 2)}`;
  console.log("geminiInput", geminiInput);
  const result = await chatSession.sendMessage(geminiInput);
  console.log("geminiResult", result.response.text());
  return result.response.text();
  // return "test";
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");

  if (!data) {
    return NextResponse.json(
      { message: "data 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const parsedData = JSON.parse(data);
    // console.log("Received data:", parsedData);
    const geminiResult = await run(parsedData);
    // console.log("geminiResult", geminiResult);

    return NextResponse.json(geminiResult);
  } catch (error) {
    return NextResponse.json(
      { message: "GEMINI API 요청 중 오류 발생" },
      { status: 500 }
    );
  }
}
