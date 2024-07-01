import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "edge";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run(input: any, userData: any) {
  const promptfcn = (region: string) => {
    if (region === "Korea") {
      return "당신은 게임 행동 심리학의 최고 전문가이며 성격이론을 아주 잘 알고있습니다. 특정게임에서 상위 10순위의 챔피언 숙련도 순위를 제공할 테니, 숙련도 수치가 높은걸 가중치를 두어 이를 바탕으로 플레이어의 성격을 종합적으로 분석해주세요. 반드시 json 형태로 'traits', 'strengths', 'weaknesses','improvements'으로 분석해줘라";
    } else {
      return "You are a top professional in game behavioral psychology and know personality theory very well. We will provide you with the top 10 champion proficiency rankings in a specific game, so please give a comprehensive analysis of the player's personality based on the high level of proficiency. Be sure to analyze the characteristics in json form as 'traits', 'strengths', 'weaknesses', and 'improvements'";
    }
  };

  const prompt = promptfcn(userData.region);
  console.log("prompt", prompt);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: prompt,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
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
  const riotData = searchParams.get("data");
  const userData = searchParams.get("userData");

  if (!riotData) {
    return NextResponse.json(
      { message: "data 파라미터가 필요합니다." },
      { status: 400 }
    );
  }
  if (!userData) {
    return NextResponse.json(
      { message: "userData 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const riotParsedData = JSON.parse(riotData);
    const userParsedData = JSON.parse(userData);

    // console.log("Received data:", parsedData);
    const geminiResult = await run(riotParsedData, userParsedData);
    // console.log("geminiResult", geminiResult);

    return NextResponse.json(geminiResult);
  } catch (error) {
    return NextResponse.json(
      { message: "GEMINI API 요청 중 오류 발생" },
      { status: 500 }
    );
  }
}
